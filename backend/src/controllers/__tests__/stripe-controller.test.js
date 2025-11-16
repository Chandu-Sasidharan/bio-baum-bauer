import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StatusCodes } from 'http-status-codes';
import formatZodError from '#src/utils/format-zod-error.js';
import validatePaymentData from '#src/validations/payment-data-validation.js';
import { stripeInstance } from '#src/utils/stripe.js';
import Sponsorship from '#src/models/sponsorship.js';
import Tree from '#src/models/tree.js';
import { getPaymentIntent } from '../stripe-controller.js';

vi.mock('#src/utils/format-zod-error.js', () => ({
  default: vi.fn(),
}));

vi.mock('#src/validations/payment-data-validation.js', () => ({
  default: vi.fn(),
}));

const stripeMock = vi.hoisted(() => ({
  paymentIntents: {
    create: vi.fn(),
  },
}));

vi.mock('#src/utils/stripe.js', () => ({
  stripeInstance: stripeMock,
}));

vi.mock('#src/models/sponsorship.js', () => ({
  default: {
    create: vi.fn(),
  },
}));

vi.mock('#src/models/tree.js', () => ({
  default: {
    find: vi.fn(),
  },
}));

const createMockResponse = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

const expectJsonMessage = (res, regex, extra = {}) => {
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      message: expect.stringMatching(regex),
      ...extra,
    })
  );
};

describe('stripe controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    stripeInstance.paymentIntents.create.mockReset();
  });

  describe('getPaymentIntent', () => {
    it('returns validation errors when the payment payload fails validation', async () => {
      validatePaymentData.mockReturnValueOnce({
        success: false,
        error: 'zod-error',
      });
      const formattedErrors = { amount: 'invalid' };
      formatZodError.mockReturnValueOnce(formattedErrors);
      const req = { body: { cartItems: [] } };
      const res = createMockResponse();

      await getPaymentIntent(req, res, vi.fn());

      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({
        errors: formattedErrors,
        message: 'Invalid Data',
      });
      expect(Tree.find).not.toHaveBeenCalled();
      expect(Sponsorship.create).not.toHaveBeenCalled();
    });

    it('rejects requests that resolve to a non-positive amount', async () => {
      validatePaymentData.mockReturnValueOnce({
        success: true,
        data: {
          currency: 'eur',
          cartItems: [{ treeId: 'tree-1', quantity: 1 }],
        },
      });
      Tree.find.mockResolvedValueOnce([
        {
          _id: 'tree-1',
          price: {
            toString: () => '0',
          },
        },
      ]);
      const req = { body: {} };
      const res = createMockResponse();

      await getPaymentIntent(req, res, vi.fn());

      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expectJsonMessage(res, /Invalid Data/i);
      expect(Sponsorship.create).not.toHaveBeenCalled();
      expect(stripeInstance.paymentIntents.create).not.toHaveBeenCalled();
    });

    it('creates a sponsorship and stripe payment intent when the payload is valid', async () => {
      validatePaymentData.mockReturnValueOnce({
        success: true,
        data: {
          currency: 'eur',
          cartItems: [
            { treeId: 'tree-1', quantity: 2 },
            { treeId: 'tree-2', quantity: 1 },
          ],
        },
      });
      Tree.find.mockResolvedValueOnce([
        {
          _id: 'tree-1',
          price: {
            toString: () => '25.50',
          },
        },
        {
          _id: 'tree-2',
          price: {
            toString: () => '10',
          },
        },
      ]);
      Sponsorship.create.mockResolvedValueOnce({
        _id: {
          toString: () => 'sponsor-123',
        },
      });
      stripeInstance.paymentIntents.create.mockResolvedValueOnce({
        id: 'pi_123',
      });
      const req = { body: {} };
      const res = createMockResponse();

      await getPaymentIntent(req, res, vi.fn());

      const expectedAmount = 2 * 2550 + 1 * 1000; // cents
      expect(Sponsorship.create).toHaveBeenCalledWith({
        amount: expectedAmount,
        currency: 'eur',
        cartItems: [
          { treeId: 'tree-1', quantity: 2 },
          { treeId: 'tree-2', quantity: 1 },
        ],
        status: 'pending',
      });
      expect(stripeInstance.paymentIntents.create).toHaveBeenCalledWith({
        amount: expectedAmount,
        currency: 'eur',
        metadata: {
          sponsorshipId: 'sponsor-123',
        },
      });
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        paymentIntent: { id: 'pi_123' },
      });
    });
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StatusCodes } from 'http-status-codes';
import { stripeInstance } from '#src/utils/stripe.js';
import Sponsorship from '#src/models/sponsorship.js';
import sendPaymemtSucceededEmail from '#src/utils/send-payment-succeeded-email.js';
import sendPaymentFailedEmail from '#src/utils/send-payment-failed-email.js';
import sendNewSponsorshipEmail from '#src/utils/send-new-sponsorship-email.js';
import { postPaymentWebhook } from '../webhook-controller.js';

vi.mock('#src/utils/stripe.js', () => ({
  stripeInstance: {
    webhooks: {
      constructEvent: vi.fn(),
    },
  },
  endpointSecret: 'whsec_test',
}));

vi.mock('#src/models/sponsorship.js', () => ({
  default: {
    findById: vi.fn(),
    findByIdAndUpdate: vi.fn(),
    validateSponsorship: vi.fn(),
  },
}));

vi.mock('#src/utils/send-payment-succeeded-email.js', () => ({
  default: vi.fn(),
}));

vi.mock('#src/utils/send-payment-failed-email.js', () => ({
  default: vi.fn(),
}));

vi.mock('#src/utils/send-new-sponsorship-email.js', () => ({
  default: vi.fn(),
}));

const createMockResponse = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

const mockRequest = ({ type = 'payment_intent.succeeded', payload = {} }) => ({
  body: { data: { object: payload }, type },
  headers: { 'stripe-signature': 'sig' },
});

const sponsorshipRecord = {
  _id: 's1',
  email: 'sponsor@example.com',
  isGuest: false,
  firstName: 'Sponsor',
  amount: 1000,
};

const buildFindByIdQuery = record => ({
  lean: vi.fn().mockResolvedValue(record),
});

describe('webhook controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Sponsorship.validateSponsorship.mockReturnValue({ success: true });
    Sponsorship.findById.mockReturnValue(buildFindByIdQuery(sponsorshipRecord));
  });

  it('returns 400 when stripe signature verification fails', async () => {
    stripeInstance.webhooks.constructEvent.mockImplementationOnce(() => {
      throw new Error('invalid signature');
    });
    const req = mockRequest({
      payload: { metadata: { sponsorshipId: 's1' } },
    });
    const res = createMockResponse();

    await postPaymentWebhook(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ message: 'Webhook Error' });
    expect(Sponsorship.findByIdAndUpdate).not.toHaveBeenCalled();
  });

  it('marks sponsorship paid and notifies when payment succeeds', async () => {
    stripeInstance.webhooks.constructEvent.mockReturnValueOnce({
      type: 'payment_intent.succeeded',
      data: {
        object: {
          metadata: { sponsorshipId: 's1' },
        },
      },
    });
    const req = mockRequest({});
    const res = createMockResponse();

    await postPaymentWebhook(req, res, vi.fn());

    expect(Sponsorship.findByIdAndUpdate).toHaveBeenCalledWith('s1', {
      status: 'paid',
    });
    expect(sendPaymemtSucceededEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        sponsorshipId: 's1',
        amount: '10.00',
      })
    );
    expect(sendNewSponsorshipEmail).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({ received: true });
  });

  it('marks sponsorship failed and notifies the user on failure events', async () => {
    stripeInstance.webhooks.constructEvent.mockReturnValueOnce({
      type: 'payment_intent.payment_failed',
      data: {
        object: {
          metadata: { sponsorshipId: 's2' },
        },
      },
    });
    Sponsorship.findById.mockReturnValueOnce(
      buildFindByIdQuery({ ...sponsorshipRecord, _id: 's2' })
    );
    const req = mockRequest({ type: 'payment_intent.payment_failed' });
    const res = createMockResponse();

    await postPaymentWebhook(req, res, vi.fn());

    expect(Sponsorship.findByIdAndUpdate).toHaveBeenCalledWith('s2', {
      status: 'failed',
    });
    expect(sendPaymentFailedEmail).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({ received: true });
  });
});

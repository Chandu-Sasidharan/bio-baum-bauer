import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StatusCodes } from 'http-status-codes';
import Sponsorship from '#src/models/sponsorship.js';
import { getUserSponsorships } from '../sponsorship-controller.js';

vi.mock('#src/models/sponsorship.js', () => ({
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

describe('sponsorship controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUserSponsorships', () => {
    it('rejects requests without an authenticated user', async () => {
      const req = { user: null };
      const res = createMockResponse();

      await getUserSponsorships(req, res, vi.fn());

      expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
      expectJsonMessage(res, /Unauthorized/i);
      expect(Sponsorship.find).not.toHaveBeenCalled();
    });

    it('returns formatted sponsorships for the logged-in user', async () => {
      const lean = vi.fn().mockResolvedValue([
        {
          _id: '1',
          status: 'paid',
          amount: 5000,
          currency: 'eur',
          taxRate: 0.2,
          createdAt: 1,
          updatedAt: 2,
          cartItems: [
            {
              quantity: 2,
              treeId: {
                _id: 'tree-1',
                name: { en: 'Oak', de: 'Eiche' },
                imageUrl: '/oak.jpg',
                category: 'Fruit Tree',
                price: 2500,
              },
            },
            {
              quantity: 1,
              treeId: null,
            },
          ],
        },
      ]);
      const sort = vi.fn().mockReturnValue({ lean });
      const populate = vi.fn().mockReturnValue({ sort });
      Sponsorship.find.mockReturnValueOnce({ populate });
      const req = {
        user: { _id: 'user-123' },
        locale: 'de',
      };
      const res = createMockResponse();

      await getUserSponsorships(req, res, vi.fn());

      expect(Sponsorship.find).toHaveBeenCalledWith({ userId: 'user-123' });
      expect(populate).toHaveBeenCalledWith({
        path: 'cartItems.treeId',
        select: 'name imageUrl category price',
      });
      expect(sort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(lean).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        sponsorships: [
          {
            id: '1',
            status: 'paid',
            amount: 5000,
            currency: 'eur',
            taxRate: 0.2,
            createdAt: 1,
            updatedAt: 2,
            cartItems: [
              {
                quantity: 2,
                tree: {
                  id: 'tree-1',
                  name: 'Eiche',
                  imageUrl: '/oak.jpg',
                  category: 'Fruit Tree',
                  categoryLabel: 'Obstbäume',
                  price: 2500,
                },
              },
              {
                quantity: 1,
                tree: null,
              },
            ],
          },
        ],
      });
    });
  });
});

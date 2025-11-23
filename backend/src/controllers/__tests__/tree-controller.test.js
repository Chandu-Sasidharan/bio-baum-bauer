import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StatusCodes } from 'http-status-codes';
import Tree from '#src/models/tree.js';
import {
  getAllTrees,
  getAllFeaturedTrees,
  getTreeById,
  getTreesInCart,
} from '../tree-controller.js';

vi.mock('#src/models/tree.js', () => ({
  default: {
    find: vi.fn(),
    findById: vi.fn(),
    countDocuments: vi.fn(),
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

describe('tree controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllTrees', () => {
    const buildFindChain = trees => {
      const lean = vi.fn().mockResolvedValue(trees);
      const limit = vi.fn().mockReturnValue({ lean });
      const skip = vi.fn().mockReturnValue({ limit });
      const sort = vi.fn().mockReturnValue({ skip });

      return { sort, skip, limit, lean };
    };

    it('applies filters, sorting, and pagination before returning trees', async () => {
      const trees = [
        {
          name: { en: 'Oak', de: 'Eiche' },
          shortDescription: { en: 'Short', de: 'Kurz' },
          description: { en: 'Desc', de: 'Beschreibung' },
          category: 'fruit',
          status: 'Available',
        },
      ];
      const chain = buildFindChain(trees);
      Tree.find.mockReturnValueOnce({ sort: chain.sort });
      Tree.countDocuments.mockResolvedValueOnce(12);
      const req = {
        query: {
          category: 'fruit',
          sort: 'price:desc',
          page: '2',
          limit: '5',
        },
        locale: 'de',
      };
      const res = createMockResponse();

      await getAllTrees(req, res, vi.fn());

      expect(Tree.find).toHaveBeenCalledWith({ category: 'fruit' });
      expect(chain.sort).toHaveBeenCalledWith({ price: -1 });
      expect(chain.skip).toHaveBeenCalledWith(5);
      expect(chain.limit).toHaveBeenCalledWith(5);
      expect(Tree.countDocuments).toHaveBeenCalledWith({ category: 'fruit' });
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        trees: [
          expect.objectContaining({
            name: 'Eiche',
            shortDescription: 'Kurz',
            description: 'Beschreibung',
          }),
        ],
        total: 12,
      });
    });

    it('uses defaults when no filters or sorting are provided', async () => {
      const trees = [
        {
          name: { en: 'Pine', de: 'Kiefer' },
          shortDescription: { en: 'Short', de: 'Kurz' },
          description: { en: 'Desc', de: 'Beschreibung' },
          category: 'Evergreen Forest',
          status: 'Available',
        },
      ];
      const chain = buildFindChain(trees);
      Tree.find.mockReturnValueOnce({ sort: chain.sort });
      Tree.countDocuments.mockResolvedValueOnce(1);
      const req = { query: {}, locale: 'en' };
      const res = createMockResponse();

      await getAllTrees(req, res, vi.fn());

      expect(Tree.find).toHaveBeenCalledWith({});
      expect(chain.sort).toHaveBeenCalledWith({});
      expect(chain.skip).toHaveBeenCalledWith(0);
      expect(chain.limit).toHaveBeenCalledWith(10);
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        trees: [
          expect.objectContaining({
            name: 'Pine',
            shortDescription: 'Short',
            description: 'Desc',
          }),
        ],
        total: 1,
      });
    });
  });

  describe('getAllFeaturedTrees', () => {
    it('returns the featured trees limited to four entries', async () => {
      const featuredTrees = [
        {
          name: { en: 'Birch', de: 'Birke' },
          shortDescription: { en: 'Short', de: 'Kurz' },
          description: { en: 'Desc', de: 'Beschreibung' },
          category: 'Fruit Tree',
          status: 'Available',
        },
        {
          name: { en: 'Maple', de: 'Ahorn' },
          shortDescription: { en: 'Short', de: 'Kurz' },
          description: { en: 'Desc', de: 'Beschreibung' },
          category: 'Nut Tree',
          status: 'Available',
        },
      ];
      const lean = vi.fn().mockResolvedValue(featuredTrees);
      const limit = vi.fn().mockReturnValue({ lean });
      Tree.find.mockReturnValueOnce({ limit });
      const res = createMockResponse();
      const req = { locale: 'en' };

      await getAllFeaturedTrees(req, res, vi.fn());

      expect(Tree.find).toHaveBeenCalledWith({ isFeatured: true });
      expect(limit).toHaveBeenCalledWith(4);
      expect(lean).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        featuredTrees: expect.arrayContaining([
          expect.objectContaining({ name: 'Birch' }),
          expect.objectContaining({ name: 'Maple' }),
        ]),
      });
    });
  });

  describe('getTreeById', () => {
    it('rejects invalid mongo ids to avoid database lookups', async () => {
      const req = { params: { id: 'invalid-id' } };
      const res = createMockResponse();
      const next = vi.fn();

      await getTreeById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expectJsonMessage(res, /Invalid Tree ID/i);
      expect(Tree.findById).not.toHaveBeenCalled();
    });

    it('returns not found when the tree does not exist', async () => {
      const lean = vi.fn().mockResolvedValue(null);
      Tree.findById.mockReturnValueOnce({ lean });
      const req = { params: { id: '655f1f77bcf86cd799439011' } };
      const res = createMockResponse();
      const next = vi.fn();

      await getTreeById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
      expectJsonMessage(res, /Tree not found/i);
      expect(next).not.toHaveBeenCalled();
      expect(lean).toHaveBeenCalled();
    });

    it('returns the tree when it is found', async () => {
      const tree = {
        _id: '655f1f77bcf86cd799439011',
        name: { en: 'Oak', de: 'Eiche' },
        shortDescription: { en: 'Short', de: 'Kurz' },
        description: { en: 'Desc', de: 'Beschreibung' },
        category: 'Fruit Tree',
        status: 'Available',
      };
      const lean = vi.fn().mockResolvedValue(tree);
      Tree.findById.mockReturnValueOnce({ lean });
      const req = { params: { id: tree._id }, locale: 'de' };
      const res = createMockResponse();

      await getTreeById(req, res, vi.fn());

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        tree: expect.objectContaining({
          name: 'Eiche',
          description: 'Beschreibung',
        }),
      });
      expect(lean).toHaveBeenCalled();
    });
  });

  describe('getTreesInCart', () => {
    it('validates all ids before querying', async () => {
      const req = { body: { ids: ['invalid'] } };
      const res = createMockResponse();

      await getTreesInCart(req, res, vi.fn());

      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expectJsonMessage(res, /Invalid tree IDs/i);
      expect(Tree.find).not.toHaveBeenCalled();
    });

    it('returns the requested trees when ids are valid', async () => {
      const ids = ['655f1f77bcf86cd799439011', '655f1f77bcf86cd799439012'];
      const trees = [
        {
          _id: ids[0],
          name: { en: 'Oak', de: 'Eiche' },
          shortDescription: { en: 'Short', de: 'Kurz' },
          description: { en: 'Desc', de: 'Beschreibung' },
          category: 'Fruit Tree',
          status: 'Available',
        },
        {
          _id: ids[1],
          name: { en: 'Maple', de: 'Ahorn' },
          shortDescription: { en: 'Short', de: 'Kurz' },
          description: { en: 'Desc', de: 'Beschreibung' },
          category: 'Nut Tree',
          status: 'Available',
        },
      ];
      const lean = vi.fn().mockResolvedValue(trees);
      Tree.find.mockReturnValueOnce({ lean });
      const req = { body: { ids }, locale: 'en' };
      const res = createMockResponse();

      await getTreesInCart(req, res, vi.fn());

      expect(Tree.find).toHaveBeenCalledWith({
        _id: { $in: ids },
      });
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        trees: expect.arrayContaining([
          expect.objectContaining({ name: 'Oak' }),
          expect.objectContaining({ name: 'Maple' }),
        ]),
      });
      expect(lean).toHaveBeenCalled();
    });
  });
});

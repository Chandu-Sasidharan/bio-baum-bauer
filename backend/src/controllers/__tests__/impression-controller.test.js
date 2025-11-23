import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StatusCodes } from 'http-status-codes';
import Impression from '#src/models/impression.js';
import { getAllImpressions } from '../impression-controller.js';

vi.mock('#src/models/impression.js', () => ({
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

describe('impression controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns all impressions with a 200 response', async () => {
    const impressions = [
      { title: { en: 'Great', de: 'Grossartig' } },
      { title: { en: 'Even better', de: 'Noch besser' } },
    ];
    const lean = vi.fn().mockResolvedValue(impressions);
    Impression.find.mockReturnValueOnce({ lean });
    const res = createMockResponse();
    const req = { locale: 'de' };

    await getAllImpressions(req, res, vi.fn());

    expect(Impression.find).toHaveBeenCalledWith();
    expect(lean).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      impressions: expect.arrayContaining([
        expect.objectContaining({ title: 'Grossartig' }),
      ]),
    });
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StatusCodes } from 'http-status-codes';
import Faq from '#src/models/faq.js';
import { getAllFaqs } from '../faq-controller.js';

vi.mock('#src/models/faq.js', () => ({
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

describe('faq controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns all faqs in a single response', async () => {
    const faqs = [
      {
        question: { en: 'A?', de: 'A (de)?' },
        answer: { en: 'B', de: 'B (de)' },
      },
      {
        question: { en: 'C?', de: 'C (de)?' },
        answer: { en: 'D', de: 'D (de)' },
      },
    ];
    const lean = vi.fn().mockResolvedValue(faqs);
    Faq.find.mockReturnValueOnce({ lean });
    const res = createMockResponse();
    const req = { locale: 'de' };

    await getAllFaqs(req, res, vi.fn());

    expect(Faq.find).toHaveBeenCalledWith();
    expect(lean).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      faqs: expect.arrayContaining([
        expect.objectContaining({ question: 'A (de)?', answer: 'B (de)' }),
      ]),
    });
  });
});

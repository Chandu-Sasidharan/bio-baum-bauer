import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useFaqs from '../use-faqs.js';
import { createQueryClientWrapper } from '@/test-utils.jsx';

vi.mock('@/utils/axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

import axios from '@/utils/axios';

describe('useFaqs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns faq data from the API response', async () => {
    const faqs = [{ question: 'Q', answer: 'A' }];
    axios.get.mockResolvedValueOnce({ data: { faqs } });

    const { result } = renderHook(() => useFaqs(), {
      wrapper: createQueryClientWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.faqs).toEqual(faqs);
    expect(result.current.isError).toBe(false);
    expect(axios.get).toHaveBeenCalledWith('/api/faqs', {
      params: { lang: 'de' },
    });
  });

  it('marks the query as errored when the request fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    axios.get.mockRejectedValueOnce(new Error('Network'));

    const { result } = renderHook(() => useFaqs(), {
      wrapper: createQueryClientWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    consoleSpy.mockRestore();
  });
});

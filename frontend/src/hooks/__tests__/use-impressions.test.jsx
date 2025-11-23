import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useImpressions from '../use-impressions.js';
import { createQueryClientWrapper } from '@/test-utils.jsx';

vi.mock('@/utils/axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

import axios from '@/utils/axios';

describe('useImpressions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches impressions from the API', async () => {
    const impressions = [{ title: 'Great' }];
    axios.get.mockResolvedValueOnce({ data: { impressions } });

    const { result } = renderHook(() => useImpressions(), {
      wrapper: createQueryClientWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.impressions).toEqual(impressions);
    expect(result.current.isError).toBe(false);
    expect(axios.get).toHaveBeenCalledWith('/api/impressions', {
      params: { lang: 'de' },
    });
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useTrees from '../use-trees.js';
import { createQueryClientWrapper } from '@/test-utils.jsx';

vi.mock('@/utils/axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

import axios from '@/utils/axios';

describe('useTrees', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches paginated trees data based on filters', async () => {
    const responseData = { trees: [{ id: '1', name: 'Oak' }], total: 10 };
    axios.get.mockResolvedValueOnce({ data: responseData });

    const params = { sort: 'price:asc', category: 'Fruit', page: 1, limit: 10 };
    const { result } = renderHook(() => useTrees(params), {
      wrapper: createQueryClientWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.trees).toEqual(responseData.trees);
    expect(result.current.total).toBe(10);
    expect(axios.get).toHaveBeenCalledWith('/api/trees', {
      params,
    });
  });

  it('falls back to empty data when the API is missing fields', async () => {
    axios.get.mockResolvedValueOnce({ data: {} });
    const params = { sort: null, category: null, page: 1, limit: 10 };

    const { result } = renderHook(() => useTrees(params), {
      wrapper: createQueryClientWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.trees).toEqual([]);
    expect(result.current.total).toBe(0);
  });
});

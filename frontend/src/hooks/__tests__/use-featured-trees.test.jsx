import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useFeaturedTrees from '../use-featured-trees.js';
import { createQueryClientWrapper } from '@/test-utils.jsx';

vi.mock('@/utils/axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

import axios from '@/utils/axios';

describe('useFeaturedTrees', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches the featured trees list', async () => {
    const featuredTrees = [{ name: 'Oak', id: 1 }];
    axios.get.mockResolvedValueOnce({ data: { featuredTrees } });

    const { result } = renderHook(() => useFeaturedTrees(), {
      wrapper: createQueryClientWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.featuredTrees).toEqual(featuredTrees);
    expect(axios.get).toHaveBeenCalledWith('/api/trees/featured');
  });
});

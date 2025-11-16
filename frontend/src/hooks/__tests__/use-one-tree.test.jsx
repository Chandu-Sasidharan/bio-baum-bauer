import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useOneTree from '../use-one-tree.js';
import { createQueryClientWrapper } from '@/test-utils.jsx';

vi.mock('@/utils/axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

import axios from '@/utils/axios';

describe('useOneTree', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not fetch when no id is provided', () => {
    renderHook(() => useOneTree(null), {
      wrapper: createQueryClientWrapper(),
    });

    expect(axios.get).not.toHaveBeenCalled();
  });

  it('fetches the tree for the given id', async () => {
    const tree = { id: '1', name: 'Pine' };
    axios.get.mockResolvedValueOnce({ data: { tree } });

    const { result } = renderHook(() => useOneTree('1'), {
      wrapper: createQueryClientWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.tree).toEqual(tree);
    expect(axios.get).toHaveBeenCalledWith('/api/trees/1');
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useSponsorships from '../use-sponsorships.js';
import { createQueryClientWrapper } from '@/test-utils.jsx';

vi.mock('@/utils/axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

import axios from '@/utils/axios';

describe('useSponsorships', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('exposes an empty list before the data resolves', () => {
    axios.get.mockResolvedValue({ data: { sponsorships: [] } });

    const { result } = renderHook(() => useSponsorships(), {
      wrapper: createQueryClientWrapper(),
    });

    expect(result.current.sponsorships).toEqual([]);
  });

  it('returns sponsorships data from the server', async () => {
    const sponsorships = [{ id: '1', status: 'paid' }];
    axios.get.mockResolvedValueOnce({ data: { sponsorships } });

    const { result } = renderHook(() => useSponsorships(), {
      wrapper: createQueryClientWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.sponsorships).toEqual(sponsorships);
    expect(axios.get).toHaveBeenCalledWith('/api/sponsorships');
  });
});

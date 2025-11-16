import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import usePaymentIntent from '../use-payment-intent.js';
import { createQueryClientWrapper } from '@/test-utils.jsx';

vi.mock('@/utils/axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

import axios from '@/utils/axios';

describe('usePaymentIntent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates a payment intent with the provided payload', async () => {
    const paymentIntent = { clientSecret: 'secret' };
    axios.post.mockResolvedValueOnce({ data: paymentIntent });

    const { result } = renderHook(() => usePaymentIntent(), {
      wrapper: createQueryClientWrapper(),
    });

    result.current.getPaymentIntent({ amount: 1000 });

    await waitFor(() =>
      expect(result.current.isPaymentLoading).toBe(false),
    );

    expect(result.current.data).toEqual(paymentIntent);
    expect(axios.post).toHaveBeenCalledWith('/api/payment-intent', {
      amount: 1000,
    });
  });
});

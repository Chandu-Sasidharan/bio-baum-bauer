import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider, useCart } from '../index.jsx';
import { DEFAULT_LANGUAGE } from '@/constants';
import { buildPathForLocale } from '@/utils/routes';

vi.mock('@/utils/axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

vi.mock('@/utils/alert', () => ({
  default: vi.fn(),
}));

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

import axios from '@/utils/axios';
import showAlert from '@/utils/alert';

const wrapper = ({ children }) => (
  <MemoryRouter>
    <CartProvider>{children}</CartProvider>
  </MemoryRouter>
);

const mockCartResponse = trees => {
  axios.post.mockResolvedValueOnce({
    data: { trees },
  });
};

describe('CartContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('restores cart items from local storage on mount', async () => {
    const storedItems = [{ treeId: 'tree-1', quantity: 2 }];
    localStorage.setItem('cart', JSON.stringify(storedItems));
    mockCartResponse([
      {
        _id: 'tree-1',
        name: 'Oak',
        availableQuantity: 5,
        price: { $numberDecimal: '118' },
      },
    ]);

    const { result } = renderHook(() => useCart(), { wrapper });

    await waitFor(() => expect(result.current.cartTrees).toHaveLength(1));
    expect(result.current.cartItems).toEqual(storedItems);
    expect(axios.post).toHaveBeenCalledWith('/api/trees/cart', {
      ids: ['tree-1'],
    });
  });

  it('addTreeToCart appends a new tree and navigates to /cart', async () => {
    mockCartResponse([]);
    const { result } = renderHook(() => useCart(), { wrapper });

    const newTree = {
      _id: 'tree-2',
      availableQuantity: 3,
      price: { $numberDecimal: '118' },
    };

    await act(async () => {
      await result.current.addTreeToCart(newTree);
    });

    expect(result.current.cartItems).toEqual([
      { treeId: 'tree-2', quantity: 1 },
    ]);
    expect(navigateMock).toHaveBeenCalledWith(
      buildPathForLocale(DEFAULT_LANGUAGE, 'cart')
    );
  });

  it('calculatePrice derives totals from cartTrees', async () => {
    const storedItems = [{ treeId: 'tree-3', quantity: 2 }];
    localStorage.setItem('cart', JSON.stringify(storedItems));
    mockCartResponse([
      {
        _id: 'tree-3',
        availableQuantity: 5,
        price: { $numberDecimal: '118' },
      },
    ]);

    const { result } = renderHook(() => useCart(), { wrapper });

    await waitFor(() => expect(result.current.cartTrees).toHaveLength(1));
    const { totalPrice, totalTax, grandTotal } =
      result.current.calculatePrice();

    // 118 includes 18% tax, so base price per tree is 100
    expect(totalPrice).toBeCloseTo(200);
    expect(totalTax).toBeCloseTo(36);
    expect(grandTotal).toBeCloseTo(236);
  });

  it('incrementTreeCount enforces inventory limits', async () => {
    const storedItems = [{ treeId: 'tree-4', quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(storedItems));
    mockCartResponse([
      {
        _id: 'tree-4',
        availableQuantity: 1,
        price: { $numberDecimal: '118' },
      },
    ]);

    const { result } = renderHook(() => useCart(), { wrapper });

    await waitFor(() => expect(result.current.cartTrees).toHaveLength(1));

    act(() => {
      result.current.incrementTreeCount('tree-4');
    });

    expect(result.current.cartItems[0].quantity).toBe(1);
    expect(showAlert).toHaveBeenCalledWith(
      'error',
      'Out of Stock!',
      "We don't have more than 1 of this tree in stock.",
    );
  });

  it('decrementTreeCount removes items when quantity reaches zero', async () => {
    const storedItems = [{ treeId: 'tree-5', quantity: 2 }];
    localStorage.setItem('cart', JSON.stringify(storedItems));
    mockCartResponse([
      {
        _id: 'tree-5',
        availableQuantity: 5,
        price: { $numberDecimal: '118' },
      },
    ]);

    const { result } = renderHook(() => useCart(), { wrapper });
    await waitFor(() => expect(result.current.cartTrees).toHaveLength(1));

    act(() => {
      result.current.decrementTreeCount('tree-5');
    });

    expect(result.current.cartItems).toEqual([
      { treeId: 'tree-5', quantity: 1 },
    ]);

    act(() => {
      result.current.decrementTreeCount('tree-5');
    });

    expect(result.current.cartItems).toEqual([]);
  });

  it('removeTreeFromCart deletes an entry entirely', async () => {
    const storedItems = [
      { treeId: 'tree-6', quantity: 1 },
      { treeId: 'tree-7', quantity: 2 },
    ];
    localStorage.setItem('cart', JSON.stringify(storedItems));
    mockCartResponse([
      {
        _id: 'tree-6',
        availableQuantity: 5,
        price: { $numberDecimal: '118' },
      },
      {
        _id: 'tree-7',
        availableQuantity: 5,
        price: { $numberDecimal: '118' },
      },
    ]);

    const { result } = renderHook(() => useCart(), { wrapper });
    await waitFor(() => expect(result.current.cartTrees).toHaveLength(2));

    act(() => {
      result.current.removeTreeFromCart('tree-6');
    });

    expect(result.current.cartItems).toEqual([
      { treeId: 'tree-7', quantity: 2 },
    ]);
  });

  it('clearCartTrees empties state and localStorage', async () => {
    const storedItems = [{ treeId: 'tree-8', quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(storedItems));
    mockCartResponse([]);

    const { result } = renderHook(() => useCart(), { wrapper });

    await waitFor(() => expect(result.current.cartItems).toEqual(storedItems));

    act(() => {
      result.current.clearCartTrees();
    });

    expect(result.current.cartItems).toEqual([]);
    expect(localStorage.getItem('cart')).toBe('[]');
  });

  it('getTreeCount and getTotalTreeCount reflect cart state', async () => {
    const storedItems = [
      { treeId: 'tree-9', quantity: 2 },
      { treeId: 'tree-10', quantity: 3 },
    ];
    localStorage.setItem('cart', JSON.stringify(storedItems));
    mockCartResponse([]);

    const { result } = renderHook(() => useCart(), { wrapper });

    await waitFor(() => expect(result.current.cartItems).toEqual(storedItems));

    expect(result.current.getTreeCount('tree-9')).toBe(2);
    expect(result.current.getTreeCount('missing')).toBe(0);
    expect(result.current.getTotalTreeCount()).toBe(5);
  });
});

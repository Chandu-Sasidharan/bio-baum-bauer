import { screen } from '@testing-library/react';
import Cart from '@/pages/cart';
import { renderWithRouter } from '@/test-utils';
import { useCart } from '@/context/cart-context';
import { useUser } from '@/context/auth-context';
import usePaymentIntent from '@/hooks/use-payment-intent';

vi.mock('@/components/spinner', () => ({
  default: () => <div data-testid='spinner' />,
}));
vi.mock('../cart-item', () => ({
  default: ({ tree }) => (
    <div data-testid='cart-item'>Tree: {tree.name}</div>
  ),
}));
vi.mock('@/context/cart-context');
vi.mock('@/context/auth-context');
vi.mock('@/hooks/use-payment-intent');

const mockUseCart = useCart;
const mockUseUser = useUser;
const mockUsePaymentIntent = usePaymentIntent;

const baseCartValue = {
  cartItems: [],
  cartTrees: [],
  calculatePrice: vi.fn(() => ({
    totalPrice: 0,
    totalTax: 0,
    grandTotal: 0,
  })),
  getTotalTreeCount: vi.fn(() => 0),
  isCartLoading: false,
};

const renderCart = () =>
  renderWithRouter(<Cart />, { initialEntries: ['/cart'] });

beforeEach(() => {
  mockUseUser.mockReturnValue({ authUser: null, isAuthenticated: false });
  mockUsePaymentIntent.mockReturnValue({
    getPaymentIntent: vi.fn(),
    isPaymentLoading: false,
  });
});

describe('Cart page', () => {
  it('shows a spinner while cart data loads', () => {
    mockUseCart.mockReturnValue({
      ...baseCartValue,
      isCartLoading: true,
    });

    renderCart();

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('encourages visitors to add trees when the cart is empty', () => {
    mockUseCart.mockReturnValue({
      ...baseCartValue,
    });

    renderCart();

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add trees/i })).toBeInTheDocument();
  });

  it('renders totals and guards checkout until a visitor logs in', () => {
    const cartTrees = [
      {
        _id: 'tree-1',
        name: 'Spruce',
        price: { $numberDecimal: '50' },
      },
    ];
    mockUseCart.mockReturnValue({
      ...baseCartValue,
      cartTrees,
      cartItems: [{ treeId: 'tree-1', quantity: 2 }],
      calculatePrice: vi.fn(() => ({
        totalPrice: 90,
        totalTax: 10,
        grandTotal: 100,
      })),
      getTotalTreeCount: vi.fn(() => 2),
    });

    const { rerender } = renderCart();

    expect(screen.getByText(/€\s*90/)).toBeInTheDocument();
    expect(screen.getByText(/€\s*100/)).toBeInTheDocument();
    expect(screen.getAllByTestId('cart-item')).toHaveLength(1);

    const checkoutButtons = screen.getAllByRole('button', {
      name: /checkout/i,
    });
    checkoutButtons.forEach(button => expect(button).toBeDisabled());

    mockUseUser.mockReturnValue({
      authUser: { id: 'user-1' },
      isAuthenticated: true,
    });

    rerender(<Cart />);

    screen
      .getAllByRole('button', { name: /checkout/i })
      .forEach(button => expect(button).toBeEnabled());
  });
});

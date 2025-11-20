import { screen, waitFor } from '@testing-library/react';
import Status from '@/pages/payment-status/status';
import { renderWithRouter } from '@/test-utils';

const mockUseStripe = vi.fn();
const mockUseCart = vi.fn();

vi.mock('@stripe/react-stripe-js', () => ({
  useStripe: () => mockUseStripe(),
}));

vi.mock('@/context/cart-context', () => ({
  useCart: () => mockUseCart(),
}));

vi.mock('@/components/spinner', () => ({
  default: ({ height }) => <div data-testid='spinner'>Spinner {height}</div>,
}));

describe('Payment Status message component', () => {
  const renderStatus = props =>
    renderWithRouter(<Status {...props} />, { initialEntries: ['/payment-status'] });

  beforeEach(() => {
    mockUseCart.mockReturnValue({ clearCartTrees: vi.fn() });
  });

  it('keeps showing a spinner until Stripe is ready', () => {
    mockUseStripe.mockReturnValue(null);

    renderStatus({ clientSecret: 'pi_123_secret' });

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('clears the cart and shows the Stripe status message', async () => {
    const clearCartTrees = vi.fn();
    mockUseCart.mockReturnValue({ clearCartTrees });
    const retrievePaymentIntent = vi.fn().mockResolvedValue({
      paymentIntent: { status: 'succeeded', metadata: {} },
    });
    mockUseStripe.mockReturnValue({ retrievePaymentIntent });

    renderStatus({ clientSecret: 'pi_123_secret' });

    await waitFor(() =>
      expect(screen.getByText(/vielen dank/i)).toBeInTheDocument()
    );
    expect(clearCartTrees).toHaveBeenCalled();
  });

  it('informs the visitor when the payment fails', async () => {
    mockUseStripe.mockReturnValue({
      retrievePaymentIntent: vi.fn().mockResolvedValue({
        paymentIntent: { status: 'requires_payment_method' },
      }),
    });

    renderStatus({ clientSecret: 'pi_123_secret' });

    await waitFor(() =>
      expect(screen.getByText(/zahlung ist fehlgeschlagen/i)).toBeInTheDocument()
    );
  });
});

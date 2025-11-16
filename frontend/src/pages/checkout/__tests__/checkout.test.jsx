import { screen } from '@testing-library/react';
import CheckoutForm from '@/pages/checkout';
import { renderWithRouter } from '@/test-utils';

const mockUseLocation = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => mockUseLocation(),
  };
});

vi.mock('@stripe/react-stripe-js', () => ({
  Elements: ({ children, options }) => (
    <div data-testid='elements' data-client-secret={options.clientSecret}>
      {children}
    </div>
  ),
}));

vi.mock('@/components/breadcrumbs', () => ({
  default: () => <div data-testid='breadcrumbs' />,
}));

vi.mock('@/pages/checkout/form', () => ({
  default: () => <div data-testid='stripe-form'>Stripe Form</div>,
}));

describe('Checkout page', () => {
  const renderCheckout = () => renderWithRouter(<CheckoutForm />);

  it('shows an error when no payment intent was passed from cart', () => {
    mockUseLocation.mockReturnValue({});

    renderCheckout();

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('displays the total amount and renders the Stripe form when the payment intent exists', () => {
    mockUseLocation.mockReturnValue({
      state: {
        paymentIntent: {
          amount: 2599,
          client_secret: 'pi_123_secret_456',
        },
      },
    });

    renderCheckout();

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(
      screen.getByText(/€\s*25\.99/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId('stripe-form')).toBeInTheDocument();
    expect(screen.getByTestId('elements')).toHaveAttribute(
      'data-client-secret',
      'pi_123_secret_456'
    );
  });
});

import { screen } from '@testing-library/react';
import PaymentStatus from '@/pages/payment-status';
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

vi.mock('@/components/spinner', () => ({
  default: () => <div data-testid='spinner' />,
}));

const statusMock = vi.fn(() => <div data-testid='status-component' />);
vi.mock('@/pages/payment-status/status', () => ({
  default: props => statusMock(props),
}));

describe('PaymentStatus page', () => {
  const renderPaymentStatus = () => renderWithRouter(<PaymentStatus />);

  beforeEach(() => {
    statusMock.mockClear();
  });

  it('shows a spinner while waiting for the client secret in the query string', () => {
    mockUseLocation.mockReturnValue({ search: '' });

    renderPaymentStatus();

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(statusMock).not.toHaveBeenCalled();
  });

  it('renders the Stripe status flow once the client secret is present', async () => {
    mockUseLocation.mockReturnValue({
      search: '?payment_intent_client_secret=pi_123_secret_456',
    });

    renderPaymentStatus();

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByTestId('elements')).toHaveAttribute(
      'data-client-secret',
      'pi_123_secret_456'
    );
    expect(statusMock).toHaveBeenCalledWith(
      expect.objectContaining({ clientSecret: 'pi_123_secret_456' })
    );
  });
});

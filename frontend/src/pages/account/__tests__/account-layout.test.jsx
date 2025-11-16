import { screen } from '@testing-library/react';
import AccountLayout from '@/pages/account';
import { renderWithRouter } from '@/test-utils';

vi.mock('@/components/breadcrumbs', () => ({
  default: () => <div data-testid='breadcrumbs' />,
}));

vi.mock('@/pages/account/sidebar', () => ({
  default: () => <div data-testid='account-sidebar' />,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Outlet: () => <div data-testid='account-outlet'>Outlet</div>,
  };
});

describe('Account layout (ProtectedRoute child)', () => {
  it('renders breadcrumbs, sidebar, and nested outlet for authenticated users', () => {
    renderWithRouter(<AccountLayout />);

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByTestId('account-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('account-outlet')).toBeInTheDocument();
  });
});

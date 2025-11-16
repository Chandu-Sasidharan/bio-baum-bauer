import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '@/pages/auth/login';
import { renderWithRouter } from '@/test-utils';

const mockUseUser = vi.fn();
const mockNavigate = vi.fn();
const mockUseLocation = vi.fn();

vi.mock('@/context/auth-context', () => ({
  useUser: () => mockUseUser(),
}));

vi.mock('@/components/breadcrumbs', () => ({
  default: () => <div data-testid='breadcrumbs' />,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockUseLocation(),
    Navigate: ({ to }) => <div data-testid='navigate' data-to={to} />,
  };
});

describe('Login page', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    mockUseLocation.mockReturnValue({});
  });

  it('redirects authenticated users straight to their account', () => {
    mockUseUser.mockReturnValue({
      isAuthenticated: true,
    });

    renderWithRouter(<Login />);

    expect(screen.getByTestId('navigate')).toHaveAttribute(
      'data-to',
      '/account'
    );
  });

  it('submits the form and navigates back to the requested page', async () => {
    const loginUser = vi.fn().mockResolvedValue(undefined);
    mockUseUser.mockReturnValue({
      isAuthenticated: false,
      loginUser,
      isUserLoading: false,
    });
    mockUseLocation.mockReturnValue({
      state: { from: { pathname: '/trees/rare' } },
    });

    renderWithRouter(<Login />);

    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText(/your email/i), 'farm@bbb.de');
    await user.type(
      screen.getByPlaceholderText(/your password/i),
      'secret123'
    );
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() =>
      expect(loginUser).toHaveBeenCalledWith({
        email: 'farm@bbb.de',
        password: 'secret123',
      })
    );
    expect(mockNavigate).toHaveBeenCalledWith('/trees/rare');
  });
});

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResetPassword from '@/pages/auth/reset-password';
import { renderWithRouter } from '@/test-utils';
import showAlert from '@/utils/alert';

const mockUseUser = vi.fn();
const mockUseNavigate = vi.fn();
const mockUseSearchParams = vi.fn();

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
    useNavigate: () => mockUseNavigate,
    useSearchParams: () => mockUseSearchParams(),
  };
});

vi.mock('@/utils/alert');

describe('ResetPassword page', () => {
  beforeEach(() => {
    mockUseNavigate.mockReset();
    showAlert.mockReset();
  });

  it('redirects visitors if the token is missing', () => {
    mockUseSearchParams.mockReturnValue([new URLSearchParams('')]);
    mockUseUser.mockReturnValue({
      resetPassword: vi.fn(),
      isUserLoading: false,
    });

    renderWithRouter(<ResetPassword />);

    expect(showAlert).toHaveBeenCalledWith(
      'error',
      'Invalid Link',
      'Token is missing or invalid'
    );
    expect(mockUseNavigate).toHaveBeenCalledWith('/forgot-password');
  });

  it('submits the new password when a token exists', async () => {
    const resetPassword = vi.fn().mockResolvedValue(true);
    mockUseSearchParams.mockReturnValue([new URLSearchParams('?token=abc123')]);
    mockUseUser.mockReturnValue({
      resetPassword,
      isUserLoading: false,
    });

    renderWithRouter(<ResetPassword />);

    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText('New Password'), 'secret45');
    await user.type(
      screen.getByPlaceholderText('Confirm Password'),
      'secret45'
    );
    await user.click(
      screen.getByRole('button', { name: /update password/i })
    );

    await waitFor(() =>
      expect(resetPassword).toHaveBeenCalledWith({
        token: 'abc123',
        password: 'secret45',
      })
    );
    expect(mockUseNavigate).toHaveBeenCalledWith('/login');
  });
});

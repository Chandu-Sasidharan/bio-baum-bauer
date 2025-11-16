import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Signup from '@/pages/auth/signup';
import { renderWithRouter } from '@/test-utils';

const mockUseUser = vi.fn();
const mockNavigate = vi.fn();

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
    Navigate: ({ to }) => <div data-testid='navigate' data-to={to} />,
  };
});

describe('Signup page', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it('redirects authenticated visitors to their account dashboard', () => {
    mockUseUser.mockReturnValue({
      isAuthenticated: true,
    });

    renderWithRouter(<Signup />);

    expect(screen.getByTestId('navigate')).toHaveAttribute(
      'data-to',
      '/account'
    );
  });

  it('creates an account and returns the visitor to the homepage', async () => {
    const signUpUser = vi.fn().mockResolvedValue(null);
    mockUseUser.mockReturnValue({
      isAuthenticated: false,
      signUpUser,
      isUserLoading: false,
    });

    renderWithRouter(<Signup />);

    const user = userEvent.setup();
    await user.type(
      screen.getByPlaceholderText(/your email/i),
      'sprout@bbb.de'
    );
    await user.type(
      screen.getByPlaceholderText('Your Password'),
      'secret123'
    );
    await user.type(
      screen.getByPlaceholderText('Confirm Your Password'),
      'secret123'
    );
    await user.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() =>
      expect(signUpUser).toHaveBeenCalledWith({
        email: 'sprout@bbb.de',
        password: 'secret123',
        confirmPassword: 'secret123',
      })
    );
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Signup from '@/pages/auth/signup';
import { renderWithRouter } from '@/test-utils';
import { DEFAULT_LANGUAGE } from '@/context/language-context';
import { buildPathForLocale } from '@/utils/routes';

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
      buildPathForLocale(DEFAULT_LANGUAGE, 'account')
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
      screen.getByPlaceholderText(/deine e-mail-adresse/i),
      'sprout@bbb.de'
    );
    await user.type(
      screen.getByPlaceholderText(/dein passwort/i),
      'secret123'
    );
    await user.type(
      screen.getByPlaceholderText(/passwort bestätigen/i),
      'secret123'
    );
    await user.click(
      screen.getByRole('button', { name: /registrieren/i })
    );

    await waitFor(() =>
      expect(signUpUser).toHaveBeenCalledWith({
        email: 'sprout@bbb.de',
        password: 'secret123',
        confirmPassword: 'secret123',
      })
    );
    expect(mockNavigate).toHaveBeenCalledWith(
      buildPathForLocale(DEFAULT_LANGUAGE, 'home')
    );
  });
});

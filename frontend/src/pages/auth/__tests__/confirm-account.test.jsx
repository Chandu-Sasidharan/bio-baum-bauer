import { screen } from '@testing-library/react';
import ConfirmAccount from '@/pages/auth/confirm-account';
import { renderWithRouter } from '@/test-utils';
import showAlert from '@/utils/alert';
import { DEFAULT_LANGUAGE } from '@/constants';
import { buildPathForLocale } from '@/utils/routes';

const mockUseUser = vi.fn();
const mockUseSearchParams = vi.fn();
const mockUseNavigate = vi.fn();

vi.mock('@/context/auth-context', () => ({
  useUser: () => mockUseUser(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => mockUseSearchParams(),
    useNavigate: () => mockUseNavigate,
  };
});

vi.mock('@/components/spinner', () => ({
  default: () => <div data-testid='spinner' />,
}));

vi.mock('@/utils/alert');

describe('ConfirmAccount page', () => {
  beforeEach(() => {
    showAlert.mockReset();
    mockUseNavigate.mockReset();
  });

  it('calls confirmAccount when a token exists', () => {
    const confirmAccount = vi.fn();
    mockUseSearchParams.mockReturnValue([new URLSearchParams('?token=abc123')]);
    mockUseUser.mockReturnValue({
      confirmAccount,
      isUserLoading: false,
    });

    renderWithRouter(<ConfirmAccount />);

    expect(confirmAccount).toHaveBeenCalledWith('abc123');
  });

  it('shows a spinner while the confirmation request is in flight', () => {
    mockUseSearchParams.mockReturnValue([new URLSearchParams('?token=abc123')]);
    mockUseUser.mockReturnValue({
      confirmAccount: vi.fn(),
      isUserLoading: true,
    });

    renderWithRouter(<ConfirmAccount />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('alerts and redirects home when the token is missing', () => {
    mockUseSearchParams.mockReturnValue([new URLSearchParams('')]);
    mockUseUser.mockReturnValue({
      confirmAccount: vi.fn(),
      isUserLoading: false,
    });

    renderWithRouter(<ConfirmAccount />);

    expect(showAlert).toHaveBeenCalledWith(
      'error',
      'Ungültiger Link',
      'Token fehlt oder ist ungültig'
    );
    expect(mockUseNavigate).toHaveBeenCalledWith(
      buildPathForLocale(DEFAULT_LANGUAGE, 'home')
    );
  });
});

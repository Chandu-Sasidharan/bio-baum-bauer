import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ForgotPassword from '@/pages/auth/forgot-password';
import { renderWithRouter } from '@/test-utils';

const mockUseUser = vi.fn();

vi.mock('@/context/auth-context', () => ({
  useUser: () => mockUseUser(),
}));

vi.mock('@/components/breadcrumbs', () => ({
  default: () => <div data-testid='breadcrumbs' />,
}));

describe('Forgot password page', () => {
  it('requests a reset link and clears the form on success', async () => {
    const requestPasswordReset = vi.fn().mockResolvedValue(true);
    mockUseUser.mockReturnValue({
      requestPasswordReset,
      isUserLoading: false,
    });

    renderWithRouter(<ForgotPassword />);

    const user = userEvent.setup();
    const emailInput = screen.getByPlaceholderText(/your email/i);
    await user.type(emailInput, 'reset@bbb.de');
    await user.click(
      screen.getByRole('button', { name: /send reset link/i })
    );

    await waitFor(() =>
      expect(requestPasswordReset).toHaveBeenCalledWith('reset@bbb.de')
    );
    expect(emailInput).toHaveValue('');
  });

  it('shows a validation error if an invalid email is submitted', async () => {
    const requestPasswordReset = vi.fn();
    mockUseUser.mockReturnValue({
      requestPasswordReset,
      isUserLoading: false,
    });

    renderWithRouter(<ForgotPassword />);

    const user = userEvent.setup();
    const emailInput = screen.getByPlaceholderText(/your email/i);
    await user.type(emailInput, 'not-an-email');
    await user.click(
      screen.getByRole('button', { name: /send reset link/i })
    );

    expect(
      await screen.findByText(/please enter a valid email address/i)
    ).toBeInTheDocument();
    expect(requestPasswordReset).not.toHaveBeenCalled();
  });
});

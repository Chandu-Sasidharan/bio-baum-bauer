import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '@/pages/account/profile';
import { renderWithRouter } from '@/test-utils';

const mockUseUser = vi.fn();

vi.mock('@/context/auth-context', () => ({
  useUser: () => mockUseUser(),
}));

describe('Account Profile', () => {
  it('shows the view mode by default for authenticated users', () => {
    mockUseUser.mockReturnValue({
      authUser: { firstName: 'Alice', lastName: 'Evergreen' },
      updateUser: vi.fn(),
      isUserLoading: false,
    });

    renderWithRouter(<Profile />);

    expect(screen.getByText(/my profile/i)).toBeInTheDocument();
    expect(screen.getByText(/alice/i)).toBeInTheDocument();
    expect(screen.getByText(/evergreen/i)).toBeInTheDocument();
  });

  it('toggles to edit mode and saves the updated profile', async () => {
    const updateUser = vi.fn().mockResolvedValue(undefined);
    mockUseUser.mockReturnValue({
      authUser: { firstName: 'Alice', lastName: 'Evergreen' },
      updateUser,
      isUserLoading: false,
    });

    renderWithRouter(<Profile />);

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /edit/i }));
    const firstNameInput = screen.getByDisplayValue('Alice');
    await user.clear(firstNameInput);
    await user.type(firstNameInput, 'Alicia');
    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() =>
      expect(updateUser).toHaveBeenCalledWith(
        expect.objectContaining({ firstName: 'Alicia' })
      )
    );
  });
});

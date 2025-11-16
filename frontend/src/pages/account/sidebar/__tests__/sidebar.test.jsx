import { screen } from '@testing-library/react';
import Sidebar from '@/pages/account/sidebar';
import { renderWithRouter } from '@/test-utils';

describe('Account Sidebar', () => {
  it('lists the navigation links for profile and sponsorships', () => {
    renderWithRouter(<Sidebar />);

    const profileLink = screen.getByRole('link', { name: /my account/i });
    const sponsorshipsLink = screen.getByRole('link', {
      name: /my sponsorships/i,
    });

    expect(profileLink).toHaveAttribute('href', '/account');
    expect(sponsorshipsLink).toHaveAttribute('href', '/account/sponsorships');
  });
});

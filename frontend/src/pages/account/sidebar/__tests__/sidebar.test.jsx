import { screen } from '@testing-library/react';
import Sidebar from '@/pages/account/sidebar';
import { renderWithRouter } from '@/test-utils';
import { DEFAULT_LANGUAGE } from '@/context/language-context';
import { buildPathForLocale } from '@/utils/routes';

describe('Account Sidebar', () => {
  it('lists the navigation links for profile and sponsorships', () => {
    renderWithRouter(<Sidebar />);

    const profileLink = screen.getByRole('link', { name: /mein profil/i });
    const sponsorshipsLink = screen.getByRole('link', {
      name: /meine patenschaften/i,
    });

    expect(profileLink).toHaveAttribute(
      'href',
      buildPathForLocale(DEFAULT_LANGUAGE, 'account')
    );
    expect(sponsorshipsLink).toHaveAttribute(
      'href',
      buildPathForLocale(DEFAULT_LANGUAGE, ['account', 'sponsorships'])
    );
  });
});

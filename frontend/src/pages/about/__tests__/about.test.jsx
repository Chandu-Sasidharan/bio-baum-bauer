import { screen } from '@testing-library/react';
import About from '@/pages/about';
import { renderWithRouter } from '@/test-utils';
import { DEFAULT_LANGUAGE } from '@/context/language-context';
import { buildPathForLocale } from '@/utils/routes';

describe('About page', () => {
  const renderAbout = () =>
    renderWithRouter(<About />, { initialEntries: ['/about'] });

  it('describes the mission and invites users to plant trees', () => {
    renderAbout();

    expect(
      screen.getByRole('heading', { name: /über biobaumbauer/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/wachstum fördern, nachhaltigkeit stärken/i)
    ).toBeInTheDocument();

    const ctaLink = screen.getByRole('link', {
      name: /jetzt einen baum pflanzen/i,
    });
    expect(ctaLink).toHaveAttribute(
      'href',
      buildPathForLocale(DEFAULT_LANGUAGE, 'trees')
    );
  });

  it('highlights the three program pillars visitors can explore', () => {
    renderAbout();

    expect(
      screen.getByRole('heading', { name: /nachhaltige landwirtschaft/i })
    ).toBeVisible();
    expect(
      screen.getByRole('heading', { name: /gemeinschaft stärken/i })
    ).toBeVisible();
    expect(
      screen.getByRole('heading', { name: /baumpatenschaft/i })
    ).toBeVisible();
  });
});

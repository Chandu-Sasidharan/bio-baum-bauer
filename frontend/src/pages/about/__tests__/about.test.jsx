import { screen } from '@testing-library/react';
import About from '@/pages/about';
import { renderWithRouter } from '@/test-utils';

describe('About page', () => {
  const renderAbout = () =>
    renderWithRouter(<About />, { initialEntries: ['/about'] });

  it('describes the mission and invites users to plant trees', () => {
    renderAbout();

    expect(
      screen.getByRole('heading', { name: /about biobaumbauer/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Empowering Growth, Nurturing Sustainability/i)
    ).toBeInTheDocument();

    const ctaLink = screen.getByRole('link', { name: /plant a tree today/i });
    expect(ctaLink).toHaveAttribute('href', '/trees');
  });

  it('highlights the three program pillars visitors can explore', () => {
    renderAbout();

    expect(
      screen.getByRole('heading', { name: /sustainable farming/i })
    ).toBeVisible();
    expect(
      screen.getByRole('heading', { name: /community engagement/i })
    ).toBeVisible();
    expect(
      screen.getByRole('heading', { name: /sponsor a tree/i })
    ).toBeVisible();
  });
});

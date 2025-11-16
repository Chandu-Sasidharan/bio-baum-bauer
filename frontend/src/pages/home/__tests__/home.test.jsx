import { screen } from '@testing-library/react';
import Home from '@/pages/home';
import { renderWithRouter } from '@/test-utils';

vi.mock('@/pages/home/hero', () => ({
  default: () => <div data-testid='hero-section'>Hero</div>,
}));

vi.mock('@/pages/home/more', () => ({
  default: () => <div data-testid='more-section'>More</div>,
}));

vi.mock('@/pages/home/featured', () => ({
  default: () => <div data-testid='featured-section'>Featured</div>,
}));

vi.mock('@/pages/home/info', () => ({
  default: () => <div data-testid='info-section'>Info</div>,
}));

describe('Home page', () => {
  const renderHome = () =>
    renderWithRouter(<Home />, { initialEntries: ['/'] });

  it('stitches together the hero, info, and featured sections', () => {
    renderHome();

    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('more-section')).toBeInTheDocument();
    expect(screen.getByTestId('featured-section')).toBeInTheDocument();
    expect(screen.getByTestId('info-section')).toBeInTheDocument();
  });

  it('renders sections in the order visitors see while scrolling', () => {
    renderHome();

    const sections = screen.getAllByTestId(/section$/);
    expect(sections.map(node => node.dataset.testid)).toEqual([
      'hero-section',
      'more-section',
      'featured-section',
      'info-section',
    ]);
  });
});

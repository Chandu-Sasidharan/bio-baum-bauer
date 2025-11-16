import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Breadcrumbs from '../index.jsx';

const renderBreadcrumbs = path =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Breadcrumbs />
    </MemoryRouter>,
  );

describe('Breadcrumbs', () => {
  it('renders the home link always', () => {
    renderBreadcrumbs('/');
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  it('builds intermediate links for each path segment', () => {
    renderBreadcrumbs('/trees/featured');

    expect(screen.getByText('Trees')).toHaveAttribute('href', '/trees');
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });
});

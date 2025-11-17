import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Breadcrumbs from '../index.jsx';
import { LanguageProvider } from '@/context/language-context';

const renderBreadcrumbs = path =>
  render(
    <LanguageProvider>
      <MemoryRouter initialEntries={[path]}>
        <Breadcrumbs />
      </MemoryRouter>
    </LanguageProvider>,
  );

describe('Breadcrumbs', () => {
  it('renders the home link always', () => {
    renderBreadcrumbs('/');
    expect(screen.getByText(/Startseite/i)).toBeInTheDocument();
  });

  it('builds intermediate links for each path segment', () => {
    renderBreadcrumbs('/trees/featured');

    expect(screen.getByText('Bäume')).toHaveAttribute('href', '/trees');
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });
});

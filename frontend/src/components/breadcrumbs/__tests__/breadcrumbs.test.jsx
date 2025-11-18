import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Breadcrumbs from '../index.jsx';
import { LanguageProvider } from '@/context/language-context';
import { DEFAULT_LANGUAGE } from '@/constants';
import { ROUTES } from '@/utils/routes';

const renderBreadcrumbs = path => {
  const localePath =
    path === '/'
      ? `/${DEFAULT_LANGUAGE}`
      : `/${DEFAULT_LANGUAGE}${path}`;
  return render(
    <LanguageProvider initialLanguage={DEFAULT_LANGUAGE}>
      <MemoryRouter initialEntries={[localePath]}>
        <Breadcrumbs />
      </MemoryRouter>
    </LanguageProvider>
  );
};

describe('Breadcrumbs', () => {
  it('renders the home link always', () => {
    renderBreadcrumbs('/');
    expect(screen.getByText(/Startseite/i)).toBeInTheDocument();
  });

  it('builds intermediate links for each path segment', () => {
    const treesPath = ROUTES[DEFAULT_LANGUAGE].trees;
    renderBreadcrumbs(`/${treesPath}/sapling-01`);

    expect(screen.getByText('Bäume')).toHaveAttribute(
      'href',
      `/${DEFAULT_LANGUAGE}/${treesPath}`
    );
    expect(screen.getByText('Baumdetails')).toBeInTheDocument();
  });
});

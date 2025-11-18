import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider, DEFAULT_LANGUAGE } from '@/context/language-context';
import {
  SUPPORTED_LANGUAGES,
  buildPathForLocale,
  resolveRouteFromPath,
} from '@/utils/routes';

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
    logger: {
      log: () => {},
      warn: () => {},
      error: () => {},
    },
  });

export const createQueryClientWrapper = () => {
  const queryClient = createTestQueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const getLocaleFromPath = path => {
  const segments = path.split('/').filter(Boolean);
  const possibleLocale = segments[0];
  return SUPPORTED_LANGUAGES.includes(possibleLocale) ? possibleLocale : null;
};

const normalizeEntries = (entries, locale = DEFAULT_LANGUAGE) =>
  entries.map(entry => {
    if (!entry.startsWith('/')) {
      return `/${locale}${entry ? `/${entry}` : ''}`;
    }

    const pathLocale = getLocaleFromPath(entry);
    if (pathLocale) {
      return entry;
    }

    const relativePath = entry.replace(/^\//, '');
    if (!relativePath) {
      return `/${locale}`;
    }

    const match =
      resolveRouteFromPath(locale, relativePath) ||
      resolveRouteFromPath(DEFAULT_LANGUAGE, relativePath) ||
      resolveRouteFromPath('en', relativePath);

    if (match) {
      return buildPathForLocale(locale, match.keys, match.params);
    }

    return `/${locale}/${relativePath}`;
  });

export const renderWithRouter = (
  ui,
  { initialEntries = ['/'], locale } = {}
) => {
  const normalizedEntries = normalizeEntries(
    initialEntries,
    locale || DEFAULT_LANGUAGE
  );
  const derivedLocale =
    locale ||
    normalizedEntries.map(getLocaleFromPath).find(Boolean) ||
    DEFAULT_LANGUAGE;
  const Wrapper = ({ children }) => (
    <LanguageProvider initialLanguage={derivedLocale}>
      <HelmetProvider>
        <MemoryRouter initialEntries={normalizedEntries}>
          {children}
        </MemoryRouter>
      </HelmetProvider>
    </LanguageProvider>
  );

  return render(ui, { wrapper: Wrapper });
};

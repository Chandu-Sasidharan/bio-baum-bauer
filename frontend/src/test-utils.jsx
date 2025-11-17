import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider, DEFAULT_LANGUAGE } from '@/context/language-context';
import {
  ROUTES,
  SUPPORTED_LANGUAGES,
  buildPathForLocale,
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

const tokenRegex = /:([^/]+)/g;

const matchPathForLocale = (locale, path) => {
  const routes = ROUTES[locale] || {};

  const attemptMatch = (remainingPath, collectedKeys = [], collectedParams = {}) => {
    for (const [key, pattern] of Object.entries(routes)) {
      const regexPattern = pattern.replace(tokenRegex, '([^/]+)');
      const fullMatchRegex = new RegExp(`^${regexPattern}$`);
      const fullMatch = fullMatchRegex.exec(remainingPath);

      if (fullMatch) {
        const params = { ...collectedParams };
        const tokens = [...pattern.matchAll(tokenRegex)].map(group => group[1]);
        tokens.forEach((token, index) => {
          params[token] = fullMatch[index + 1];
        });

        return { keys: [...collectedKeys, key], params };
      }

      if (pattern.includes(':')) {
        continue;
      }

      if (remainingPath.startsWith(`${pattern}/`)) {
        const nextPath = remainingPath.slice(pattern.length + 1);
        const nextMatch = attemptMatch(nextPath, [...collectedKeys, key], collectedParams);
        if (nextMatch) {
          return nextMatch;
        }
      }
    }

    return null;
  };

  return attemptMatch(path);
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
      matchPathForLocale(locale, relativePath) ||
      matchPathForLocale(DEFAULT_LANGUAGE, relativePath) ||
      matchPathForLocale('en', relativePath);

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

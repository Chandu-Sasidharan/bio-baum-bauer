export const ROUTES = {
  de: {
    home: '',
    about: 'ueber-uns',
    trees: 'baeume',
    treeDetails: 'baeume/:id',
    impressions: 'eindruecke',
    contact: 'kontakt',
    login: 'anmelden',
    signup: 'registrieren',
    confirmAccount: 'konto-bestaetigen',
    forgotPassword: 'passwort-vergessen',
    resetPassword: 'passwort-zuruecksetzen',
    cart: 'warenkorb',
    checkout: 'zur-kasse',
    paymentStatus: 'zahlungsstatus',
    privacy: 'datenschutz',
    terms: 'agb',
    news: 'neuigkeiten',
    faqs: 'faq',
    account: 'konto',
    sponsorships: 'patenschaften',
  },
  en: {
    home: '',
    about: 'about',
    trees: 'trees',
    treeDetails: 'trees/:id',
    impressions: 'impressions',
    contact: 'contact',
    login: 'login',
    signup: 'signup',
    confirmAccount: 'confirm-account',
    forgotPassword: 'forgot-password',
    resetPassword: 'reset-password',
    cart: 'cart',
    checkout: 'checkout',
    paymentStatus: 'payment-status',
    privacy: 'privacy',
    terms: 'terms',
    news: 'news',
    faqs: 'faqs',
    account: 'account',
    sponsorships: 'sponsorships',
  },
};

export const SUPPORTED_LANGUAGES = Object.keys(ROUTES);

const tokenRegex = /:([^/]+)/g;

export const buildPathForLocale = (locale, keys = [], params = {}) => {
  const normalizedKeys = Array.isArray(keys) ? keys : [keys];
  const segments = normalizedKeys
    .map(key => ROUTES[locale]?.[key] ?? key)
    .filter(segment => segment !== undefined);

  let path = segments.join('/');
  Object.entries(params).forEach(([param, value]) => {
    path = path.replace(new RegExp(`:${param}`, 'g'), value ?? '');
  });

  const suffix = path ? `/${path}` : '';
  return `/${locale}${suffix}`;
};

export const matchRouteKey = (locale, relativePath = '') => {
  const routes = ROUTES[locale] || {};

  for (const [key, pattern] of Object.entries(routes)) {
    const regexPattern = pattern.replace(tokenRegex, '([^/]+)');
    const regex = new RegExp(`^${regexPattern}$`);
    const match = regex.exec(relativePath);

    if (match) {
      const params = {};
      const tokens = [...pattern.matchAll(tokenRegex)].map(group => group[1]);
      tokens.forEach((token, index) => {
        params[token] = match[index + 1];
      });

      return { key, params };
    }
  }

  return null;
};

const getTokens = pattern =>
  [...pattern.matchAll(tokenRegex)].map(group => group[1]);

export const resolveRouteFromPath = (locale, path = '') => {
  const routes = ROUTES[locale] || {};
  const normalizedPath = path.replace(/^\/+/, '');

  if (!normalizedPath) {
    return { keys: ['home'], params: {} };
  }

  const attemptMatch = (remainingPath, collectedKeys = [], collectedParams = {}) => {
    if (!remainingPath) {
      return { keys: collectedKeys, params: collectedParams };
    }

    for (const [key, pattern] of Object.entries(routes)) {
      const regexPattern = pattern.replace(tokenRegex, '([^/]+)');
      const regex = new RegExp(`^${regexPattern}$`);
      const match = regex.exec(remainingPath);

      if (match) {
        const params = { ...collectedParams };
        const tokens = getTokens(pattern);
        tokens.forEach((token, index) => {
          params[token] = match[index + 1];
        });

        return { keys: [...collectedKeys, key], params };
      }

      if (pattern.includes(':')) {
        continue;
      }

      if (remainingPath.startsWith(`${pattern}/`)) {
        const nextPath = remainingPath.slice(pattern.length + 1);
        const nextMatch = attemptMatch(
          nextPath,
          [...collectedKeys, key],
          collectedParams
        );
        if (nextMatch) {
          return nextMatch;
        }
      }
    }

    return null;
  };

  return attemptMatch(normalizedPath);
};

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
    impressum: 'impressum',
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
    impressum: 'impressum',
    account: 'account',
    sponsorships: 'sponsorships',
  },
};

export const SUPPORTED_LANGUAGES = Object.keys(ROUTES);

// Regex to identify route parameters like :id, :slug
const tokenRegex = /:([^/]+)/g;

// Function to match a relative path to a route key
export const matchRouteKey = (locale, relativePath = '') => {
  const routes = ROUTES[locale] || {};

  for (const [key, pattern] of Object.entries(routes)) {
    const regexPattern = pattern.replace(tokenRegex, '([^/]+)');
    const regex = new RegExp(`^${regexPattern}$`);

    if (regex.test(relativePath)) {
      return key;
    }
  }

  return null;
};

// Function to resolve route keys and parameters from a given path
export const resolveRouteFromPath = (locale, path = '') => {
  const routes = ROUTES[locale] || {};
  const normalizedPath = path.replace(/^\/+/, '') || 'home';

  // Try exact match
  for (const [key, pattern] of Object.entries(routes)) {
    if (pattern === normalizedPath) {
      return { keys: [key], params: {} };
    }
  }

  // Try pattern match with parameters
  for (const [key, pattern] of Object.entries(routes)) {
    const tokens = [...pattern.matchAll(tokenRegex)].map(g => g[1]);
    if (tokens.length === 0) continue;

    const regexPattern = pattern.replace(tokenRegex, '([^/]+)');
    const match = new RegExp(`^${regexPattern}$`).exec(normalizedPath);

    if (match) {
      const params = {};
      tokens.forEach((token, i) => (params[token] = match[i + 1]));
      return { keys: [key], params };
    }
  }

  // Fallback: map each segment to a known route key (e.g., account/sponsorships)
  const segments = normalizedPath.split('/').filter(Boolean);
  if (segments.length > 1) {
    const keys = [];
    for (const segment of segments) {
      const entry = Object.entries(routes).find(
        ([, pattern]) => pattern === segment
      );
      if (!entry) {
        return null;
      }
      keys.push(entry[0]);
    }
    if (keys.length) {
      return { keys, params: {} };
    }
  }

  return null;
};

// Function to build a path for a given locale, route keys, and parameters
export const buildPathForLocale = (locale, keys = [], params = {}) => {
  const keyArray = Array.isArray(keys) ? keys : [keys];

  // Build path from route keys
  let path = keyArray.map(key => ROUTES[locale]?.[key] ?? key).join('/');

  // Replace params
  for (const [param, value] of Object.entries(params)) {
    path = path.replace(`:${param}`, value ?? '');
  }

  return path ? `/${locale}/${path}` : `/${locale}`;
};

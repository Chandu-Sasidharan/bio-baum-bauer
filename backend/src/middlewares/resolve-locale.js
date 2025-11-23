import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '#src/constants/i18n.js';

const parseAcceptLanguage = header => {
  if (!header) return [];

  return header
    .split(',')
    .map(lang => lang.split(';')[0]?.trim().toLowerCase())
    .filter(Boolean);
};

const resolveLocale = (req, _res, next) => {
  const queryLang =
    typeof req.query.lang === 'string'
      ? req.query.lang.toLowerCase()
      : undefined;

  const candidates = [
    queryLang,
    ...parseAcceptLanguage(req.headers['accept-language']),
  ].filter(Boolean);

  const matched =
    candidates.find(lang => SUPPORTED_LOCALES.includes(lang)) ?? DEFAULT_LOCALE;

  req.locale = matched;
  next();
};

export default resolveLocale;

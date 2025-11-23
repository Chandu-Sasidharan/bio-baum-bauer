import { DEFAULT_LOCALE } from '#src/constants/i18n.js';

const pickLocalizedField = (field, locale, fallback = DEFAULT_LOCALE) => {
  if (field && typeof field === 'object') {
    const byLocale = field[locale];
    if (byLocale) return byLocale;

    const byFallback = field[fallback];
    if (byFallback) return byFallback;

    const byDefault = field[DEFAULT_LOCALE];
    if (byDefault) return byDefault;

    return field.en ?? field.de ?? '';
  }

  if (typeof field === 'string') {
    return field;
  }

  return '';
};

export default pickLocalizedField;

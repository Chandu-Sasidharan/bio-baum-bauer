import { useLanguage } from '@/context/language-context';
import { SUPPORTED_LANGUAGES, buildPathForLocale } from '@/utils/routes';
import { DEFAULT_LANGUAGE } from '@/constants';

export default function useLocalizedPath() {
  const { language } = useLanguage();
  const locale = SUPPORTED_LANGUAGES.includes(language)
    ? language
    : DEFAULT_LANGUAGE;

  const buildPath = (...keysOrParams) => {
    let params = {};
    const keys = [...keysOrParams];

    if (
      keys.length &&
      typeof keys[keys.length - 1] === 'object' &&
      !Array.isArray(keys[keys.length - 1])
    ) {
      params = keys.pop();
    }

    return buildPathForLocale(locale, keys, params);
  };

  return { language: locale, buildPath };
}

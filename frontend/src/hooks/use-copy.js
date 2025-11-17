import { useMemo } from 'react';
import {
  DEFAULT_LANGUAGE,
  useLanguage,
} from '@/context/language-context';

export default function useCopy(copy = {}) {
  const { language } = useLanguage();

  return useMemo(() => copy[language] || copy[DEFAULT_LANGUAGE] || {}, [copy, language]);
}

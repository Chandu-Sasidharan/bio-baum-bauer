import { DEFAULT_LANGUAGE } from '@/constants';
import { useLanguage } from '@/context/lang-context';

export default function useCopy(copy = {}) {
  const { language } = useLanguage();

  return copy[language] || copy[DEFAULT_LANGUAGE] || {};
}

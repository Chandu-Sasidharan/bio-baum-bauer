import { LANGUAGES, useLanguage } from '@/context/language-context';
import { useLocation, useNavigate } from 'react-router-dom';
import useCopy from '@/hooks/use-copy';
import {
  SUPPORTED_LANGUAGES,
  buildPathForLocale,
  resolveRouteFromPath,
} from '@/utils/routes';

const copy = {
  de: {
    label: 'Sprache',
    ariaLabel: 'Sprache auswählen',
    options: {
      de: 'Deutsch',
      en: 'Englisch',
    },
  },
  en: {
    label: 'Language',
    ariaLabel: 'Select language',
    options: {
      de: 'German',
      en: 'English',
    },
  },
};

export default function LanguageSelector({ compact = false }) {
  const { language, setLanguage } = useLanguage();
  const text = useCopy(copy);
  const navigate = useNavigate();
  const location = useLocation();

  const getRelativePath = () => {
    const segments = location.pathname.split('/').filter(Boolean);
    const possibleLocale = segments[0];
    if (SUPPORTED_LANGUAGES.includes(possibleLocale)) {
      return segments.slice(1).join('/');
    }
    return segments.join('/');
  };

  const handleChange = event => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);

    const currentLocaleSegment = location.pathname.split('/')[1];
    const activeLocale = SUPPORTED_LANGUAGES.includes(currentLocaleSegment)
      ? currentLocaleSegment
      : language;
    const relativePath = getRelativePath();
    const match = resolveRouteFromPath(activeLocale, relativePath);
    const nextPath = match
      ? buildPathForLocale(newLanguage, match.keys, match.params)
      : buildPathForLocale(newLanguage, ['home']);

    navigate(nextPath, { replace: true });
  };

  return (
    <label className='flex items-center gap-2 text-xs uppercase tracking-wide'>
      {!compact && <span>{text.label}</span>}
      <select
        value={language}
        onChange={handleChange}
        aria-label={text.ariaLabel}
        className='bg-primary-light text-accent rounded-lg border border-primary px-2 py-1 text-xs font-semibold uppercase focus:outline-none'
      >
        {LANGUAGES.map(item => (
          <option key={item.code} value={item.code}>
            {text.options[item.code]}
          </option>
        ))}
      </select>
    </label>
  );
}

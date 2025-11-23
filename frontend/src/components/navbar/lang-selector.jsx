import { useLanguage } from '@/context/lang-context';
import { useLocation, useNavigate } from 'react-router-dom';
import useCopy from '@/hooks/use-copy';
import {
  SUPPORTED_LANGUAGES,
  buildPathForLocale,
  resolveRouteFromPath,
} from '@/utils/routes';
import { LANGUAGES } from '@/constants';

const copy = {
  de: {
    label: 'Sprache',
    ariaLabel: 'Sprache auswählen',
    options: {
      de: 'DE',
      en: 'EN',
    },
  },
  en: {
    label: 'Language',
    ariaLabel: 'Select language',
    options: {
      de: 'DE',
      en: 'EN',
    },
  },
};

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const text = useCopy(copy);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = event => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);

    // Get current path without locale
    const segments = location.pathname.split('/').filter(Boolean);
    const hasLocale = SUPPORTED_LANGUAGES.includes(segments[0]);
    const currentLocale = hasLocale ? segments[0] : language;
    const relativePath = hasLocale
      ? segments.slice(1).join('/')
      : segments.join('/');

    // Find route and build new path
    const match = resolveRouteFromPath(currentLocale, relativePath);
    const nextPath = match
      ? buildPathForLocale(newLanguage, match.keys, match.params)
      : buildPathForLocale(newLanguage, ['home']);

    // Preserve any in-flight navigation state (e.g., Stripe paymentIntent) and query params
    const nextUrl = `${nextPath}${location.search || ''}`;
    navigate(nextUrl, { replace: true, state: location.state });
  };

  return (
    <select
      value={language}
      onChange={handleChange}
      aria-label={text.ariaLabel}
      className='select select-sm input-light text-accent border-primary w-16 rounded-lg border font-semibold uppercase focus:outline-none'
    >
      {LANGUAGES.map(item => (
        <option key={item.code} value={item.code}>
          {text.options[item.code]}
        </option>
      ))}
    </select>
  );
}

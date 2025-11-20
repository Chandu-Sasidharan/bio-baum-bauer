import { Link, useLocation } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import { useLanguage } from '@/context/lang-context';
import useLocalizedPath from '@/hooks/use-localized-path';
import { SUPPORTED_LANGUAGES, matchRouteKey } from '@/utils/routes';

const segmentTranslations = {
  de: {
    home: 'Startseite',
    about: 'Über uns',
    trees: 'Bäume',
    treeDetails: 'Baumdetails',
    impressions: 'Eindrücke',
    contact: 'Kontakt',
    login: 'Anmelden',
    signup: 'Registrieren',
    confirmAccount: 'Konto bestätigen',
    forgotPassword: 'Passwort vergessen',
    resetPassword: 'Passwort zurücksetzen',
    cart: 'Warenkorb',
    checkout: 'Zur Kasse',
    paymentStatus: 'Zahlungsstatus',
    privacy: 'Datenschutz',
    terms: 'AGB',
    news: 'News',
    faqs: 'FAQs',
    account: 'Konto',
    sponsorships: 'Baumpatenschaften',
  },
  en: {
    home: 'Home',
    about: 'About',
    account: 'Account',
    cart: 'Cart',
    checkout: 'Checkout',
    contact: 'Contact',
    faqs: 'FAQs',
    confirmAccount: 'Confirm Account',
    forgotPassword: 'Forgot Password',
    resetPassword: 'Reset Password',
    home: 'Home',
    impressions: 'Impressions',
    login: 'Login',
    news: 'News',
    paymentStatus: 'Payment Status',
    privacy: 'Privacy',
    signup: 'Sign Up',
    terms: 'Terms',
    trees: 'Trees',
    treeDetails: 'Tree Details',
    sponsorships: 'Sponsorships',
  },
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  const localeSegment = SUPPORTED_LANGUAGES.includes(pathSegments[0])
    ? pathSegments[0]
    : null;
  const trailSegments = localeSegment ? pathSegments.slice(1) : pathSegments;
  const localePrefix = localeSegment ? [localeSegment] : [];
  const { language } = useLanguage();
  const { buildPath } = useLocalizedPath();

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatSegment = (segment, index) => {
    const relativePath = trailSegments.slice(0, index + 1).join('/');
    const matchedRoute = matchRouteKey(language, relativePath);
    const translation =
      (matchedRoute?.key &&
        segmentTranslations[language]?.[matchedRoute.key]) ||
      segmentTranslations[language]?.[segment] ||
      segmentTranslations[language]?.[segment.toLowerCase()];

    if (translation) {
      return translation;
    }

    return segment
      .split('-')
      .map(capitalizeFirstLetter)
      .join(' ');
  };

  return (
    <nav className='py-3 text-sm'>
      <ol className='list-reset flex'>
        <li>
          <Link
            to={buildPath('home')}
            className='text-accent hover:text-golden-red flex items-center gap-1 duration-100'
          >
            <HiHome /> {segmentTranslations[language].home}
          </Link>
        </li>
        {trailSegments.map((segment, index) => {
          const href =
            '/' +
            [...localePrefix, ...trailSegments.slice(0, index + 1)]
              .filter(Boolean)
              .join('/');
          const isLast = index === trailSegments.length - 1;
          const label = formatSegment(segment, index);
          return (
            <li key={href} className='flex items-center'>
              <span className='mx-2'>/</span>
              {isLast ? (
                <span className='text-gray-500'>{label}</span>
              ) : (
                <Link
                  to={href}
                  className='text-accent hover:text-golden-red duration-100'
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

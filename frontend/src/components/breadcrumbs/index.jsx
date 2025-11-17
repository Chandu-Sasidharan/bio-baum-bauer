import { Link, useLocation } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import { useLanguage } from '@/context/language-context';

const segmentTranslations = {
  de: {
    about: 'Über uns',
    account: 'Konto',
    cart: 'Warenkorb',
    checkout: 'Zur Kasse',
    contact: 'Kontakt',
    faqs: 'FAQs',
    'confirm-account': 'Konto bestätigen',
    'forgot-password': 'Passwort vergessen',
    'reset-password': 'Passwort zurücksetzen',
    home: 'Startseite',
    impressions: 'Eindrücke',
    login: 'Anmelden',
    news: 'News',
    'payment-status': 'Zahlungsstatus',
    privacy: 'Datenschutz',
    signup: 'Registrieren',
    terms: 'AGB',
    trees: 'Bäume',
    aboutus: 'Über uns',
    'my-account': 'Mein Konto',
    sponsorships: 'Baumpatenschaften',
  },
  en: {
    about: 'About',
    account: 'Account',
    cart: 'Cart',
    checkout: 'Checkout',
    contact: 'Contact',
    faqs: 'FAQs',
    'confirm-account': 'Confirm Account',
    'forgot-password': 'Forgot Password',
    'reset-password': 'Reset Password',
    home: 'Home',
    impressions: 'Impressions',
    login: 'Login',
    news: 'News',
    'payment-status': 'Payment Status',
    privacy: 'Privacy',
    signup: 'Sign Up',
    terms: 'Terms',
    trees: 'Trees',
    sponsorships: 'Sponsorships',
  },
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  const { language } = useLanguage();

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatSegment = segment => {
    const translation =
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
            to='/'
            className='text-accent hover:text-golden-red flex items-center gap-1 duration-100'
          >
            <HiHome /> {segmentTranslations[language].home}
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/');
          const isLast = index === pathSegments.length - 1;
          const label = formatSegment(segment);
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

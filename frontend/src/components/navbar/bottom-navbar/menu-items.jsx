import { FaHome, FaImages } from 'react-icons/fa';
import { RiFileInfoFill } from 'react-icons/ri';
import { MdContacts } from 'react-icons/md';
import treeIcon from '/images/misc/tree.png';

const menuItems = [
  {
    key: 'home',
    paths: {
      de: '',
      en: '',
    },
    labels: {
      de: 'Startseite',
      en: 'Home',
    },
    icon: <FaHome />,
    ariaLabel: {
      de: 'Zur Startseite',
      en: 'Home page',
    },
  },
  {
    key: 'about',
    labels: {
      de: 'Über uns',
      en: 'About',
    },
    icon: <RiFileInfoFill />,
    ariaLabel: {
      de: 'Über-uns-Seite',
      en: 'About page',
    },
  },
  {
    key: 'trees',
    labels: {
      de: 'Bäume',
      en: 'Trees',
    },
    icon: <img src={treeIcon} alt='Tree Icon' className='h-4 w-4' />,
    ariaLabel: {
      de: 'Seite Bäume',
      en: 'Trees page',
    },
  },
  {
    key: 'impressions',
    labels: {
      de: 'Eindrücke',
      en: 'Impressions',
    },
    icon: <FaImages />,
    ariaLabel: {
      de: 'Seite Eindrücke',
      en: 'Impressions page',
    },
  },
  {
    key: 'contact',
    labels: {
      de: 'Kontakt',
      en: 'Contact',
    },
    icon: <MdContacts />,
    ariaLabel: {
      de: 'Kontaktseite',
      en: 'Contact page',
    },
  },
];

export default menuItems;

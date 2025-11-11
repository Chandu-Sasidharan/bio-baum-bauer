import { FaHome, FaImages } from 'react-icons/fa';
import { RiFileInfoFill } from 'react-icons/ri';
import { MdContacts } from 'react-icons/md';
import treeIcon from '/images/misc/tree.png';

const menuItems = [
  { to: '/', pageName: 'Home', icon: <FaHome />, ariaLabel: 'Home page' },
  {
    to: '/about',
    pageName: 'About',
    icon: <RiFileInfoFill />,
    ariaLabel: 'About page',
  },
  {
    to: '/trees',
    pageName: 'Trees',
    icon: <img src={treeIcon} alt='Tree Icon' className='h-4 w-4' />,
    ariaLabel: 'Trees page',
  },
  {
    to: '/impressions',
    pageName: 'Impressions',
    icon: <FaImages />,
    ariaLabel: 'Impressions page',
  },
  {
    to: '/contact',
    pageName: 'Contact',
    icon: <MdContacts />,
    ariaLabel: 'Contact page',
  },
];

export default menuItems;

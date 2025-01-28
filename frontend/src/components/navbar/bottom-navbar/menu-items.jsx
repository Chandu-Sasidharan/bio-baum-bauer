import { FaHome, FaTree, FaRegNewspaper, FaImages } from 'react-icons/fa';
import { RiQuestionAnswerFill, RiFileInfoFill } from 'react-icons/ri';
import { MdContacts } from 'react-icons/md';

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
    icon: <FaTree />,
    ariaLabel: 'Trees page',
  },
  {
    to: '/gallery',
    pageName: 'Gallery',
    icon: <FaImages />,
    ariaLabel: 'Gallery page',
  },
  {
    to: '/contact',
    pageName: 'Contact',
    icon: <MdContacts />,
    ariaLabel: 'Contact page',
  },
];

export default menuItems;

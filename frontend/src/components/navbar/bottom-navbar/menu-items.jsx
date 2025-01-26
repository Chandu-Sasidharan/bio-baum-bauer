import { FaHome, FaTree, FaRegNewspaper, FaImages } from 'react-icons/fa';
import { RiQuestionAnswerFill, RiFileInfoFill } from 'react-icons/ri';
import { MdContacts } from 'react-icons/md';

const menuItems = [
  { to: '/', pageName: 'Home', icon: <FaHome /> },
  { to: '/about', pageName: 'About', icon: <RiFileInfoFill /> },
  { to: '/trees', pageName: 'Trees', icon: <FaTree /> },
  { to: '/news', pageName: 'News', icon: <FaRegNewspaper /> },
  { to: '/gallery', pageName: 'Gallery', icon: <FaImages /> },
  { to: '/faq', pageName: 'FAQs', icon: <RiQuestionAnswerFill /> },
  { to: '/contact', pageName: 'Contact', icon: <MdContacts /> },
];

export default menuItems;

import { FaHome, FaTree, FaRegNewspaper, FaImages } from 'react-icons/fa';
import { RiQuestionAnswerFill } from 'react-icons/ri';
import { RiFileInfoFill } from 'react-icons/ri';
import { MdContacts } from 'react-icons/md';
import DesktopMenuLink from '@/components/navbar/bottom-navbar/desktop-menu-link';
import Divider from '@/components/navbar/bottom-navbar/desktop-menu-divider';

export default function DesktopMenu() {
  return (
    <nav className='hidden gap-4 md:flex lg:gap-9 xl:gap-12 2xl:gap-16'>
      <DesktopMenuLink
        to='/'
        pageName='Home'
        icon={<FaHome />}
      ></DesktopMenuLink>
      <Divider />
      <DesktopMenuLink
        to='/trees'
        pageName='Trees'
        icon={<FaTree />}
      ></DesktopMenuLink>
      <Divider />
      <DesktopMenuLink
        to='/news'
        pageName='News'
        icon={<FaRegNewspaper />}
      ></DesktopMenuLink>
      <Divider />
      <DesktopMenuLink
        to='/about'
        pageName='About'
        icon={<RiFileInfoFill />}
      ></DesktopMenuLink>
      <Divider />
      <DesktopMenuLink
        to='/gallery'
        pageName='Gallery'
        icon={<FaImages />}
      ></DesktopMenuLink>
      <Divider />
      <DesktopMenuLink
        to='/faq'
        pageName='FAQs'
        icon={<RiQuestionAnswerFill />}
      ></DesktopMenuLink>
      <Divider />
      <DesktopMenuLink
        to='/contact'
        pageName='Contact'
        icon={<MdContacts />}
      ></DesktopMenuLink>
    </nav>
  );
}

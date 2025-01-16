import { RiQuestionAnswerFill } from 'react-icons/ri';
import { RiFileInfoFill } from 'react-icons/ri';
import { MdContacts } from 'react-icons/md';
import { FaHome, FaTree, FaRegNewspaper, FaImages } from 'react-icons/fa';
import TopNavBar from '@/components/navbar/topNavbar';
import NavMenuLink from '@/components/navbar/desktop/nav-menu-link';
import Divider from '@/components/navbar/desktop/divider';

export default function DesktopNavbar({ isNavbarFixed }) {
  const desktopNavbarStyle = {
    position: isNavbarFixed ? 'fixed' : 'static',
  };

  return (
    <>
      <TopNavBar />
      <nav
        className='text-accent bg-primary items-ce top-0 z-30 flex h-[60px] w-full items-center justify-center'
        style={desktopNavbarStyle}
      >
        {/* DesktopNavbar Links */}
        <div className='flex gap-4 lg:gap-9 xl:gap-12 2xl:gap-16'>
          <NavMenuLink to='/' pageName='Home' icon={<FaHome />}></NavMenuLink>
          <Divider />
          <NavMenuLink
            to='/trees'
            pageName='Trees'
            icon={<FaTree />}
          ></NavMenuLink>
          <Divider />
          <NavMenuLink
            to='/news'
            pageName='News'
            icon={<FaRegNewspaper />}
          ></NavMenuLink>
          <Divider />
          <NavMenuLink
            to='/about'
            pageName='About'
            icon={<RiFileInfoFill />}
          ></NavMenuLink>
          <Divider />
          <NavMenuLink
            to='/gallery'
            pageName='Gallery'
            icon={<FaImages />}
          ></NavMenuLink>
          <Divider />
          <NavMenuLink
            to='/faq'
            pageName='FAQs'
            icon={<RiQuestionAnswerFill />}
          ></NavMenuLink>
          <Divider />
          <NavMenuLink
            to='/contact'
            pageName='Contact'
            icon={<MdContacts />}
          ></NavMenuLink>
        </div>
      </nav>
    </>
  );
}

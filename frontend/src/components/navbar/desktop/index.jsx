import { useEffect } from 'react';
import { FcFaq } from 'react-icons/fc';
import { MdContacts } from 'react-icons/md';
import {
  FaHome,
  FaTree,
  FaRegNewspaper,
  FaInfoCircle,
  FaImages,
} from 'react-icons/fa';
import AuthNavbar from '@/components/navbar/auth';
import NavMenuLink from '@/components/navbar/desktop/nav-menu-link';

export default function DesktopNavbar({ isNavbarFixed, setIsNavbarFixed }) {
  /* Handle DesktopNavbar on Scroll */
  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarFixed(window.scrollY >= 80);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsNavbarFixed]);

  const desktopNavbarStyle = {
    position: isNavbarFixed ? 'fixed' : 'static',
  };

  return (
    <>
      <AuthNavbar />
      <nav
        className='desktop-nav-z-index-v-10 text-accent bg-primary items-ce top-0 flex h-[60px] w-full items-center justify-center'
        style={desktopNavbarStyle}
      >
        {/* DesktopNavbar Links */}
        <div className='flex gap-10 lg:gap-20 xl:gap-24'>
          <NavMenuLink to='/' pageName='Home' icon={<FaHome />}></NavMenuLink>
          <NavMenuLink
            to='/trees'
            pageName='Trees'
            icon={<FaTree />}
          ></NavMenuLink>
          <NavMenuLink
            to='/news'
            pageName='News'
            icon={<FaRegNewspaper />}
          ></NavMenuLink>
          <NavMenuLink
            to='/about'
            pageName='About'
            icon={<FaInfoCircle />}
          ></NavMenuLink>
          <NavMenuLink
            to='/gallery'
            pageName='Gallery'
            icon={<FaImages />}
          ></NavMenuLink>
          <NavMenuLink to='/faq' pageName='FAQs' icon={<FcFaq />}></NavMenuLink>
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

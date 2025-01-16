import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fallDown as Menu } from 'react-burger-menu';
import TopNavBar from '@/components/navbar/topNavbar';
import closeIcon from '/images/navbar/close-icon.svg';
import hamburgerIcon from '/images/navbar/hamburger-icon.svg';

const MobileNavbar = ({ isNavbarFixed }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const mobileNavbarStyle = {
    position: isNavbarFixed ? 'fixed' : 'static',
  };

  return (
    <>
      <TopNavBar />
      <div
        className='mobile-nav bg-primary top-0 flex h-[60px] w-full items-center justify-start px-2'
        style={mobileNavbarStyle}
      >
        {/* Open Menu Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className='h-[50px] w-[50px]'
          aria-label='Hambuger Menu'
        >
          <img src={hamburgerIcon} alt='Hamburger Icon' />
        </button>
      </div>

      {/* MobileNavbar Menu with Links */}
      <Menu
        isOpen={isMenuOpen}
        customBurgerIcon={false}
        customCrossIcon={false}
        width={'100%'}
        pageWrapId={'page-wrap'}
        className='bg-primary fixed left-0 top-0 h-screen overflow-y-auto p-4'
      >
        {/* Close Menu Button */}
        <div className='absolute right-6 top-6'>
          <button
            onClick={() => setIsMenuOpen(false)}
            className='h-[25px] w-[25px]'
            aria-label='Close menu'
          >
            <img src={closeIcon} alt='Close Menu' />
          </button>
        </div>

        {/* Links */}
        <Link
          to='/'
          className='menu-item text-stone scale-origin-left duration-400 border-b border-white pt-16 transition-transform ease-linear'
          onClick={handleLinkClick}
          aria-label='Home page'
        >
          Home
        </Link>
        <Link
          to='/trees'
          className='menu-item text-stone scale-origin-left duration-400 border-b border-white pt-4 transition-transform ease-linear'
          onClick={handleLinkClick}
          aria-label='Sponsor page'
        >
          Trees
        </Link>
        <Link
          to='/news'
          className='menu-item text-stone scale-origin-left duration-400 border-b border-white pt-4 transition-transform ease-linear'
          onClick={handleLinkClick}
          aria-label='News page'
        >
          News
        </Link>
        <Link
          to='/about'
          className='menu-item text-stone scale-origin-left duration-400 border-b border-white pt-4 transition-transform ease-linear'
          onClick={handleLinkClick}
          aria-label='About page'
        >
          About
        </Link>
        <Link
          to='/gallery'
          className='menu-item text-stone scale-origin-left duration-400 border-b border-white pt-4 transition-transform ease-linear'
          onClick={handleLinkClick}
          aria-label='Gallery page'
        >
          Gallery
        </Link>
        <Link
          to='/faq'
          className='menu-item text-stone scale-origin-left duration-400 border-b border-white pt-4 transition-transform ease-linear'
          onClick={handleLinkClick}
          aria-label='FAQ page'
        >
          FAQs
        </Link>
        <Link
          to='/contact'
          className='menu-item text-stone scale-origin-left duration-400 border-b border-white pt-4 transition-transform ease-linear'
          onClick={handleLinkClick}
          aria-label='Contact page'
        >
          Contact
        </Link>
      </Menu>
    </>
  );
};

export default MobileNavbar;

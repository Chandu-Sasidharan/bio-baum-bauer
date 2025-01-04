import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fallDown as Menu } from 'react-burger-menu';
import AuthNavbar from '@/components/navbar/auth';
import closeMenu from '/images/navbar/close-icon.svg';
import openMenu from '/images/navbar/hamburger-icon.svg';

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  /* Handle MobileNavbar on Scroll */
  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarVisible(window.scrollY <= 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const mobileNavbarStyle = {
    position: isNavbarVisible ? 'sticky' : 'fixed',
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav id='outer-container'>
      {isNavbarVisible && <AuthNavbar />}
      <div
        className='mobile-nav w-full top-0 h-[60px] bg-primary flex justify-start items-center px-2'
        style={mobileNavbarStyle}
      >
        {/* Open Menu Button */}
        <button
          onClick={toggleMenu}
          className='w-[50px] h-[50px]'
          aria-label='Open menu'
        >
          <img src={openMenu} alt='Open Menu' />
        </button>
      </div>

      {isMenuOpen && (
        <div
          className='mobile-menu-bg fixed inset-0 bg-black bg-opacity-50'
          onClick={toggleMenu}
        ></div>
      )}

      {/* MobileNavbar Menu with Links */}
      <Menu
        isOpen={isMenuOpen}
        onStateChange={({ isOpen }) => setIsMenuOpen(isOpen)}
        customBurgerIcon={false}
        customCrossIcon={false}
        width={'60%'}
        pageWrapId={'page-wrap'}
        className='bg-primary fixed top-0 left-0 h-screen overflow-y-auto p-4 '
      >
        {/* Close Menu Button */}
        <div className='absolute top-6 right-6'>
          <button
            onClick={toggleMenu}
            className='w-[25px] h-[25px]'
            aria-label='Close menu'
          >
            <img src={closeMenu} alt='Close Menu' />
          </button>
        </div>
        {/* Links */}
        <Link
          to='/'
          className='menu-item border-b border-white text-stone scale-origin-left transition-transform duration-400 ease-linear hover:text-gray-dark pt-[100px]'
          onClick={handleLinkClick}
          aria-label='Home page'
        >
          Home
        </Link>
        <Link
          to='/trees'
          className='menu-item pt-4 border-b border-white text-stone scale-origin-left transition-transform duration-400 ease-linear hover:text-gray-dark'
          onClick={handleLinkClick}
          aria-label='Sponsor page'
        >
          Trees
        </Link>
        <Link
          to='/news'
          className='menu-item pt-4 border-b border-white text-stone scale-origin-left transition-transform duration-400 ease-linear hover:text-gray-dark'
          onClick={handleLinkClick}
          aria-label='News page'
        >
          News
        </Link>
        <Link
          to='/about'
          className='menu-item pt-4 border-b border-white text-stone scale-origin-left transition-transform duration-400 ease-linear hover:text-gray-dark'
          onClick={handleLinkClick}
          aria-label='About page'
        >
          About
        </Link>
        <Link
          to='/gallery'
          className='menu-item pt-4 border-b border-white text-stone scale-origin-left transition-transform duration-400 ease-linear hover:text-gray-dark'
          onClick={handleLinkClick}
          aria-label='Gallery page'
        >
          Gallery
        </Link>
        <Link
          to='/faq'
          className='menu-item pt-4 border-b border-white text-stone scale-origin-left transition-transform duration-400 ease-linear hover:text-gray-dark'
          onClick={handleLinkClick}
          aria-label='FAQ page'
        >
          FAQs
        </Link>
        <Link
          to='/contact'
          className='menu-item pt-4 border-b border-white text-stone scale-origin-left transition-transform duration-400 ease-linear hover:text-gray-dark'
          onClick={handleLinkClick}
          aria-label='Contact page'
        >
          Contact
        </Link>
      </Menu>
    </nav>
  );
};

export default MobileNavbar;

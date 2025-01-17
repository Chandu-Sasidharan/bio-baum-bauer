import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { fallDown as FalldownMenu } from 'react-burger-menu';
import closeIcon from '/images/navbar/close-icon.svg';
import hamburgerIcon from '/images/navbar/hamburger-icon.svg';

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const linkStyles = classNames({
    'text-stone border-b border-primary-light pt-4': true,
  });

  return (
    <div className='w-full md:hidden'>
      <div className='mobile-nav bg-primary top-0 flex h-[60px] w-full items-center justify-start px-2'>
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
      <FalldownMenu
        isOpen={isMenuOpen}
        customBurgerIcon={false}
        customCrossIcon={false}
        width={'100%'}
        className='bg-primary fixed left-0 top-0 h-screen overflow-y-auto p-4 pt-10'
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
          className={linkStyles}
          onClick={handleLinkClick}
          aria-label='Home page'
        >
          Home
        </Link>
        <Link
          to='/trees'
          className={linkStyles}
          onClick={handleLinkClick}
          aria-label='Sponsor page'
        >
          Trees
        </Link>
        <Link
          to='/news'
          className={linkStyles}
          onClick={handleLinkClick}
          aria-label='News page'
        >
          News
        </Link>
        <Link
          to='/about'
          className={linkStyles}
          onClick={handleLinkClick}
          aria-label='About page'
        >
          About
        </Link>
        <Link
          to='/gallery'
          className={linkStyles}
          onClick={handleLinkClick}
          aria-label='Gallery page'
        >
          Gallery
        </Link>
        <Link
          to='/faq'
          className={linkStyles}
          onClick={handleLinkClick}
          aria-label='FAQ page'
        >
          FAQs
        </Link>
        <Link
          to='/contact'
          className={linkStyles}
          onClick={handleLinkClick}
          aria-label='Contact page'
        >
          Contact
        </Link>
      </FalldownMenu>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/button';
import closeIcon from '/images/misc/close-icon.svg';
import hamburgerIcon from '/images/misc/hamburger-icon.svg';
import menuItems from '@/components/navbar/bottom-navbar/menu-items';
import treeIcon from '/images/misc/tree.png';

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className='w-full md:hidden'>
      {/* Header */}
      <div className='bg-primary top-0 z-[1] flex h-[60px] w-full items-center justify-between px-2'>
        {/* Open Menu Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className='h-[50px] w-[50px]'
          aria-label='Hambuger Menu'
        >
          <img src={hamburgerIcon} alt='Hamburger Icon' />
        </button>
        {/* Plant a Tree Button */}
        <Link to='/trees'>
          <Button size='sm' variant='primary' className='bg-primary-light'>
            <img src={treeIcon} alt='Tree Icon' className='mr-2 h-5 w-5' />
            <span>Plant a Tree</span>
          </Button>
        </Link>
      </div>

      {/* Sliding Mobile Menu Overlay */}
      <div
        className={`bg-primary fixed left-0 top-0 z-40 h-screen w-full transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
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

        {/* Menu Links */}
        <div className='mt-[100px] flex flex-col items-center'>
          {menuItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              onClick={handleLinkClick}
              aria-label={item.ariaLabel}
              className='text-stone border-primary-light py-4 text-xl'
            >
              {item.pageName}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

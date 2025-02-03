import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fallDown as FalldownMenu } from 'react-burger-menu';
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
      <div className='bg-primary top-0 z-[1] flex h-[60px] w-full items-center justify-between px-2'>
        {/* Open Menu Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className='h-[50px] w-[50px]'
          aria-label='Hambuger Menu'
        >
          <img src={hamburgerIcon} alt='Hamburger Icon' />
        </button>
        <Link to='/trees'>
          <Button size='sm' variant='primary' className='bg-primary-light'>
            <img src={treeIcon} alt='Tree Icon' className='mr-2 h-5 w-5' />
            <span>Plant a Tree</span>
          </Button>
        </Link>
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
        {menuItems.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className='text-stone border-primary-light block border-b pt-4'
            onClick={handleLinkClick}
            aria-label={item.ariaLabel}
          >
            {item.pageName}
          </Link>
        ))}
      </FalldownMenu>
    </div>
  );
}

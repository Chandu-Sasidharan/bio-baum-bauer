import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/button';
import closeIcon from '/images/misc/close-icon.svg';
import hamburgerIcon from '/images/misc/hamburger-icon.svg';
import menuItems from '@/components/navbar/bottom-navbar/menu-items';
import treeIcon from '/images/misc/tree.png';
import { useLanguage } from '@/context/language-context';
import useCopy from '@/hooks/use-copy';
import LanguageSelector from '@/components/navbar/language-selector';
import useLocalizedPath from '@/hooks/use-localized-path';

const copy = {
  de: {
    hamburgerLabel: 'Menü öffnen',
    closeLabel: 'Menü schließen',
    plantTree: 'Baum pflanzen',
  },
  en: {
    hamburgerLabel: 'Open menu',
    closeLabel: 'Close menu',
    plantTree: 'Plant a Tree',
  },
};

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();
  const text = useCopy(copy);
  const { buildPath } = useLocalizedPath();

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
          aria-label={text.hamburgerLabel}
        >
          <img src={hamburgerIcon} alt='Hamburger Icon' />
        </button>
        {/* Plant a Tree Button */}
        <Link to={buildPath('trees')}>
          <Button size='sm' variant='primary' className='bg-primary-light'>
            <img src={treeIcon} alt='Tree Icon' className='mr-2 h-5 w-5' />
            <span>{text.plantTree}</span>
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
        <div className='absolute right-10 top-10'>
          <button
            onClick={() => setIsMenuOpen(false)}
            className='h-[25px] w-[25px]'
            aria-label={text.closeLabel}
          >
            <img src={closeIcon} alt='Close Menu' />
          </button>
        </div>

        {/* Menu Links */}
        <div className='mt-[100px] flex flex-col items-center gap-5'>
          <LanguageSelector compact />
          {menuItems.map(item => (
            <Link
              key={item.key}
              to={buildPath(item.key)}
              onClick={handleLinkClick}
              aria-label={item.ariaLabel[language]}
              className='text-stone border-primary-light py-4 text-xl'
            >
              {item.labels[language]}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

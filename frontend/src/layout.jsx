import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';
import { HelmetProvider } from 'react-helmet-async';
import DesktopNavbar from '@/components/navbar/desktop';
import MobileNavbar from '@/components/navbar/mobile';
import Footer from '@/components/footer';
import ScrollToTop from '@/components/scroll-to-top';

export default function Layout() {
  const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth < 768);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [isTopNavDropdownOpen, setTopNavDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* Handle Fix Navbar */
  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarFixed(window.scrollY >= 80);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsNavbarFixed]);

  const mainClass = classNames({
    'bg-primary-light': true,
    'pt-[60px]': isNavbarFixed,
    'blur-sm transition duration-300': isTopNavDropdownOpen,
  });

  return (
    <HelmetProvider>
      <div className='text-accent'>
        <header>
          {isMobileScreen ? (
            <MobileNavbar
              isNavbarFixed={isNavbarFixed}
              isTopNavDropdownOpen={isTopNavDropdownOpen}
              setTopNavDropdownOpen={setTopNavDropdownOpen}
            />
          ) : (
            <DesktopNavbar
              isNavbarFixed={isNavbarFixed}
              isTopNavDropdownOpen={isTopNavDropdownOpen}
              setTopNavDropdownOpen={setTopNavDropdownOpen}
            />
          )}
        </header>
        <main className={mainClass}>
          <Outlet />
        </main>
        <ScrollToTop />
        <Footer />
      </div>
    </HelmetProvider>
  );
}

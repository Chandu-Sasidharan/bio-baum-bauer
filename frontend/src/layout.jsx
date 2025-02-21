import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import classNames from 'classnames';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ScrollToTopButton from '@/components/scroll-to-top';
import AutoScrollToTop from '@/components/auto-scroll';

export default function Layout() {
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [isTopNavDropdownOpen, setTopNavDropdownOpen] = useState(false);

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

  const mainClasses = classNames({
    'bg-primary-light': true,
    'pt-[60px]': isNavbarFixed,
    'blur-sm transition duration-300': isTopNavDropdownOpen,
    'pointer-events-none': isTopNavDropdownOpen,
  });

  const footerClasses = classNames({
    'blur-sm transition duration-300': isTopNavDropdownOpen,
    'pointer-events-none': isTopNavDropdownOpen,
  });

  return (
    <div className='text-accent'>
      <HelmetProvider>
        <header>
          <Navbar
            isNavbarFixed={isNavbarFixed}
            isTopNavDropdownOpen={isTopNavDropdownOpen}
            setTopNavDropdownOpen={setTopNavDropdownOpen}
          />
        </header>
        <main className={mainClasses}>
          <Outlet />
        </main>
        <footer className={footerClasses}>
          <Footer />
        </footer>
        <ScrollToTopButton />
        <AutoScrollToTop />
      </HelmetProvider>
    </div>
  );
}

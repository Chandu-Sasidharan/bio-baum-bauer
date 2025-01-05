import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import DesktopNavbar from '@/components/navbar/desktop';
import MobileNavbar from '@/components/navbar/mobile';
import Footer from '@/components/footer';
import ScrollToTop from '@/components/scroll-to-top';

export default function Layout() {
  const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth < 768);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mainStyle = {
    paddingTop: isNavbarFixed ? '60px' : '0',
  };

  return (
    <HelmetProvider>
      <div className='text-accent'>
        <header>
          {isMobileScreen ? (
            <MobileNavbar />
          ) : (
            <DesktopNavbar
              isNavbarFixed={isNavbarFixed}
              setIsNavbarFixed={setIsNavbarFixed}
            />
          )}
        </header>
        <main className='bg-primary-light' style={mainStyle}>
          <Outlet />
        </main>
        <ScrollToTop />
        <Footer />
      </div>
    </HelmetProvider>
  );
}

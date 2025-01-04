import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AuthNavbar from '@/components/navbar/auth';
import { FcFaq } from 'react-icons/fc';
import { MdContacts } from 'react-icons/md';
import {
  FaHome,
  FaTree,
  FaRegNewspaper,
  FaInfoCircle,
  FaImages,
} from 'react-icons/fa';

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
        className='desktop-nav-z-index-v-10 text-accent bg-primary top-0 flex h-[60px] w-full items-center justify-center'
        style={desktopNavbarStyle}
      >
        {/* DesktopNavbar Links */}
        <div className='bg-primary flex h-full w-full items-center justify-center'>
          <div className='duration-400 hover:text-gray-dark flex items-center border-r p-2 transition-transform ease-linear hover:scale-110 sm:px-4 lg:px-8 xl:px-14'>
            <NavLink
              className='flex items-center justify-center gap-1 hover:border-b-2'
              style={({ isActive }) =>
                isActive
                  ? {
                      borderBottom: '2px solid #5a6448',
                      color: '#5a6448',
                      scale: '1.1',
                    }
                  : undefined
              }
              aria-label='Link to Home Page '
              to='/'
            >
              <FaHome color='#5a6448' />
              <span>Home</span>
            </NavLink>
          </div>
          <div className='duration-400 hover:text-gray-darkitems-center flex border-r px-2 transition-transform ease-linear hover:scale-110 sm:px-4 lg:px-8 xl:px-14'>
            <NavLink
              className='flex items-center justify-center gap-1 hover:border-b-2'
              to='/trees'
              style={({ isActive }) =>
                isActive
                  ? {
                      borderBottom: '2px solid #5a6448',
                      color: '#5a6448',
                      scale: '1.1',
                    }
                  : undefined
              }
              aria-label='Link to Sponsor page'
            >
              <FaTree color='#5a6448' />
              <span>Trees</span>
            </NavLink>
          </div>
          <div className='duration-400 hover:text-gray-dark flex items-center border-r px-2 transition-transform ease-linear hover:scale-110 sm:px-4 lg:px-8 xl:px-14'>
            <NavLink
              className='flex items-center justify-center gap-1 hover:border-b-2'
              to='/news'
              style={({ isActive }) =>
                isActive
                  ? {
                      borderBottom: '2px solid #5a6448',
                      color: '#5a6448',
                      scale: '1.1',
                    }
                  : undefined
              }
              aria-label='News page'
            >
              <FaRegNewspaper color='#5a6448' />
              <span>News</span>
            </NavLink>
          </div>
          <div className='duration-400 hover:text-gray-dark flex items-center border-r px-2 transition-transform ease-linear hover:scale-110 sm:px-4 lg:px-8 xl:px-14'>
            <NavLink
              className='flex items-center justify-center gap-1 hover:border-b-2'
              to='/about'
              style={({ isActive }) =>
                isActive
                  ? {
                      borderBottom: '2px solid #5a6448',
                      color: '#5a6448',
                      scale: '1.1',
                    }
                  : undefined
              }
              aria-label='About page'
            >
              <FaInfoCircle color='#5a6448' />
              <span>About</span>
            </NavLink>
          </div>
          <div className='duration-400 hover:text-gray-dark flex items-center border-r px-2 transition-transform ease-linear hover:scale-110 sm:px-4 lg:px-8 xl:px-14'>
            <NavLink
              className='flex items-center justify-center gap-1 hover:border-b-2'
              to='/gallery'
              style={({ isActive }) =>
                isActive
                  ? {
                      borderBottom: '2px solid #5a6448',
                      color: '#5a6448',
                      scale: '1.1',
                    }
                  : undefined
              }
              aria-label='Gallery page'
            >
              <FaImages className='text-accent' />
              <span>Gallery</span>
            </NavLink>
          </div>
          <div className='duration-400 hover:text-gray-dark flex items-center border-r px-2 transition-transform ease-linear hover:scale-110 sm:px-4 lg:px-8 xl:px-14'>
            <NavLink
              className='flex items-center justify-center gap-1 hover:border-b-2'
              to='/faq'
              style={({ isActive }) =>
                isActive
                  ? {
                      borderBottom: '2px solid #5a6448',
                      color: '#5a6448',
                      scale: '1.1',
                    }
                  : undefined
              }
              aria-label='FAQ page'
            >
              <FcFaq color='#5a6448' />
              <span>FAQs</span>
            </NavLink>
          </div>
          <div className='duration-400 hover:text-gray-dark flex items-center px-2 transition-transform ease-linear hover:scale-110 sm:px-4 lg:px-8 xl:px-14'>
            <NavLink
              className='flex items-center justify-center gap-1 hover:border-b-2'
              to='/contact'
              style={({ isActive }) =>
                isActive
                  ? {
                      borderBottom: '2px solid #5a6448',
                      color: '#5a6448',
                      scale: '1.1',
                    }
                  : undefined
              }
              aria-label='Contact page'
            >
              <MdContacts color='#5a6448' />
              <span>Contact</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

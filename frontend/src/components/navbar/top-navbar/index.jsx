import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { IoIosArrowDown, IoIosArrowUp, IoMdLogOut } from 'react-icons/io';
import Button from '@/components/ui/button';
import { useUser } from '@/context/auth-context';
import logoImage from '/images/logo/bbb-logo.svg';
import treeIcon from '/images/misc/tree.png';
import { useCart } from '@/context/cart-context';
import LanguageSelector from '@/components/navbar/language-selector';
import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    plantTree: 'Baum pflanzen',
    login: 'Anmelden',
    more: 'Mehr',
    account: 'Mein Konto',
    logout: 'Abmelden',
    cartAria: 'Warenkorb öffnen',
  },
  en: {
    plantTree: 'Plant a Tree',
    login: 'Login',
    more: 'More',
    account: 'My Account',
    logout: 'Logout',
    cartAria: 'Open cart',
  },
};

export default function TopNavBar({
  isNavbarFixed,
  isTopNavDropdownOpen,
  setTopNavDropdownOpen,
}) {
  const { isAuthenticated, authUser, handleLogout } = useUser();
  const { getTotalTreeCount } = useCart();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const totalTreeCount = getTotalTreeCount();
  const text = useCopy(copy);

  useEffect(() => {
    if (isNavbarFixed) {
      setTopNavDropdownOpen(false);
    }
  }, [isNavbarFixed]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setTopNavDropdownOpen(false);
      }
    };

    if (isTopNavDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTopNavDropdownOpen]);

  const toggleDropdown = () => {
    setTopNavDropdownOpen(!isTopNavDropdownOpen);
  };

  const handleClick = type => {
    setTopNavDropdownOpen(false);

    if (type === 'account') {
      navigate('/account');
    } else if (type === 'logout') {
      handleLogout();
    }
  };

  return (
    <nav className='bg-accent relative z-[1] flex h-20 w-full items-center justify-between px-5 shadow-md md:px-8'>
      <div className='flex h-full w-full grow items-center justify-between'>
        {/* Left Side */}
        <Link to='/' className='flex items-center gap-3'>
          <img
            src={logoImage}
            className='h-16 w-16 rounded-full shadow-lg'
            alt='Bio Baum Bauer logo'
          />

          <p className='font-chicle text-primary-light hidden text-2xl tracking-wider md:block'>
            Bio Baum Bauer
          </p>
        </Link>

        {/* Right Side */}
        <div className='flex items-center gap-3'>
          <LanguageSelector />
          <Link to='/trees' className='hidden items-center gap-3 md:flex'>
            <Button>
              <img src={treeIcon} alt='Tree Icon' className='mr-2 h-5 w-5' />
              <span>{text.plantTree}</span>
            </Button>
          </Link>
          {!isAuthenticated && (
            <Link to='/login'>
              <Button>
                <span>{text.login}</span>
              </Button>
            </Link>
          )}

          {isAuthenticated && (
            <div className='relative flex items-center gap-3 md:gap-6'>
              {/* Profile Dropdown */}
              <div ref={dropdownRef}>
                {/* Dropdown Button */}
                <div
                  onClick={toggleDropdown}
                  className='flex cursor-pointer items-center justify-between'
                >
                  {authUser.firstName ? (
                    <div>
                      <span className='font-open-sans text-primary-light mr-1 inline-block text-lg'>
                        {authUser.firstName}
                      </span>
                    </div>
                  ) : (
                    <span className='font-open-sans text-primary-light mr-2 inline-block text-lg'>
                      {text.more}
                    </span>
                  )}
                  {isTopNavDropdownOpen ? (
                    <IoIosArrowUp className='text-primary-light text-xl' />
                  ) : (
                    <IoIosArrowDown className='text-primary-light text-xl' />
                  )}
                </div>

                {/* Dropdown Menu */}
                <ul
                  className={`${
                    isTopNavDropdownOpen ? 'block' : 'hidden'
                  } bg-primary-light text-stone absolute right-0 top-[60px] overflow-hidden rounded-b-md shadow-md transition-all duration-300`}
                >
                  <li
                    className='hover:bg-aloe border-primary cursor-pointer border-b text-lg'
                    onClick={() => handleClick('account')}
                  >
                    <span className='flex items-center gap-3 px-5 py-4 transition-transform duration-75 ease-linear'>
                      <CgProfile className='text-accent text-xl' />
                      <span className='text-nowrap'>{text.account}</span>
                    </span>
                  </li>
                  <li
                    className='hover:bg-aloe border-primary cursor-pointer text-lg'
                    onClick={() => handleClick('logout')}
                  >
                    <span className='flex items-center justify-start gap-3 px-5 py-4 transition-transform duration-75 ease-linear'>
                      <IoMdLogOut className='text-accent text-xl' />
                      <span>{text.logout}</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Shopping Cart */}
          <Link to='/cart' aria-label={text.cartAria}>
            <span className='bg-primary-light text-accent relative flex h-[40px] w-[40px] items-center justify-center rounded-full text-xl'>
              <PiShoppingCartSimpleFill />
              {!!totalTreeCount && (
                <span
                  className='bg-golden-red absolute rounded-full px-[7px] py-[2px] text-xs text-white'
                  style={{ transform: 'translate(90%, -90%)' }}
                >
                  {totalTreeCount}
                </span>
              )}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

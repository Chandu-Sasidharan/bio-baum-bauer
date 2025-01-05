import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { FaCartArrowDown } from 'react-icons/fa6';
import { IoIosArrowDown, IoIosArrowUp, IoMdLogOut } from 'react-icons/io';
import { CartContext } from '@/store/cart-context';
import { useUser } from '@/store/auth-context';
import logoImage from '/images/logo/bbb-logo.svg';

export default function AuthNavbar() {
  const { loggedIn, authUser } = useUser();
  const { cartTrees } = useContext(CartContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className='auth-nav-z-index-v-12 bg-accent relative flex h-20 w-full items-center justify-between px-5 shadow-md md:px-8'>
      <div className='flex grow justify-between'>
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
        <div className='flex items-center'>
          {!loggedIn && (
            <Link
              to='/login'
              aria-label='login page'
              className='hover:bg-primary hover:text-accent text-primary-light font-chicle border-primary-dark rounded-md border-[1px] px-3 py-2 text-2xl tracking-wider duration-300'
            >
              Login
            </Link>
          )}

          {loggedIn && (
            <div className='flex items-center gap-3'>
              <div className='dropdown h-auto'>
                <div
                  id='dropdown-button'
                  onClick={toggleDropdown}
                  className='border-primary text-accent right-40 top-10 flex h-auto w-full cursor-pointer select-none items-center justify-between rounded-[10px] px-2 py-4 text-lg'
                >
                  <Link aria-label='user dashboard, link to dashboard'>
                    <span className='font-open-sans text-lg text-white'>
                      Hi, &nbsp;
                    </span>
                    <span className='font-open-sans text-lg text-white'>
                      {authUser.lastName}&nbsp;
                    </span>
                  </Link>

                  {isDropdownOpen ? (
                    <IoIosArrowUp className='text-xl text-white' />
                  ) : (
                    <IoIosArrowDown className='text-xl text-white' />
                  )}
                </div>
                <div
                  id='dropdown-menu'
                  className={`${
                    isDropdownOpen ? 'block' : 'hidden'
                  } bg-primary-light border-primary text-stone absolute right-20 top-[71px] mt-2 h-auto w-auto rounded-[6px] border-2 shadow-2xl transition-all duration-300 md:right-24 lg:right-64`}
                >
                  <div className='hover:bg-aloe border-primary cursor-pointer rounded-t-[2px] border-b text-lg'>
                    <Link
                      to='/dashboard'
                      className='navIcon flex h-full w-full items-center px-6 py-4 transition-transform duration-75 ease-linear'
                      aria-label='dashboard page'
                    >
                      <div className='flex items-center gap-3'>
                        <CgProfile className='ani text-accent text-xl' />
                        <span>Profile</span>
                      </div>
                    </Link>
                  </div>
                  <div className='hover:bg-aloe border-primary cursor-pointer border-b text-lg'>
                    <Link
                      to='/signout'
                      className='navIcon flex h-full w-full items-center px-6 py-4 transition-transform duration-75 ease-linear'
                      aria-label='Sign Out page'
                    >
                      <div className='flex items-center transition-transform duration-75 ease-linear'>
                        <div className='flex items-center justify-start gap-3'>
                          <IoMdLogOut className='ani text-accent text-xl' />
                          <span>Logout</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <Link
                to='/cart'
                className='navIcon transition-transform duration-75 ease-linear'
                aria-label='Cart page'
              >
                <div className='relative flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white'>
                  <FaCartArrowDown size='1.9rem' />
                  {cartTrees.length > 0 ? (
                    <div
                      className='absolute right-[0.2rem] top-[0.2rem] flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white'
                      style={{ transform: 'translate(50%, -50%)' }}
                    >
                      {cartTrees.length}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

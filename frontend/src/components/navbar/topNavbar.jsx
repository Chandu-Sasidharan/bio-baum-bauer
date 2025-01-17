import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { IoIosArrowDown, IoIosArrowUp, IoMdLogOut } from 'react-icons/io';
import { CartContext } from '@/store/cart-context';
import { useUser } from '@/store/auth-context';
import logoImage from '/images/logo/bbb-logo.svg';

export default function TopNavBar() {
  const { loggedIn, authUser, handleLogout } = useUser();
  const { cartTrees } = useContext(CartContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {
    handleLogout();
    setDropdownOpen(false);
  };

  console.log('debug', isDropdownOpen);
  return (
    <nav className='auth-nav-z-index-v-12 bg-accent relative flex h-20 w-full items-center justify-between px-5 shadow-md md:px-8'>
      <div className='flex h-full grow justify-between'>
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
        </div>

        {loggedIn && (
          <div className='relative flex items-center gap-3 md:gap-6'>
            {/* Profile Dropdown */}
            <div>
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
                    Account
                  </span>
                )}

                {isDropdownOpen ? (
                  <IoIosArrowUp className='text-primary-light text-xl' />
                ) : (
                  <IoIosArrowDown className='text-primary-light text-xl' />
                )}
              </div>

              {/* Dropdown Menu */}
              <div
                className={`${
                  isDropdownOpen ? 'block' : 'hidden'
                } bg-primary-light text-stone absolute top-full overflow-hidden rounded-b-md shadow-md transition-all duration-300`}
              >
                <div className='hover:bg-aloe border-primary cursor-pointer border-b text-lg'>
                  <Link
                    to='/dashboard'
                    className='flex items-center px-5 py-4 transition-transform duration-75 ease-linear'
                    aria-label='dashboard page'
                  >
                    <div className='flex items-center gap-3'>
                      <CgProfile className='text-accent text-xl' />
                      <span className='text-nowrap'>My Profile</span>
                    </div>
                  </Link>
                </div>
                <div className='hover:bg-aloe border-primary cursor-pointer text-lg'>
                  <div className='flex items-center px-5 py-4 transition-transform duration-75 ease-linear'>
                    <div
                      className='flex items-center justify-start gap-3'
                      onClick={logout}
                    >
                      <IoMdLogOut className='text-accent text-xl' />
                      <span>Logout</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shopping Cart */}
            <Link to='/cart' aria-label='Cart page'>
              <span className='bg-primary-light text-accent relative flex h-[45px] w-[45px] items-center justify-center rounded-full text-2xl'>
                <PiShoppingCartSimpleFill />
                {!!cartTrees.length && (
                  <div
                    className='text-primary-light absolute right-[0.2rem] top-[0.2rem] flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs'
                    style={{ transform: 'translate(50%, -50%)' }}
                  >
                    {cartTrees.length}
                  </div>
                )}
              </span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaGear } from 'react-icons/fa6';

const MobileDashboardLinks = () => {
  const [activeLink, setActiveLink] = useState('/dashboard');
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  const handleToggleMobile = () => {
    setIsMobile(!isMobile);
  };

  const closeDropdown = () => {
    setIsMobile(false);
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <div className='relative flex p-4 md:hidden'>
      <button
        onClick={handleToggleMobile}
        className='absolute left-0 top-[-5px] z-20 flex h-8 w-8 items-center justify-center rounded-lg'
      >
        <FaGear
          className={
            isMobile ? `text-accent text-[3rem]` : `text-sage text-[1.8rem]`
          }
        />
      </button>

      {/* Mobile dropdown menu */}
      {isMobile && (
        <>
          <div className='xs:left-0 border-primary absolute left-0 top-[40px] z-[1] w-[50%] rounded-md border bg-white'>
            <div className='flex w-full flex-col'>
              <NavLink
                aria-label='Dashboard'
                to='/dashboard'
                activeClassName='bg-aloe'
                className={`text-stone border-primary hover:bg-gray-light block rounded-t-md border-b py-4 pl-4 text-start ${
                  activeLink === '/dashboard'
                    ? 'border-l-sage bg-aloe border-l-4'
                    : ''
                }`}
              >
                Dashboard
              </NavLink>
              <NavLink
                aria-label='Update Profile'
                to='/update_profile'
                activeClassName='bg-primary'
                className={`text-stone border-primary hover:bg-gray-light block border-b py-4 pl-4 text-start ${
                  activeLink === '/update_profile'
                    ? 'border-l-sage bg-aloe border-l-4'
                    : ''
                }`}
              >
                Profile
              </NavLink>
              <NavLink
                aria-label='Sponsorships'
                to='/user_sponsorships'
                activeClassName='bg-primary'
                className={`text-stone border-primary hover:bg-gray-light block border-b py-4 pl-4 text-start ${
                  activeLink === '/user_sponsorships'
                    ? 'border-l-sage bg-aloe border-l-4'
                    : ''
                }`}
              >
                Sponsorships
              </NavLink>
              <NavLink
                aria-label='Change Password'
                to='/password_change'
                activeClassName='bg-primary'
                className={`text-stone border-primary hover:bg-gray-light block border-b py-4 pl-4 text-start ${
                  activeLink === '/password_change'
                    ? 'border-l-sage bg-aloe border-l-4'
                    : ''
                }`}
              >
                Change Password
              </NavLink>
              <NavLink
                aria-label='Sign Out'
                to='/signout'
                activeClassName='bg-primary'
                className={`text-stone hover:bg-gray-light rounded-b-md py-4 pl-4 text-start ${
                  activeLink === '/signout'
                    ? 'border-l-sage bg-aloe border-l-4'
                    : ''
                }`}
              >
                Sign Out
              </NavLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileDashboardLinks;

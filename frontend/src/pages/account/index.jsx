import { MdDashboardCustomize } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Outlet } from 'react-router-dom';
import { ImProfile } from 'react-icons/im';
import { GoSponsorTiers } from 'react-icons/go';
import Breadcrumbs from '@/components/elements/breadcrumbs';

export default function AccountLayout() {
  const [activeLink, setActiveLink] = useState('/dashboard');
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <div
      className='mx-auto flex max-w-7xl gap-4 p-5 py-10'
      style={{ minHeight: 'calc(100vh - 140px' }}
    >
      {/* Sidebar */}
      <div className='space-y-5'>
        <div className='flex gap-2'>
          <MdDashboardCustomize size='1.9rem' />
          <h3 className='font-chicle text-3xl'>Manage your account</h3>
        </div>
        <div className='hidden w-[270px] flex-col overflow-hidden rounded-md border md:flex'>
          <NavLink
            aria-label='My Account'
            to='/account'
            activeClassName='bg-primary'
            className={`border-primary hover:bg-gray-light flex items-center gap-1 border-b py-4 pl-4 ${
              activeLink === '/account'
                ? 'border-l-sage bg-aloe border-l-4'
                : ''
            }`}
          >
            <ImProfile />
            <span>My Profile</span>
          </NavLink>
          <NavLink
            aria-label='My Sponsorships'
            to='sponsorships'
            activeClassName='bg-primary'
            className={`border-primary hover:bg-gray-light flex items-center gap-1 border-b py-4 pl-4 ${
              activeLink === '/account/sponsorships'
                ? 'border-l-sage bg-aloe border-l-4'
                : ''
            }`}
          >
            <GoSponsorTiers />
            <span>My Sponsorships</span>
          </NavLink>
        </div>
      </div>

      {/* Main content */}
      <main>
        <div className='z-[1] w-full'>
          <Breadcrumbs />
        </div>
        <Outlet />
      </main>
    </div>
  );
}

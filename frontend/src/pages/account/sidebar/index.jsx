import { NavLink } from 'react-router-dom';
import { MdDashboardCustomize } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';
import { GoSponsorTiers } from 'react-icons/go';

export default function Sidebar() {
  return (
    <div className='space-y-5'>
      <div className='flex gap-2'>
        <MdDashboardCustomize size='1.9rem' />
        <h3 className='font-chicle text-3xl'>Manage your account</h3>
      </div>
      <div className='hidden w-[270px] flex-col overflow-hidden rounded-md border md:flex'>
        <NavLink
          aria-label='My Account'
          to='/account'
          className={({ isActive }) =>
            `border-primary hover:bg-gray-light flex items-center gap-1 border-b py-4 pl-4 ${
              isActive ? 'border-l-sage bg-aloe border-l-4' : ''
            }`
          }
        >
          <ImProfile />
          <span>My Profile</span>
        </NavLink>
        <NavLink
          aria-label='My Sponsorships'
          to='/account/sponsorships'
          className={({ isActive }) =>
            `border-primary hover:bg-gray-light flex items-center gap-1 py-4 pl-4 ${
              isActive ? 'border-l-sage bg-aloe border-l-4' : ''
            }`
          }
        >
          <GoSponsorTiers />
          <span>My Sponsorships</span>
        </NavLink>
      </div>
    </div>
  );
}

import { MdDashboardCustomize } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';
import { GoSponsorTiers } from 'react-icons/go';
import SidebarLink from '@/pages/account/sidebar/sidebar-link';

export default function Sidebar() {
  return (
    <div className='space-y-5'>
      <div className='flex gap-2'>
        <MdDashboardCustomize size='1.9rem' />
        <h3 className='font-chicle text-3xl'>Manage your account</h3>
      </div>
      <div className='hidden w-[270px] flex-col overflow-hidden rounded-md border md:flex'>
        <SidebarLink to='/account' ariaLabel='My Account' icon={ImProfile} end>
          My Profile
        </SidebarLink>
        <SidebarLink
          to='/account/sponsorships'
          ariaLabel='My Sponsorships'
          icon={GoSponsorTiers}
        >
          My Sponsorships
        </SidebarLink>
      </div>
    </div>
  );
}

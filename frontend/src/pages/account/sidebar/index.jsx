import { MdDashboardCustomize } from 'react-icons/md';
import { ImProfile } from 'react-icons/im';
import { GoSponsorTiers } from 'react-icons/go';
import SidebarLink from '@/pages/account/sidebar/sidebar-link';
import useCopy from '@/hooks/use-copy';
import useLocalizedPath from '@/hooks/use-localized-path';

const copy = {
  de: {
    heading: 'Mein Bereich',
    profile: 'Mein Profil',
    sponsorships: 'Meine Patenschaften',
  },
  en: {
    heading: 'Manage your account',
    profile: 'My Profile',
    sponsorships: 'My Sponsorships',
  },
};

export default function Sidebar() {
  const text = useCopy(copy);
  const { buildPath } = useLocalizedPath();

  return (
    <div className='space-y-5'>
      <div className='flex gap-2'>
        <MdDashboardCustomize size='1.9rem' />
        <h3 className='font-chicle text-3xl'>{text.heading}</h3>
      </div>
      <div className='hidden w-[270px] flex-col overflow-hidden rounded-md border md:flex'>
        <SidebarLink
          to={buildPath('account')}
          ariaLabel={text.profile}
          icon={ImProfile}
          end
        >
          {text.profile}
        </SidebarLink>
        <SidebarLink
          to={buildPath('account', 'sponsorships')}
          ariaLabel={text.sponsorships}
          icon={GoSponsorTiers}
        >
          {text.sponsorships}
        </SidebarLink>
      </div>
    </div>
  );
}

import { Fragment } from 'react';
import DesktopMenuLink from '@/components/navbar/bottom-navbar/desktop-menu-link';
import Divider from '@/components/navbar/bottom-navbar/desktop-menu-divider';
import menuItems from '@/components/navbar/bottom-navbar/menu-items';

export default function DesktopMenu() {
  return (
    <nav className='hidden gap-4 md:flex lg:gap-9 xl:gap-12 2xl:gap-16'>
      {menuItems.map((item, index) => (
        <Fragment key={item.to}>
          <DesktopMenuLink
            to={item.to}
            pageName={item.pageName}
            icon={item.icon}
          />
          {index < menuItems.length - 1 && <Divider />}
        </Fragment>
      ))}
    </nav>
  );
}

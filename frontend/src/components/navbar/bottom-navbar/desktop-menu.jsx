import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import VerticalDivider from '@/components/navbar/bottom-navbar/vertical-divider';
import menuItems from '@/components/navbar/bottom-navbar/menu-items';

export default function DesktopMenu() {
  return (
    <nav className='hidden gap-4 md:flex lg:gap-9 xl:gap-12 2xl:gap-16'>
      {menuItems.map((item, index) => (
        <Fragment key={item.to}>
          <NavLink
            className={({ isActive }) =>
              `text-accent hover:text-golden-red hover:border-golden-red flex items-center justify-center gap-1 border-b-2 p-1 duration-300 ${
                isActive ? 'border-accent' : 'border-primary'
              }`
            }
            aria-label={`${item.pageName} page`}
            to={item.to}
          >
            {item.icon}
            <span>{item.pageName}</span>
          </NavLink>
          {index < menuItems.length - 1 && <VerticalDivider />}
        </Fragment>
      ))}
    </nav>
  );
}

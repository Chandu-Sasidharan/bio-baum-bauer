import { Fragment } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import VerticalDivider from '@/components/navbar/bottom-navbar/vertical-divider';
import menuItems from '@/components/navbar/bottom-navbar/menu-items';
import { useLanguage } from '@/context/lang-context';
import useLocalizedPath from '@/hooks/use-localized-path';

export default function DesktopMenu() {
  const { language } = useLanguage();
  const { buildPath } = useLocalizedPath();

  return (
    <nav className='hidden gap-4 md:flex lg:gap-9 xl:gap-12 2xl:gap-16'>
      {menuItems.map((item, index) => (
        <Fragment key={item.key}>
          <NavLink
            className={({ isActive }) =>
              `text-accent hover:text-golden-red hover:border-golden-red flex items-center justify-center gap-1 border-b-2 p-1 duration-300 ${
                isActive ? 'border-accent' : 'border-primary'
              }`
            }
            aria-label={item.ariaLabel[language]}
            to={buildPath(item.key)}
          >
            {item.icon}
            <span>{item.labels[language]}</span>
          </NavLink>
          {index < menuItems.length - 1 && <VerticalDivider />}
        </Fragment>
      ))}
    </nav>
  );
}

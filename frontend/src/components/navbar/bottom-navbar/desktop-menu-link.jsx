import { NavLink } from 'react-router-dom';

export default function DesktopMenuLink({ to = '/', pageName, icon }) {
  return (
    <NavLink
      className={({ isActive }) =>
        `text-accent hover:text-golden-red hover:border-golden-red flex items-center justify-center gap-1 border-b-2 p-1 duration-300 ${
          isActive ? 'border-accent' : 'border-primary'
        }`
      }
      aria-label={`${pageName} page`}
      to={to}
    >
      {icon}
      <span>{pageName}</span>
    </NavLink>
  );
}

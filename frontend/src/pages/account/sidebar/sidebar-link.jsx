import { NavLink } from 'react-router-dom';

export default function SidebarLink({
  to,
  ariaLabel,
  icon: Icon,
  end,
  children,
}) {
  return (
    <NavLink
      aria-label={ariaLabel}
      to={to}
      end={end}
      className={({ isActive }) =>
        `border-primary hover:bg-gray-light flex items-center gap-1 border-b py-4 pl-4 ${
          isActive ? 'border-l-sage bg-aloe border-l-4' : ''
        }`
      }
    >
      <Icon />
      <span>{children}</span>
    </NavLink>
  );
}

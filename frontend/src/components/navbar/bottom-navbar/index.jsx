import classNames from 'classnames';
import DesktopMenu from '@/components/navbar/bottom-navbar/desktop-menu';
import MobileMenu from '@/components/navbar/bottom-navbar/mobile-menu';

export default function BottomNavBar({ isNavbarFixed, isTopNavDropdownOpen }) {
  const bottomNavbarStyle = classNames({
    'text-accent bg-primary top-0 z-30 flex h-[60px] w-full items-center justify-center': true,
    'blur-sm transition duration-300': isTopNavDropdownOpen,
    'pointer-events-none': isTopNavDropdownOpen,
    static: !isNavbarFixed,
    fixed: isNavbarFixed,
  });

  return (
    <div className={bottomNavbarStyle}>
      <DesktopMenu />
      <MobileMenu />
    </div>
  );
}

import TopNavBar from '@/components/navbar/top-navbar';
import BottomNavBar from '@/components/navbar/bottom-navbar';

export default function Navbar({
  isNavbarFixed,
  isTopNavDropdownOpen,
  setTopNavDropdownOpen,
}) {
  return (
    <>
      <TopNavBar
        isNavbarFixed={isNavbarFixed}
        isTopNavDropdownOpen={isTopNavDropdownOpen}
        setTopNavDropdownOpen={setTopNavDropdownOpen}
      />

      <BottomNavBar
        isNavbarFixed={isNavbarFixed}
        isTopNavDropdownOpen={isTopNavDropdownOpen}
      />
    </>
  );
}

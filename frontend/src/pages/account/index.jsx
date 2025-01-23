import { Outlet } from 'react-router-dom';
import Breadcrumbs from '@/components/elements/breadcrumbs';
import Sidebar from '@/pages/account/sidebar';

export default function AccountLayout() {
  return (
    <div
      className='mx-auto flex max-w-7xl gap-4 p-5 py-10'
      style={{ minHeight: 'calc(100vh - 140px' }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className='flex-1'>
        <Breadcrumbs />

        <Outlet />
      </main>
    </div>
  );
}

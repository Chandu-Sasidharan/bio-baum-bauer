import { Outlet } from 'react-router-dom';
import backgroundImage from '/images/background/leaves-background.webp';
import Breadcrumbs from '@/components/elements/breadcrumbs';
import Sidebar from '@/pages/account/sidebar';

export default function AccountLayout() {
  return (
    <section
      className='bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
        {/* Breadcrumbs */}
        <div className='w-full px-5'>
          <Breadcrumbs />
        </div>

        {/* Content */}
        <div className='mb-5 p-5'>
          <div
            className='mx-auto flex max-w-5xl flex-col items-start gap-10 rounded-md p-5 shadow-sm md:flex-row md:p-8'
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          >
            <Sidebar />

            {/* Account Section */}
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}

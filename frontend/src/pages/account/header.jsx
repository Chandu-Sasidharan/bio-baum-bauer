import { MdDashboardCustomize } from 'react-icons/md';

export default function ProfileHeader({ subtitle }) {
  return (
    <div className='text-accent mx-auto hidden w-full items-center gap-2 rounded-md bg-white py-4 md:flex'>
      <MdDashboardCustomize size='1.9rem' />
      <h3 className='font-chicle text-3xl'>Dashboard</h3>
      <span>-</span>
      <small className='text-gray-dark text-lg font-bold'>{subtitle}</small>
    </div>
  );
}

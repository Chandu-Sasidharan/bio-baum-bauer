import { Link } from 'react-router-dom';
import { FaArrowRightLong } from 'react-icons/fa6';
import Button from '@/components/ui/button';

export default function InfoItem({ title, description, link }) {
  return (
    <div
      className='flex w-full max-w-[400px] flex-col gap-4 rounded-lg px-5 py-8 md:w-1/3 md:px-8 md:py-10'
      style={{ backgroundColor: 'rgba(36, 49, 35, 0.6)' }}
    >
      <h2 className='text-primary-light text-3xl tracking-wider md:text-4xl'>
        {title}
      </h2>
      <p className='text-primary-light text-lg'>{description}</p>
      <Link to={link} className='self-end'>
        <Button rounded={true} transparent={true}>
          <span className='flex items-center gap-2'>
            <span className='text-nowrap'>Read More</span>
            <FaArrowRightLong className='transition-transform duration-300' />
          </span>
        </Button>
      </Link>
    </div>
  );
}

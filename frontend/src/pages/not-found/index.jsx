import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { RiArrowGoBackFill } from 'react-icons/ri';
import Button from '@/components/elements/button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Page Not Found | Bio Baum Bauer</title>
      </Helmet>

      <div className='bg-gray-light text-stone flex flex-col items-center gap-10 md:py-40 lg:py-36'>
        <h2 className='sm:text-7xl md:text-8xl lg:text-9xl'>404</h2>
        <p className='text-xl'>The page you were looking for does not exist!</p>
        <Button
          size='lg'
          className='flex items-center'
          onClick={() => navigate(-1)}
        >
          <RiArrowGoBackFill className='mr-2 h-4 w-4' /> Go Back
        </Button>
      </div>
    </>
  );
}

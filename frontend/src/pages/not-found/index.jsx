import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { RiArrowGoBackFill } from 'react-icons/ri';
import Button from '@/components/ui/button';
import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    metaTitle: 'Seite nicht gefunden | Bio Baum Bauer',
    message: 'Die gesuchte Seite existiert nicht.',
    back: 'Zurück',
  },
  en: {
    metaTitle: 'Page Not Found | Bio Baum Bauer',
    message: 'The page you were looking for does not exist!',
    back: 'Go Back',
  },
};

export default function NotFound() {
  const navigate = useNavigate();
  const text = useCopy(copy);

  return (
    <>
      <Helmet>
        <title>{text.metaTitle}</title>
      </Helmet>

      <div className='bg-gray-light text-stone flex flex-col items-center gap-10 md:py-40 lg:py-36'>
        <h2 className='sm:text-7xl md:text-8xl lg:text-9xl'>404</h2>
        <p className='text-xl'>{text.message}</p>
        <Button className='flex items-center' onClick={() => navigate(-1)}>
          <RiArrowGoBackFill className='mr-2 h-4 w-4' /> {text.back}
        </Button>
      </div>
    </>
  );
}

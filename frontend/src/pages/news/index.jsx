import { Helmet } from 'react-helmet-async';
import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    metaTitle: 'News | Bio Baum Bauer',
    heading: 'News',
  },
  en: {
    metaTitle: 'News | Bio Baum Bauer',
    heading: 'News',
  },
};

export default function News() {
  const text = useCopy(copy);

  return (
    <>
      <Helmet>
        <title>{text.metaTitle}</title>
      </Helmet>
      <div className='flex h-screen items-center justify-center text-xl font-bold'>
        {text.heading}
      </div>
    </>
  );
}

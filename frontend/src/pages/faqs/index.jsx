import { Helmet } from 'react-helmet-async';
import Accordion from './accordion';
import backgroundImage from '/images/background/leaves-background.webp';
import useFaqs from '@/hooks/use-faqs';

export default function Faqs() {
  const { faqs, isLoading, isError } = useFaqs();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading FAQs</div>;
  }

  return (
    <>
      <Helmet>
        <title>About Us | Bio Baum Bauer</title>
      </Helmet>

      {/* Container */}
      <section
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className='bg-cover bg-center bg-no-repeat'
      >
        {/* Semi-transparent background */}
        <div
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
          className='p-5 md:py-12'
        >
          <div
            className='mx-auto flex w-full max-w-7xl flex-col gap-2 rounded-md p-10 shadow-sm'
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          >
            <h1 className='text-accent font-chicle mb-3 text-3xl tracking-wide md:text-4xl'>
              Frequently Asked Questions
            </h1>

            {/* Accordion */}
            <Accordion data={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}

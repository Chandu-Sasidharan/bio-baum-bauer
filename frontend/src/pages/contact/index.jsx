import { Helmet } from 'react-helmet-async';
import backgroundImage from '/images/background/leaves-background.webp';
import Breadcrumbs from '@/components/elements/breadcrumbs';
import Map from '@/pages/contact/map';
import Form from '@/pages/contact/form';
import Details from '@/pages/contact/details';

export default function ContactUs() {
  return (
    <>
      <Helmet>
        <title>Contact Us | Bio Baum Bauer</title>
      </Helmet>

      {/* Container */}
      <section
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className='bg-cover bg-center bg-no-repeat'
      >
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          {/* Breadcrumbs */}
          <div className='w-full px-5'>
            <Breadcrumbs />
          </div>

          {/* Content */}
          <div className='my-5 p-5'>
            <div
              className='mx-auto flex max-w-5xl flex-col items-center gap-10 rounded-md p-10 shadow-sm md:flex-row md:p-16'
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
            >
              <Details />
              <Form />
            </div>
          </div>

          {/* Google Map */}
          <div className='z-[1] w-full'>
            <Map />
          </div>
        </div>
      </section>
    </>
  );
}

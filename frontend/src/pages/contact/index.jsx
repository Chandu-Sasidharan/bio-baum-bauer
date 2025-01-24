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

      <div className='relative flex flex-col items-center'>
        {/* Overlay with background image and opacity */}
        <div
          className='absolute left-0 top-0 z-[0] h-full w-full bg-cover bg-top bg-no-repeat'
          style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.1 }}
        ></div>

        {/* Flex Row1 */}
        <div className='z-[1] w-full px-5'>
          <Breadcrumbs />
        </div>

        {/* Flex Row2 */}
        <div className='z-[1] flex w-full max-w-5xl flex-col items-center gap-10 p-10 md:mb-16 md:flex-row'>
          {/* Contact Details */}
          <Details />
          {/* Contact Form */}
          <Form />
        </div>

        {/* Flex Row3 */}
        {/* Google Map */}
        <div className='z-[1] w-full'>
          <Map />
        </div>
      </div>
    </>
  );
}

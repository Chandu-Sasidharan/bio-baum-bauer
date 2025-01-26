import { useContext, useEffect } from 'react';
import backgroundImage from '../assets/images/leaves_background_02.webp';
import { HiHome } from 'react-icons/hi';
import PageBreadcrumb from '../components/PageBreadcrumb';
import EachPageHeader from '../components/EachPageHeader';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/context/auth-context';
import { LuRepeat2 } from 'react-icons/lu';

const CancelPage = () => {
  const {
    handleStripeSession,
    handleOrderGrandPrice,
    handleOrder,
    handlePatronInfo,
  } = useContext(AuthContext);

  useEffect(() => {
    document.title = 'Payment Unsuccessful';
    handleStripeSession({ type: 'RESET_SESSION' });
    handleOrderGrandPrice({ type: 'RESET_GRAND_PRICE' });
    handleOrder({ type: 'REMOVE_ITEMS' });
    handlePatronInfo({ type: 'REMOVE_PATRON' });
  }, []);
  const titles = ['Payment Unsuccessful'];
  const aLinkValues = [{ linkTo: '/', linkIcon: HiHome, linkText: 'Home' }];
  const daLinkValues = { linkText: 'Payment Unsuccessful' };

  return (
    <main className='text-stone relative'>
      <PageBreadcrumb activeLinks={aLinkValues} deActiveLink={daLinkValues} />
      {/* Payment Unsuccessful title, positioned absolutely */}
      <h2 className='absolute left-1/2 top-0 -translate-x-1/2 transform py-10 text-center'>
        <EachPageHeader title={titles[0]} subtitle={titles[1]} />
      </h2>
      <section className='relative z-[4] flex flex-col items-center justify-center pt-[100px] md:pt-[160px] lg:pt-[180px] xl:pt-[220px]'>
        {/* Overlay with background image and opacity */}
        <div
          className='absolute left-0 top-0 z-[-1] h-full w-full bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url(${backgroundImage})`,
            opacity: 0.2,
          }}
        ></div>

        {/*  Payment Unsuccessful Message Content */}

        <div className='mx-auto my-10 max-w-6xl rounded-xl bg-white px-4 py-8 shadow-lg md:mt-20 md:p-8'>
          <div className='mt-6 text-center'>
            {/* <h2 className="text-2xl md:text-3xl font-semibold mb-10">
              Payment Unsuccessful
            </h2> */}
            <p className='text-md md:text-lg'>
              Unfortunately, your payment could not be processed at this time.
              This might be due to a network issue, incorrect payment details,
              or an interruption during the transaction. We encourage you to try
              again or check with your bank if the problem persists.
            </p>
            <p className='text-md mt-4 md:text-lg'>
              We appreciate your intention to support our mission. Your
              contribution is important to us, and we're here to help if you
              encounter any further issues. Please don't hesitate to{' '}
              <Link to='/contact' className='underline'>
                contact us
              </Link>{' '}
              for assistance.
            </p>
            <div className='mt-10 flex justify-center'>
              <Link
                to='/'
                className='text-md bg-primary text-accent hover:bg-primary-light duration-4000 flex w-max items-center justify-center gap-2 rounded-md border-2 px-4 py-2 font-bold transition ease-linear md:text-lg'
              >
                <LuRepeat2 size='1.4rem' />
                <span>Try again</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CancelPage;

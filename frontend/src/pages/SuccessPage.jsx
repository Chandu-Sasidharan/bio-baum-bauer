/* eslint-disable react/no-unescaped-entities */
import backgroundImage from '../assets/images/leaves_background_01.webp';
import { HiHome } from 'react-icons/hi';
import { addSponsorAndPayment } from '../utils/apiMethods';
import PageBreadcrumb from '../components/PageBreadcrumb';
import EachPageHeader from '../components/EachPageHeader';
import logoImage from '../assets/images/BioBaumBauer_Logo_ThankYou.svg';
import { Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { AuthContext } from '@/context/auth-context';
import { CartContext } from '@/context/cart-context';
import { usePatronContext } from '@/context/PatronContext';
import { RiArrowGoBackLine } from 'react-icons/ri';

const SuccessPage = () => {
  const titles = ['Payment Successful'];
  const aLinkValues = [{ linkTo: '/', linkIcon: HiHome, linkText: 'Home' }];
  const daLinkValues = { linkText: 'Payment Successful' };
  const {
    authUser,
    stripeSession,
    handleStripeSession,
    patron,
    orderGrandPrice,
    handleOrderGrandPrice,
    order,
    handleOrder,
    // handlePatronInfo,
  } = useContext(AuthContext);
  const { TAX_RATE, clearCart } = useContext(CartContext);
  const { newPatron, updateNewPatron } = usePatronContext();

  useEffect(() => {
    document.title = 'Payment Successful';
    async function insertData(
      sId,
      grandPrice,
      userId,
      taxRate,
      patron,
      orders
    ) {
      try {
        const newSponsor = await addSponsorAndPayment(
          sId,
          grandPrice,
          userId,
          taxRate,
          patron,
          orders
        );
        if (newSponsor) {
          handleStripeSession({ type: 'RESET_SESSION' });
          handleOrderGrandPrice({ type: 'RESET_GRAND_PRICE' });
          handleOrder({ type: 'REMOVE_ITEMS' });
          updateNewPatron({
            firstName: '',
            lastName: '',
            email: '',
            mobilePhone: '',
            address: {
              city: '',
              zipCode: '',
              country: '',
              state: '',
              address1: '',
              address2: '',
            },
            userId: '',
          });
          // handlePatronInfo({ type: "REMOVE_PATRON" });
          clearCart();
        }
      } catch (error) {
        console.log('error: ', error);
      }
    }
    if (
      (stripeSession.sid && stripeSession.sid !== '') ||
      orderGrandPrice.grand > 0 ||
      Object.keys(newPatron).length > 0 ||
      Object.keys(order.items).length > 0
    ) {
      insertData(
        stripeSession.sid,
        orderGrandPrice.grand,
        authUser._id,
        TAX_RATE,
        newPatron,
        order.items.cart
      );
    }
  }, []);

  return (
    <main className='text-stone relative'>
      <PageBreadcrumb activeLinks={aLinkValues} deActiveLink={daLinkValues} />
      {/* Success title, positioned absolutely */}
      <h2 className='absolute left-1/2 top-0 mb-4 -translate-x-1/2 transform py-10 text-center'>
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

        {/* Success Message Content */}

        <div className='mx-auto my-10 mt-9 max-w-6xl rounded-xl bg-white px-4 py-8 shadow-lg md:mt-20 md:p-8'>
          <p className='mb-16 flex items-center justify-center gap-2'>
            <img
              src={logoImage}
              className='w-80 rounded-full'
              alt='BioBaumBauer Thank You Logo'
            />
          </p>
          <div className='mt-6 text-center'>
            <h2 className='mb-10 text-2xl font-semibold md:text-3xl'>
              Thank You for Your Support!
            </h2>
            <p className='text-md md:text-lg'>
              Your sponsorship of a tree has been successfully processed. Thanks
              to your contribution, we're one step closer to a greener, more
              sustainable future. Your tree will not only beautify our landscape
              but also help combat climate change and support local ecosystems.
            </p>
            <p className='text-md mt-4 md:text-lg'>
              We are thrilled to have you as part of our community. Together, we
              are making a real difference. Stay tuned for updates on your tree
              and our collective impact.
            </p>
            {/* Link going back to Home page */}
            <div className='mt-10 flex justify-center'>
              <Link
                to='/'
                className='text-md bg-primary text-accent hover:bg-primary-light duration-4000 flex w-max items-center justify-center gap-2 rounded-md border-2 px-4 py-2 font-bold transition ease-linear md:text-lg'
              >
                <RiArrowGoBackLine />
                <span>Return to Home Page</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SuccessPage;

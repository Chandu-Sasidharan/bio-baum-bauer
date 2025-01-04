/* eslint-disable react/no-unescaped-entities */
import backgroundImage from '../assets/images/leaves_background_01.webp';
import { HiHome } from 'react-icons/hi';
import { addSponsorAndPayment } from '../utils/apiMethods';
import PageBreadcrumb from '../components/PageBreadcrumb';
import EachPageHeader from '../components/EachPageHeader';
import logoImage from '../assets/images/BioBaumBauer_Logo_ThankYou.svg';
import { Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { AuthContext } from '@/store/auth-context';
import { CartContext } from '@/store/cart-context';
import { usePatronContext } from '../store/PatronContext';
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
    <main className='relative text-stone'>
      <PageBreadcrumb activeLinks={aLinkValues} deActiveLink={daLinkValues} />
      {/* Success title, positioned absolutely */}
      <h2 className='absolute top-0 left-1/2 transform -translate-x-1/2 py-10 text-center mb-4'>
        <EachPageHeader title={titles[0]} subtitle={titles[1]} />
      </h2>
      <section className='cart-page-container relative flex flex-col items-center justify-center pt-[100px] md:pt-[160px] lg:pt-[180px] xl:pt-[220px]'>
        {/* Overlay with background image and opacity */}
        <div
          className='cart-page-bg absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center'
          style={{
            backgroundImage: `url(${backgroundImage})`,
            opacity: 0.2,
          }}
        ></div>

        {/* Success Message Content */}

        <div className='max-w-6xl mx-auto px-4 py-8 md:p-8 bg-white rounded-xl shadow-lg my-10 mt-9 md:mt-20'>
          <p className='flex justify-center items-center gap-2 mb-16'>
            <img
              src={logoImage}
              className='w-80 rounded-full'
              alt='BioBaumBauer Thank You Logo'
            />
          </p>
          <div className='text-center mt-6'>
            <h2 className='text-2xl md:text-3xl font-semibold mb-10'>
              Thank You for Your Support!
            </h2>
            <p className='text-md md:text-lg'>
              Your sponsorship of a tree has been successfully processed. Thanks
              to your contribution, we're one step closer to a greener, more
              sustainable future. Your tree will not only beautify our landscape
              but also help combat climate change and support local ecosystems.
            </p>
            <p className='text-md md:text-lg mt-4'>
              We are thrilled to have you as part of our community. Together, we
              are making a real difference. Stay tuned for updates on your tree
              and our collective impact.
            </p>
            {/* Link going back to Home page */}
            <div className='flex justify-center mt-10'>
              <Link
                to='/'
                className='flex items-center w-max px-4 py-2 justify-center gap-2 text-md bg-primary border-2 md:text-lg text-accent font-bold rounded-md hover:bg-primary-light transition duration-4000 ease-linear'
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

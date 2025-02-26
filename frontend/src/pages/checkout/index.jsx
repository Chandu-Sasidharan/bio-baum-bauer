import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '@/components/breadcrumbs';
import backgroundImage from '/images/background/leaves-background.webp';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '@/utils/stripe-instance';
import StripeForm from './form';

export default function CheckoutForm() {
  const { state } = useLocation();
  const paymentIntent = state?.paymentIntent;
  const clientSecret = paymentIntent?.client_secret;
  // Total amount payable by the customer in Euro
  const totalAmount = (paymentIntent?.metadata.total_amount / 100).toFixed(2);

  if (!paymentIntent) {
    return (
      <div className='flex h-screen items-center justify-center'>
        Error: Something went wrong!
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#5a6448',
        colorBackground: '#fcfcfc',
        colorText: '#82817e',
        colorDanger: '#ff6961',
        fontFamily: 'Open Sans, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '4px',
        iconColor: '#5a6448',
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Checkout | Bio Baum Bauer</title>
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
          <div className='px-5 py-20'>
            <div
              className='mx-auto max-w-5xl gap-3 rounded-md p-10 shadow-sm md:p-12'
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
            >
              <h1 className='text-stone ml-4'>{`The total amount to be charged is € ${totalAmount}`}</h1>
              <Elements stripe={stripePromise} options={options}>
                <StripeForm />
              </Elements>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

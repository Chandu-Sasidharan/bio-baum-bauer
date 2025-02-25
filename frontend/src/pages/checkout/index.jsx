import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '@/components/breadcrumbs';
import backgroundImage from '/images/background/leaves-background.webp';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeForm from './form';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function CheckoutForm() {
  const { state } = useLocation();
  const clientSecret = state?.clientSecret;

  if (!clientSecret) {
    return <div>Error: Something went wrong!</div>;
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
          <div className='my-16 p-5'>
            <div
              className='mx-auto max-w-5xl gap-3 rounded-md p-10 shadow-sm md:p-12'
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
            >
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

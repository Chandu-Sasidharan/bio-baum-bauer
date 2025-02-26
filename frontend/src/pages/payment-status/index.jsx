import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Spinner from '@/components/spinner';
import Breadcrumbs from '@/components/breadcrumbs';
import backgroundImage from '/images/background/leaves-background.webp';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '@/utils/stripe-instance';
import Status from './status';

export default function CheckoutForm() {
  const [clientSecret, setClientSecret] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Retrieve the "payment_intent_client_secret" query parameter from the URL
    const secret = new URLSearchParams(location.search).get(
      'payment_intent_client_secret'
    );

    if (!secret) return;

    setClientSecret(secret);
  }, [location.search]);

  if (!clientSecret) {
    return <Spinner />;
  }

  const options = {
    clientSecret,
  };

  return (
    <>
      <Helmet>
        <title>Payment Status | Bio Baum Bauer</title>
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
          <div className='p-5 md:p-10'>
            <div
              className='mx-auto max-w-5xl gap-3 rounded-md p-10 shadow-sm md:p-12'
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
            >
              <Elements stripe={stripePromise} options={options}>
                <Status clientSecret={clientSecret} />
              </Elements>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

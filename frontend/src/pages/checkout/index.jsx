import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '@/components/breadcrumbs';
import backgroundImage from '/images/background/leaves-background.webp';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '@/utils/stripe-instance';
import StripeForm from './form';
import useCopy from '@/hooks/use-copy';
import { useLanguage } from '@/context/lang-context';

const copy = {
  de: {
    metaTitle: 'Zur Kasse | Bio Baum Bauer',
    error: 'Fehler: Etwas ist schiefgelaufen.',
    totalLabel: betrag => `Der zu zahlende Gesamtbetrag beträgt € ${betrag}`,
  },
  en: {
    metaTitle: 'Checkout | Bio Baum Bauer',
    error: 'Error: Something went wrong!',
    totalLabel: amount => `The total amount to be charged is € ${amount}`,
  },
};

export default function CheckoutForm() {
  const { state } = useLocation();
  const paymentIntent = state?.paymentIntent;
  const text = useCopy(copy);
  const { language } = useLanguage();

  if (!paymentIntent) {
    return (
      <div className='flex h-screen items-center justify-center'>
        {text.error}
      </div>
    );
  }

  const clientSecret = paymentIntent.client_secret;
  // Total amount payable by the customer in Euro
  const totalAmount = (paymentIntent.amount / 100).toFixed(2);

  const options = useMemo(
    () => ({
      clientSecret,
      locale: language,
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
    }),
    [clientSecret, language]
  );

  return (
    <>
      <Helmet>
        <title>{text.metaTitle}</title>
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
              <h1 className='text-stone ml-4'>
                {text.totalLabel(totalAmount)}
              </h1>
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

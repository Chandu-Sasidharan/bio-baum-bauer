import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js';
import Spinner from '@/components/spinner';
import { useCart } from '@/context/cart-context';
import Button from '@/components/ui/button';
import treeIcon from '/images/misc/tree.png';
import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    messages: {
      succeeded: 'Vielen Dank für deine Patenschaft! Deine Zahlung ist eingegangen.',
      processing: 'Die Zahlung wird verarbeitet. Wir informieren dich, sobald sie bestätigt ist.',
      requiresPaymentMethod:
        'Die Zahlung ist fehlgeschlagen. Bitte versuche es mit einer anderen Zahlungsmethode.',
      default: 'Etwas ist schiefgelaufen.',
    },
    home: 'Zur Startseite',
  },
  en: {
    messages: {
      succeeded: 'Thank you for sponsoring! Your payment has been received.',
      processing: "Payment processing. We'll update you when payment is received.",
      requiresPaymentMethod:
        'Payment failed. Please try another payment method.',
      default: 'Something went wrong!',
    },
    home: 'Back to Home',
  },
};

export default function Status({ clientSecret }) {
  const [message, setMessage] = useState('');
  const { clearCartTrees } = useCart();
  const stripe = useStripe();
  const text = useCopy(copy);

  useEffect(() => {
    if (!stripe || !clientSecret) {
      return;
    }

    // Retrieve the PaymentIntent
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      // Some payment methods will [immediately succeed or fail][0] upon
      // confirmation, while others will first enter a `processing` state.
      // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
      switch (paymentIntent.status) {
        case 'succeeded':
          console.log('PaymentIntent metadata:', paymentIntent.metadata);
          clearCartTrees();
          setMessage(text.messages.succeeded);
          break;

        case 'processing':
          clearCartTrees();
          setMessage(text.messages.processing);
          break;

        case 'requires_payment_method':
          setMessage(text.messages.requiresPaymentMethod);
          break;

        default:
          setMessage(text.messages.default);
          break;
      }
    });
  }, [stripe, clientSecret, text]);

  if (!message) {
    return <Spinner height='60' />;
  }

  return (
    <div className='flex flex-col items-center justify-center gap-10 p-5'>
      <img src={treeIcon} alt='Tree Icon' className='h-[100px] w-[100px]' />
      <p className='text-center text-xl'>{message}</p>
      <Link to='/'>
        <Button variant='primary' rounded>
          {text.home}
        </Button>
      </Link>
    </div>
  );
}

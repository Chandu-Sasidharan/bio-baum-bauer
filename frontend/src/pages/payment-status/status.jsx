import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js';
import { useCart } from '@/context/cart-context';
import Button from '@/components/ui/button';
import treeIcon from '/images/misc/tree.png';

export default function Status({ clientSecret }) {
  const [message, setMessage] = useState('');
  const { clearCartTrees } = useCart();
  const stripe = useStripe();

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
          clearCartTrees();
          setMessage(
            'Thank you for sponsoring! Your payment has been received.'
          );
          break;

        case 'processing':
          clearCartTrees();
          setMessage(
            "Payment processing. We'll update you when payment is received."
          );
          break;

        case 'requires_payment_method':
          setMessage('Payment failed. Please try another payment method.');
          break;

        default:
          setMessage('Something went wrong!');
          break;
      }
    });
  }, [stripe, clientSecret]);

  if (!clientSecret) {
    return null;
  }

  return (
    <div className='flex flex-col items-center justify-center gap-10 p-5'>
      <img src={treeIcon} alt='Tree Icon' className='h-[100px] w-[100px]' />
      <p className='text-center text-xl'>{message}</p>
      <Link to='/'>
        <Button variant='primary' rounded>
          Back to Home
        </Button>
      </Link>
    </div>
  );
}

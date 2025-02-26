import { useState } from 'react';
import Button from '@/components/ui/button';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

export default function StripeForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      setIsLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${import.meta.env.VITE_FRONTEND_URL}/thank-you`,
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when submitting the form.
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  return (
    <form className='mx-auto flex flex-col gap-6 p-4' onSubmit={handleSubmit}>
      <PaymentElement />
      <Button type='submit' disabled={!stripe} isProcessing={isLoading}>
        Pay Now
      </Button>
      {errorMessage && <div className='text-red text-sm'>{errorMessage}</div>}
    </form>
  );
}

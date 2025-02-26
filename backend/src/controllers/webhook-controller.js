import { StatusCodes } from 'http-status-codes';
import { stripeInstance, endpointSecret } from '#src/utils/stripe.js';

export const postPaymentWebhook = async (req, res) => {
  if (!endpointSecret) return;

  try {
    let event = req.body;
    // Get the signature sent by Stripe
    const signature = req.headers['stripe-signature'];
    try {
      event = stripeInstance.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`⚠️  Webhook signature verification failed.`, error.message);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Webhook Error' });
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        // eslint-disable-next-line
        console.log(
          `PaymentIntent for ${paymentIntent.amount} was successful!`
        );
        // Access the metadata
        const metadata = paymentIntent.metadata;
        // eslint-disable-next-line
        console.log('PaymentIntent metadata:', metadata);
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      default:
        // Unexpected event type
        // eslint-disable-next-line no-console
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    return res.status(StatusCodes.OK).json({ received: true });
  } catch (error) {
    throw error;
  }
};

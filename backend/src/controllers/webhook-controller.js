import { StatusCodes } from 'http-status-codes';
import { stripeInstance, endpointSecret } from '#src/utils/stripe.js';
import Sponsorship from '#src/models/sponsorship.js';

export const postPaymentWebhook = async (req, res) => {
  if (!endpointSecret) return;

  try {
    let event = req.body;
    // Get the signature sent by Stripe
    const signature = req.headers['stripe-signature'];
    try {
      // Verify that the event posted came from Stripe
      // Will throw an error if the signature is not valid
      event = stripeInstance.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Webhook Error' });
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        await Sponsorship.findByIdAndUpdate(
          paymentIntent.metadata.sponsorshipId,
          { status: 'paid' }
        );
        break;
      case 'payment_intent.payment_failed':
        const paymentIntentFailed = event.data.object;
        await Sponsorship.findByIdAndUpdate(
          paymentIntentFailed.metadata.sponsorshipId,
          { status: 'failed' }
        );
        break;
    }

    // Return a 200 response to acknowledge receipt of the event
    return res.status(StatusCodes.OK).json({ received: true });
  } catch (error) {
    throw error;
  }
};

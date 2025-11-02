import { StatusCodes } from 'http-status-codes';
import { stripeInstance, endpointSecret } from '#src/utils/stripe.js';
import Sponsorship from '#src/models/sponsorship.js';
import sendPaymemtSucceededEmail from '#src/utils/send-payment-succeeded-email.js';
import sendPaymentFailedEmail from '#src/utils/send-payment-failed-email.js';
import sendNewSponsorshipEmail from '#src/utils/send-new-sponsorship-email.js';

const getSponsorshipData = async sponsorshipId => {
  const sponsorship = await Sponsorship.findById(sponsorshipId);
  if (!sponsorship) {
    throw new Error('Sponsorship not found');
  }

  return {
    email: sponsorship.email,
    isGuest: sponsorship.isGuest,
    userName: sponsorship.isGuest ? 'Patron' : sponsorship.firstName,
    amount: (sponsorship.amount / 100).toFixed(2),
    sponsorshipId: sponsorship._id,
  };
};

export const postPaymentWebhook = async (req, res, next) => {
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
        const sponsorshipId = paymentIntent.metadata.sponsorshipId;

        // Update the sponsorship status to 'paid'
        await Sponsorship.findByIdAndUpdate(sponsorshipId, { status: 'paid' });

        // Retrieve the sponsorship data
        const sponsorshipData = await getSponsorshipData(sponsorshipId);

        // Send the payment succeeded email to the sponsor
        if (!sponsorshipData.isGuest) {
          await sendPaymemtSucceededEmail(sponsorshipData);
        }
        // Send email to the team
        await sendNewSponsorshipEmail(sponsorshipData);

        break;
      case 'payment_intent.payment_failed':
        const paymentIntentFailed = event.data.object;
        const failedSponsorshipId = paymentIntentFailed.metadata.sponsorshipId;

        // Update the sponsorship status to 'failed'
        await Sponsorship.findByIdAndUpdate(failedSponsorshipId, {
          status: 'failed',
        });

        // Retrieve the sponsorship data
        const failedSponsorshipData =
          await getSponsorshipData(failedSponsorshipId);

        // Send the payment failed email to the sponsor
        if (!failedSponsorshipData.isGuest) {
          await sendPaymentFailedEmail(failedSponsorshipData);
        }
        break;
    }

    // Return a 200 response to acknowledge receipt of the event
    return res.status(StatusCodes.OK).json({ received: true });
  } catch (error) {
    next(error);
  }
};

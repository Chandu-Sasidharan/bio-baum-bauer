import { StatusCodes } from 'http-status-codes';
import formatZodError from '#src/utils/format-zod-error.js';
import validatePaymentData from '#src/validations/payment-data-validation.js';
import stripeInstance from '#src/utils/stripe-instance.js';

export const getPaymentIntent = async (req, res) => {
  try {
    const paymentData = req.body;
    const result = validatePaymentData(paymentData);
    if (!result.success) {
      const errors = formatZodError(result.error);

      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors, message: 'Invalid data' });
    }

    const intent = await stripeInstance.paymentIntents.create({
      amount: 1099,
      currency: 'usd',
    });

    return res
      .status(StatusCodes.OK)
      .json({ client_secret: intent.client_secret });
  } catch (error) {
    throw error;
  }
};

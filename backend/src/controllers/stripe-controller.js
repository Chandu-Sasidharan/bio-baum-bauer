import { StatusCodes } from 'http-status-codes';
// import formatZodError from '#src/utils/format-zod-error.js';
// import stripeInstance from '#src/utils/stripe-instance.js';

export const getPaymentIntent = async (req, res) => {
  const paymentData = req.body;
  // eslint-disable-next-line no-console
  console.log('paymentData', paymentData);

  // Validate the payament data

  // if (!result.success) {
  //   const errors = formatZodError(result.error);

  //   return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  // }

  try {
    return res.status(StatusCodes.OK).json({ client_secret: 'nomnomnom' });
  } catch (error) {
    throw error;
  }
};

import { StatusCodes } from 'http-status-codes';
import formatZodError from '#src/utils/format-zod-error.js';
import validatePaymentData from '#src/validations/payment-data-validation.js';
import { stripeInstance } from '#src/utils/stripe.js';
import Sponsorship from '#src/models/sponsorship.js';
import Tree from '#src/models/tree.js';

export const getPaymentIntent = async (req, res, next) => {
  try {
    const paymentData = req.body;

    // Validate the payment data using Zod
    const { success, data, error } = validatePaymentData(paymentData);
    if (!success) {
      const errors = formatZodError(error);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors, message: 'Invalid Data' });
    }

    const { cartItems } = data;
    const treeIds = cartItems.map(item => item.treeId);

    // Retrieve tree objects from the database
    const trees = await Tree.find({ _id: { $in: treeIds } });

    // Map trees by their id for quick lookup
    const treeMap = trees.reduce((acc, tree) => {
      acc[tree._id.toString()] = tree;
      return acc;
    }, {});

    // Calculate the total amount (in euro cents). Prices are stored as Decimal128 values,
    // so convert them to floats (euros) before converting to cents.
    const amount = cartItems.reduce((sum, item) => {
      const tree = treeMap[item.treeId];
      if (tree && tree.price) {
        const priceEuros = parseFloat(tree.price.toString());
        if (!Number.isNaN(priceEuros)) {
          const priceCents = Math.round(priceEuros * 100);
          return sum + priceCents * item.quantity;
        }
      }
      return sum;
    }, 0);

    // Ensure the calculated amount is valid
    if (amount <= 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid Data' });
    }

    // Save the sponsorship data to the db and get the id
    const sponsorship = await Sponsorship.create({
      amount,
      ...data,
      status: 'pending',
    });

    // Create the payment intent with the calculated amount
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount,
      currency: data.currency,
      metadata: {
        sponsorshipId: sponsorship._id.toString(),
      },
    });

    return res.status(StatusCodes.OK).json({ paymentIntent });
  } catch (error) {
    next(error);
  }
};

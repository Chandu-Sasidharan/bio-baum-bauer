import { StatusCodes } from 'http-status-codes';
import formatZodError from '#src/utils/format-zod-error.js';
import validatePaymentData from '#src/validations/payment-data-validation.js';
import { stripeInstance } from '#src/utils/stripe.js';
import Sponsorship from '#src/models/sponsorship.js';
import Tree from '#src/models/tree.js';

export const getPaymentIntent = async (req, res) => {
  try {
    const paymentData = req.body;

    // Validate the payment data using Zod
    const result = validatePaymentData(paymentData);
    if (!result.success) {
      const errors = formatZodError(result.error);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors, message: 'Invalid Data' });
    }

    const { cartItems } = paymentData;
    const treeIds = cartItems.map(item => item.treeId);

    // Retrieve tree objects from the database
    const trees = await Tree.find({ _id: { $in: treeIds } });

    // Map trees by their id for quick lookup
    const treeMap = trees.reduce((acc, tree) => {
      acc[tree._id.toString()] = tree;
      return acc;
    }, {});

    // Calculate the total amount (in euro cents)
    // Convert the Decimal128 price to a number (in euros) then convert to cents
    const amount = cartItems.reduce((sum, item) => {
      const tree = treeMap[item.treeId];
      if (tree && tree.price) {
        const priceEuros = parseFloat(tree.price.toString());
        const priceCents = Math.round(priceEuros * 100);
        return sum + priceCents * item.quantity;
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
      ...paymentData,
      amount,
      status: 'pending',
    });

    // Create the payment intent with the calculated amount
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount,
      currency: 'eur',
      metadata: {
        sponsorshipId: sponsorship._id.toString(),
      },
    });

    return res.status(StatusCodes.OK).json({ paymentIntent });
  } catch (error) {
    throw error;
  }
};

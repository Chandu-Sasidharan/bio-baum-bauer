import SponsorShipPayment from '../models/SponsorShipPayment.js';
import Patron from '../models/Patron.js';
import OrderItem from '../models/OrderItem.js';
import { StatusCodes } from 'http-status-codes';
import { stripeInstance } from '../utils/stripeInstance.js';

//get the list of sponsors
export const getAllSponsorships = async (req, res) => {
  const uId = req.params.uId;
  try {
    const allSponsorships = await SponsorShipPayment.find({ userId: uId });
    return res.status(StatusCodes.OK).json(allSponsorships);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.toString() });
  }
};

export const getSponsorShipById = async (req, res) => {
  const sId = req.params.sId;
  try {
    const sponsorship = await SponsorShipPayment.findById(sId);
    const patron = await Patron.findOne({ sponsorshipId: sId });
    const items = await OrderItem.find({ sponsorshipId: sId });
    return res.status(StatusCodes.OK).json({ sponsorship, patron, items });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.toString() });
  }
};

export const sponsorShipCounts = async (req, res) => {
  const uId = req.params.uId;
  try {
    const count = await SponsorShipPayment.find({ userId: uId }).count();
    return res.status(StatusCodes.OK).json(count);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.toString() });
  }
};

export const createStripePayment = async (req, res) => {
  const { cart } = req.body;
  // console.log('CART:', cart)
  const taxRate = await stripeInstance.taxRates.create({
    display_name: 'VAT',
    description: 'VAT Germany',
    percentage: 19,
    jurisdiction: 'DE',
    inclusive: false,
  });
  const trees = cart.map(tree => ({
    price_data: {
      currency: 'eur',
      product_data: {
        name: tree.treeName,
      },
      unit_amount: tree.treePrice * 100,
    },
    quantity: tree.qty,
    tax_rates: [taxRate.id],
  }));
  try {
    const paymentSession = await stripeInstance.checkout.sessions.create({
      line_items: trees,
      payment_method_types: ['card', 'klarna'],
      mode: 'payment',
      success_url: 'https://bio-baum-bauer.onrender.com/success',
      cancel_url: 'https://bio-baum-bauer.onrender.com/cancel',
    });
    return res.status(StatusCodes.CREATED).json({ id: paymentSession.id });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

export const addPaymentAndSponsorShip = async (req, res) => {
  const cNo = `BBB-${Date.now()}`;
  const session = await stripeInstance.checkout.sessions.retrieve(
    req.body.sessionId
  );
  const sponsor = await SponsorShipPayment.findOne({
    sessionId: req.body.sessionId,
  });
  if (sponsor) {
    return res.status(StatusCodes.OK).json({ message: 'id is used' });
  }
  if (session.payment_status === 'paid') {
    try {
      const { sessionId, totalGrundPay, userId, taxRate, patron, orders } =
        req.body;

      const newSponsorship = await SponsorShipPayment.create({
        certificationNo: cNo,
        sessionId: sessionId,
        amount: totalGrundPay,
        taxRate: taxRate,
        userId: userId,
      });
      await Patron.create({
        address: {
          address1: patron.address.address1,
          address2: patron.address.address2,
          city: patron.address.city,
          country: patron.address.country,
          state: patron.address.state,
          zipCode: patron.address.zipCode,
        },
        email: patron.email,
        firstName: patron.firstName,
        lastName: patron.lastName,
        mobilePhone: patron.mobilePhone,
        sponsorshipId: newSponsorship._id,
      });
      const newOrder = orders.map(order => ({
        ...order,
        sponsorshipId: newSponsorship._id,
      }));
      const newItems = await OrderItem.create(newOrder);
      return res.status(StatusCodes.CREATED).json({ newItems });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.toString() });
    }
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'canceled requests are not allowed to stored ' });
  }
};

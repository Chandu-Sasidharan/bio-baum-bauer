import { StatusCodes } from 'http-status-codes';
import OrderItem from '../models/OrderItem.js';

//create a new sponsorship
export const createSponsorShip = async (_req, _res) => {};

//get the list of sponsors
export const getAllSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsorship.find()
      .populate('userId')
      .populate('orderId');

    return res.status(StatusCodes.OK).json(sponsors);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.toString() });
  }
};

//delete a sponsor
export const deleteSponsor = async (req, res) => {
  try {
    const sponsorId = req.params.id;

    const deletedSponsor = await Sponsorship.findByIdAndDelete(sponsorId);

    if (!deletedSponsor) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Sponsor not found' });
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: 'Sponsor deleted successfully' });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error', error: error.toString() });
  }
};

//update sponsor's info

export const updateSponsorShip = async (req, res) => {
  try {
    const { cart } = req.body.trees;
    // const sponsorShip = await Sponsorship.findById(sId);

    cart.forEach(async element => {
      const newItem = OrderItem.create({
        treeId: element.treeId,
        treeName: element.treeName,
        treeImage: element.treeImage,
        treePrice: element.treePrice,
        qty: element.qty,
      });
      sponsorShip.items.push(newItem._id);
      sponsorShip.save();
    });

    if (!sponsorShip) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'SponsorShip page not found' });
    }

    return res.status(StatusCodes.OK).json({ sponsorShip });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error', error: error.toString() });
  }
};

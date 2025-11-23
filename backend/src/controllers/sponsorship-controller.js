import { StatusCodes } from 'http-status-codes';
import Sponsorship from '#src/models/sponsorship.js';
import { CATEGORY_LABELS } from '#src/constants/i18n.js';
import pickLocalizedField from '#src/utils/pick-localized-field.js';

export const getUserSponsorships = async (req, res, next) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Unauthorized: Invalid token' });
    }

    const sponsorships = await Sponsorship.find({ userId })
      .populate({
        path: 'cartItems.treeId',
        select: 'name imageUrl category price',
      })
      .sort({ createdAt: -1 })
      .lean();

    const formattedSponsorships = sponsorships.map(sponsorship => ({
      id: sponsorship._id.toString(),
      status: sponsorship.status,
      amount: sponsorship.amount,
      currency: sponsorship.currency,
      taxRate: sponsorship.taxRate,
      createdAt: sponsorship.createdAt,
      updatedAt: sponsorship.updatedAt,
      cartItems: sponsorship.cartItems.map(item => ({
        quantity: item.quantity,
        tree: item.treeId
          ? {
              id: item.treeId._id.toString(),
              name: pickLocalizedField(item.treeId.name, req.locale),
              imageUrl: item.treeId.imageUrl,
              category: item.treeId.category,
              categoryLabel: pickLocalizedField(
                CATEGORY_LABELS[item.treeId.category],
                req.locale
              ),
              price: item.treeId.price,
            }
          : null,
      })),
    }));

    return res
      .status(StatusCodes.OK)
      .json({ sponsorships: formattedSponsorships });
  } catch (error) {
    next(error);
  }
};

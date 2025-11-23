import { StatusCodes } from 'http-status-codes';
import Impression from '#src/models/impression.js';
import pickLocalizedField from '#src/utils/pick-localized-field.js';

// Get all impressions
export const getAllImpressions = async (req, res, next) => {
  try {
    const impressions = await Impression.find().lean();
    const localizedImpressions = impressions.map(impression => ({
      ...impression,
      title: pickLocalizedField(impression.title, req.locale),
    }));
    return res
      .status(StatusCodes.OK)
      .json({ impressions: localizedImpressions });
  } catch (error) {
    next(error);
  }
};

import { StatusCodes } from 'http-status-codes';
import Impression from '#src/models/impression.js';

// Get all impressions
export const getAllImpressions = async (_req, res, next) => {
  try {
    const impressions = await Impression.find().lean();
    return res.status(StatusCodes.OK).json({ impressions });
  } catch (error) {
    next(error);
  }
};

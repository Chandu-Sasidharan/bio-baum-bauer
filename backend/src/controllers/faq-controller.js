import { StatusCodes } from 'http-status-codes';
import Faq from '#src/models/faq.js';

export const getAllFaqs = async (_req, res) => {
  try {
    const faqs = await Faq.find().lean();
    return res.status(StatusCodes.OK).json({ faqs });
  } catch (error) {
    throw error;
  }
};

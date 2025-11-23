import { StatusCodes } from 'http-status-codes';
import Faq from '#src/models/faq.js';
import pickLocalizedField from '#src/utils/pick-localized-field.js';

export const getAllFaqs = async (req, res, next) => {
  try {
    const faqs = await Faq.find().lean();
    const localizedFaqs = faqs.map(faq => ({
      ...faq,
      question: pickLocalizedField(faq.question, req.locale),
      answer: pickLocalizedField(faq.answer, req.locale),
    }));

    return res.status(StatusCodes.OK).json({ faqs: localizedFaqs });
  } catch (error) {
    next(error);
  }
};

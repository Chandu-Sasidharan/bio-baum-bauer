import { model, Schema } from 'mongoose';
import validateFaqData from '#src/validations/faq-validation.js';

const localizedStringSchema = {
  en: { type: String, required: true, trim: true },
  de: { type: String, trim: true },
};

const faqSchema = new Schema(
  {
    question: { type: localizedStringSchema, required: true },
    answer: { type: localizedStringSchema, required: true },
  },
  { timestamps: true }
);

const Faq = model('Faq', faqSchema);
Object.assign(Faq, { validateFaqData });

export default Faq;

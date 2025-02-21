import { model, Schema } from 'mongoose';
import validateFaqData from '#src/validations/faq-validation.js';

const faqSchema = new Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Faq = model('Faq', faqSchema);
Object.assign(Faq, { validateFaqData });

export default Faq;

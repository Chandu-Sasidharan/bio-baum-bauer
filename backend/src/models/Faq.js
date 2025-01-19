import { model, Schema } from 'mongoose';

const faqSchema = new Schema(
  {
    Question: { type: String, required: true },
    Answers: { type: String, required: true },
  },
  { timestamps: true }
);

const Faq = model('faq', faqSchema);
export default Faq;

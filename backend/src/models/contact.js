import { model, Schema } from 'mongoose';
import validateContactFormData from '#src/validations/contact-form-validation.js';

const contactFormSchema = new Schema(
  {
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true },
    agreeToPolicies: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Contact = model('Contact', contactFormSchema);
Object.assign(Contact, { validateFormData: validateContactFormData });

export default Contact;

import { Schema, model } from 'mongoose';
import validateImpression from '#src/validations/impression-validation.js';

const impressionSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Impression = model('Impression', impressionSchema);
Object.assign(Impression, {
  validateImpression,
});

export default Impression;

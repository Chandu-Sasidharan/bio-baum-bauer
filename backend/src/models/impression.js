import { Schema, model } from 'mongoose';
import validateImpression from '#src/validations/impression-validation.js';

const impressionSchema = new Schema(
  {
    title: { type: String, trim: true },
    imageUrl: { type: String, trim: true },
    imageKey: { type: String, trim: true },
    imageBucket: { type: String, trim: true },
    imageFilename: { type: String, trim: true },
    imageMimeType: { type: String, trim: true },
    imageFilesize: { type: Number, min: 0 },
  },
  { timestamps: true }
);

const Impression = model('Impression', impressionSchema);
Object.assign(Impression, {
  validateImpression,
});

export default Impression;

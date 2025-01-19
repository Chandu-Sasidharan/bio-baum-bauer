import { model, Schema } from 'mongoose';

const farmSchema = new Schema(
  {
    farmName: { type: String, required: true },
    ownerName: { type: String, required: true },
    fieldType: { type: String, required: true },
    GPScoordinates: {
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },
    },
    contactInfo: { type: String, required: true },
  },
  { timestamps: true }
);

const Farm = model('farm', farmSchema);
export default Farm;

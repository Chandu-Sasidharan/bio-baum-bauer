import { Schema, model } from 'mongoose';
import SponsorShipPayment from './SponsorShipPayment.js';
const patronSchema = new Schema({
  address: {
    address1: { type: String },
    address2: { type: String },
    city: { type: String },
    country: { type: String },
    state: { type: String },
    zipCode: { type: String },
  },
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  mobilePhone: { type: String },
  sponsorshipId: {
    type: Schema.Types.ObjectId,
    ref: SponsorShipPayment,
    required: true,
  },
});

const Patron = model('patron', patronSchema);
export default Patron;

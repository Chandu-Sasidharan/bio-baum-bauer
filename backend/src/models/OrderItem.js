import { model, Schema } from 'mongoose';
import SponsorShipPayment from './SponsorShipPayment.js';

const orderItemSchema = new Schema({
  treeId: { type: Schema.Types.ObjectId, required: true },
  treeName: { type: String },
  treeImage: { type: String },
  treePrice: { type: Schema.Types.Decimal128 },
  qty: { type: Number },
  sponsorshipId: {
    type: Schema.Types.ObjectId,
    ref: SponsorShipPayment,
    required: true,
  },
});

const OrderItem = model('orderItem', orderItemSchema);
export default OrderItem;

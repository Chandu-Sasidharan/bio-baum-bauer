import { model, Schema } from 'mongoose';
import validateSponsorship from '#src/validations/sponsorship-validation.js';

const sponsorshipSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    email: { type: String, trim: true, lowercase: true },
    isGuest: { type: Boolean, required: true },
    amount: { type: Number, required: true },
    curency: { type: String, required: true },
    taxRate: { type: Number, required: true },
    cartItems: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Tree' },
        quantity: { type: Number },
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Sponsorship = model('Sponsorship', sponsorshipSchema);
Object.assign(Sponsorship, { validateSponsorship });

export default Sponsorship;

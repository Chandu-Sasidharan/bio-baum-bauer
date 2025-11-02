import { model, Schema } from 'mongoose';
import validateSponsorship from '#src/validations/sponsorship-validation.js';

const sponsorshipSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    email: { type: String, trim: true, lowercase: true },
    firstName: { type: String, trim: true },
    isGuest: { type: Boolean, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    taxRate: { type: Number, required: true },
    cartItems: [
      {
        treeId: { type: Schema.Types.ObjectId, ref: 'Tree', required: true },
        quantity: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'needs_review'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Sponsorship = model('Sponsorship', sponsorshipSchema);
Object.assign(Sponsorship, { validateSponsorship });

export default Sponsorship;

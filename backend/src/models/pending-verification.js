import { model, Schema } from 'mongoose';

const pendingVerificationSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verificationToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PendingVerification = model(
  'PendingVerification',
  pendingVerificationSchema
);

export default PendingVerification;

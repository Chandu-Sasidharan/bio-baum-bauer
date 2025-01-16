import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    address: {
      country: { type: String, default: 'Germany' },
      state: { type: String },
      city: { type: String },
      zipCode: { type: Number },
      address1: { type: String },
      address2: { type: String },
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobilePhone: { type: String },
    userType: {
      type: String,
      default: 'regular',
      enum: {
        values: ['admin', 'regular'],
        message: '{VALUE} is not supported',
      },
    },
  },
  { timestamps: true }
);

const User = model('user', userSchema);
export default User;

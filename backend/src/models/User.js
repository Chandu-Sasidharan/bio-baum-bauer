import { model, Schema } from 'mongoose';
import validateUser from '#src/validations/user-validation.js';
import validateSignupFormData from '#src/validations/signup-form-validation.js';
import validateUpdateFormData from '#src/validations/update-form-validation.js';

// Mongoose schema
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    address: {
      street: { type: String, trim: true },
      houseNumber: { type: String, trim: true },
      city: { type: String, trim: true },
      country: { type: String, trim: true },
      zipCode: { type: String, trim: true },
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    avatarUrl: {
      type: String,
      trim: true,
      default: 'dummy',
    },
    cartItems: [
      {
        treeId: {
          type: Schema.Types.ObjectId,
          ref: 'Tree',
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    passwordResetToken: {
      type: String,
    },
    passwordResetTokenExpiresAt: {
      type: Date,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpiresAt: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
    },
    isSuperAdmin: {
      type: Boolean,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);
Object.assign(User, {
  validateUser,
  validateSignupFormData,
  validateUpdateFormData,
});

export default User;

import { model, Schema } from 'mongoose';
import validateUser from '#src/validations/user-validation.js';
import validateSignupFormData from '#src/validations/signup-form-validation.js';
import validateUpdateFormData from '#src/validations/update-form-validation.js';

// Mongoose schema
const userSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    address: {
      street: { type: String },
      houseNumber: { type: String },
      city: { type: String },
      country: { type: String },
      zipCode: { type: String },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    avatarUrl: {
      type: String,
      default: 'dummy',
    },
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

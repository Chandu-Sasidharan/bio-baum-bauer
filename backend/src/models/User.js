import { model, Schema, Types } from 'mongoose';
import { z } from 'zod';

const { ObjectId } = Types;

// Custom validation for MongoDB ObjectId
const objectIdValidation = z.string().refine(val => ObjectId.isValid(val), {
  message: 'Invalid MongoDB ObjectId',
});

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
    isVerified: {
      type: Boolean,
      default: false,
    },
    varificationToken: {
      type: String,
    },
    verificationExpiresAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpiresAt: {
      type: Date,
    },
    isAdmin: {
      type: Boolean,
    },
    isSuperAdmin: {
      type: Boolean,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Zod validation schema
const userValidationSchema = z.object({
  _id: objectIdValidation.optional(),
  firstName: z
    .string()
    .min(3, { message: 'First name should have a minimum length of 3' })
    .max(50, { message: 'First name should have a maximum length of 50' }),
  lastName: z
    .string()
    .min(3, { message: 'Last name should have a minimum length of 3' })
    .max(50, { message: 'Last name should have a maximum length of 50' }),
  address: z.object({
    street: z
      .string()
      .min(3, { message: 'Street should have a minimum length of 3' })
      .max(50, { message: 'Street should have a maximum length of 50' }),
    houseNumber: z
      .string()
      .min(1, { message: 'House number should have a minimum length of 1' })
      .max(10, { message: 'House number should have a maximum length of 10' }),
    city: z
      .string()
      .min(3, { message: 'City should have a minimum length of 3' })
      .max(50, { message: 'City should have a maximum length of 50' }),
    country: z
      .string()
      .min(3, { message: 'Country should have a minimum length of 3' })
      .max(50, { message: 'Country should have a maximum length of 50' }),
    zipCode: z
      .string()
      .min(5, { message: 'Zip code should have a minimum length of 5' })
      .max(10, { message: 'Zip code should have a maximum length of 10' }),
  }),
  email: z.string().email({ message: 'Email must be a valid email' }),
  password: z
    .string()
    .min(5, { message: 'Password should have a minimum length of 5' })
    .max(128, { message: 'Password should have a maximum length of 128' }),
  phoneNumber: z
    .string()
    .min(8, { message: 'Phone number should have a minimum length of 8' })
    .max(16, { message: 'Phone number should have a maximum length of 16' })
    .optional(),
  avatarUrl: z.string().optional(),
  isAdmin: z.boolean().optional(),
  isSuperAdmin: z.boolean().optional(),
  isVerified: z.boolean(),
  varificationToken: z.string().optional(),
  verificationExpiresAt: z.date().optional(),
  passwordResetToken: z.string().optional(),
  passwordResetExpiresAt: z.date().optional(),
  deleted: z.boolean(),
});

function validateUser(user) {
  return userValidationSchema.safeParse(user);
}

const User = model('User', userSchema);
User.validateUser = validateUser;

export default User;

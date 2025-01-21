import { Types } from 'mongoose';
import { z } from 'zod';

const { ObjectId } = Types;

// Custom validation for MongoDB ObjectId
const objectIdValidation = z.string().refine(val => ObjectId.isValid(val), {
  message: 'Invalid MongoDB ObjectId',
});

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
  varificationToken: z.string().optional(),
  verificationTokenExpiresAt: z.date().optional(),
  passwordResetToken: z.string().optional(),
  passwordResetTokenExpiresAt: z.date().optional(),
  isAdmin: z.boolean().optional(),
  isSuperAdmin: z.boolean().optional(),
  deletedAt: z.union([z.date(), z.null()]).optional(),
  isVerified: z.boolean(),
});

const validateUser = user => {
  return userValidationSchema.safeParse(user);
};

export default validateUser;

import { z } from 'zod';
import mongoose from 'mongoose';

// Custom validation for ObjectId
const objectIdValidation = z
  .string()
  .refine(val => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  });

// Zod validation schema
const sponsorshipValidationSchema = z.object({
  userId: objectIdValidation.optional(), // UserId is optional as we allow guest sponsorships
  email: z
    .string({ message: 'Email must be a string' })
    .trim()
    .email({ message: 'Invalid Email' })
    .optional(), // Email is optional as we allow guest sponsorships
  firstName: z
    .string({ message: 'First name must be a string' })
    .min(3, { message: 'First name should have a minimum length of 2' })
    .optional(), // First name is optional as we allow guest sponsorships
  isGuest: z.boolean({ message: 'isGuest must be a boolean' }),
  amount: z
    .number({ message: 'Amount must be a number' })
    .min(1, { message: 'Amount must be at least 1' }),
  currency: z.string({ message: 'Currency must be a string' }),
  taxRate: z
    .number({ message: 'Tax rate must be a number' })
    .min(0, { message: 'Tax rate must be at least 0' }),
  cartItems: z
    .array(
      z.object({
        productId: objectIdValidation, // Validate productId as ObjectId
        quantity: z
          .number({ message: 'Quantity must be a number' })
          .min(1, { message: 'Quantity must be at least 1' }),
      })
    )
    .min(1, { message: 'Cart items cannot be empty' }),
  status: z.enum(['pending', 'paid', 'failed'], { message: 'Invalid status' }),
});

const validateSponsorshipData = formData => {
  return sponsorshipValidationSchema.safeParse(formData);
};

export default validateSponsorshipData;

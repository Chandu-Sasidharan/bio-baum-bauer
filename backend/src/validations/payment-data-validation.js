import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// Zod validation schema
const paymentDataSchema = z.object({
  currency: z.string().length(3),
  taxRate: z.number().min(0).max(99),
  cartItems: z.array(
    z.object({
      treeId: z.string(),
      quantity: z.number().min(1),
    })
  ),
  email: z.string().email().optional(),
  firstName: z.string().trim().min(2).optional(),
  userId: z
    .string()
    .regex(objectIdRegex, { message: 'userId must be a valid ObjectId' })
    .optional(),
  isGuest: z.boolean(),
});

const validatePaymentData = paymentData => {
  return paymentDataSchema.safeParse(paymentData);
};

export default validatePaymentData;

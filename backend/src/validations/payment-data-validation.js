import { z } from 'zod';

// Zod validation schema
const paymentDataSchema = z.object({
  cartItems: z.array(
    z.object({
      treeId: z.string(),
      quantity: z.number().min(1),
    })
  ),
  email: z.string().email().optional(),
  isGuest: z.boolean(),
});

const validatePaymentData = paymentData => {
  return paymentDataSchema.safeParse(paymentData);
};

export default validatePaymentData;

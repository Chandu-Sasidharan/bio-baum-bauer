import { z } from 'zod';

export const requestPasswordResetSchema = z.object({
  email: z.string().email({ message: 'Email must be a valid email' }),
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  password: z
    .string()
    .min(5, { message: 'Password should have a minimum length of 5' })
    .max(128, { message: 'Password should have a maximum length of 128' }),
});

const authValidation = {
  requestPasswordResetSchema,
  resetPasswordSchema,
};

export default authValidation;

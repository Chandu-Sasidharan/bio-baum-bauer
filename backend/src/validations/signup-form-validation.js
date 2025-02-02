import { z } from 'zod';

// Zod validation schema
const signupFormValidationSchema = z.object({
  email: z
    .string({ message: 'Email must be a string' })
    .trim()
    .email({ message: 'Invalid Email' }),
  password: z
    .string({ message: 'Password must be a string' })
    .min(5, { message: 'Password should have a minimum length of 5' })
    .max(128, { message: 'Password should have a maximum length of 128' }),
});

const validateSignupFormData = formData => {
  return signupFormValidationSchema.safeParse(formData);
};

export default validateSignupFormData;

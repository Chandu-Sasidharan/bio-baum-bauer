import { z } from 'zod';

// Zod validation schema
const contactFormValidationSchema = z.object({
  userName: z
    .string({ message: 'User name must be a string' })
    .min(3, { message: 'User name should have a minimum length of 3' })
    .max(50, { message: 'User name should have a maximum length of 50' }),
  email: z
    .string({ message: 'Email must be a string' })
    .email({ message: 'Invalid Email' }),
  message: z
    .string({ message: 'Message must be a string' })
    .min(1, { message: 'Message is required' }),
  agreeToPolicies: z
    .boolean({ message: 'Agree to policies must be a boolean' })
    .refine(val => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
});

const validateContactFormData = formData => {
  return contactFormValidationSchema.safeParse(formData);
};

export default validateContactFormData;

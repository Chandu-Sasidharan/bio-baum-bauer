import { z } from 'zod';

// Zod validation schema for update form data
const updateFormDataSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, { message: 'First name should have a minimum length of 3' })
    .max(50, { message: 'First name should have a maximum length of 50' })
    .or(z.literal(''))
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(3, { message: 'Last name should have a minimum length of 3' })
    .max(50, { message: 'Last name should have a maximum length of 50' })
    .or(z.literal(''))
    .optional(),
  phoneNumber: z
    .string()
    .trim()
    .min(8, { message: 'Phone number should have a minimum length of 8' })
    .max(16, { message: 'Phone number should have a maximum length of 16' })
    .or(z.literal(''))
    .optional(),
  address: z
    .object({
      street: z
        .string()
        .trim()
        .min(3, { message: 'Street should have a minimum length of 3' })
        .max(50, { message: 'Street should have a maximum length of 50' })
        .or(z.literal(''))
        .optional(),
      houseNumber: z
        .string()
        .trim()
        .min(1, { message: 'House number should have a minimum length of 1' })
        .max(10, { message: 'House number should have a maximum length of 10' })
        .or(z.literal(''))
        .optional(),
      city: z
        .string()
        .trim()
        .min(3, { message: 'City should have a minimum length of 3' })
        .max(50, { message: 'City should have a maximum length of 50' })
        .or(z.literal(''))
        .optional(),
      country: z
        .string()
        .trim()
        .min(3, { message: 'Country should have a minimum length of 3' })
        .max(50, { message: 'Country should have a maximum length of 50' })
        .or(z.literal(''))
        .optional(),
      zipCode: z
        .string()
        .trim()
        .min(5, { message: 'Zip code should have a minimum length of 5' })
        .max(10, { message: 'Zip code should have a maximum length of 10' })
        .or(z.literal(''))
        .optional(),
    })
    .optional(),
});

const validateUpdateFormData = formData => {
  return updateFormDataSchema.safeParse(formData);
};

export default validateUpdateFormData;

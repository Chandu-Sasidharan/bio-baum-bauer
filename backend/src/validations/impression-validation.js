import { z } from 'zod';

// Zod validation schema for Impression
const impressionValidationSchema = z.object({
  title: z.string().trim(),
  imageUrl: z
    .string()
    .trim()
    .url({ message: 'Invalid URL format' })
    .nonempty({ message: 'Image URL is required' }),
});

const validateImpression = impression => {
  return impressionValidationSchema.safeParse(impression);
};

export default validateImpression;

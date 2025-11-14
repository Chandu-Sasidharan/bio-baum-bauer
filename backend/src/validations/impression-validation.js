import { z } from 'zod';

// Zod validation schema for Impression
const impressionValidationSchema = z.object({
  title: z.string().trim(),
  imageUrl: z.string().trim().url({ message: 'Invalid URL format' }).optional(),
  imageKey: z.string().trim().optional(),
  imageBucket: z.string().trim().optional(),
  imageFilename: z.string().trim().optional(),
  imageMimeType: z.string().trim().optional(),
  imageFilesize: z.number().min(0).optional(),
});

const validateImpression = impression => {
  return impressionValidationSchema.safeParse(impression);
};

export default validateImpression;

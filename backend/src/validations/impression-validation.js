import { z } from 'zod';

const localizedStringSchema = (fieldName = 'Field') =>
  z.object({
    en: z
      .string({ message: `${fieldName} (EN) must be a string` })
      .trim()
      .min(1, { message: `${fieldName} (EN) is required` }),
    de: z
      .string({ message: `${fieldName} (DE) must be a string` })
      .trim()
      .optional(),
  });

// Zod validation schema for Impression
const impressionValidationSchema = z.object({
  title: localizedStringSchema('Title'),
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

import { z } from 'zod';
import { CATEGORY_LABELS, STATUS_LABELS } from '#src/constants/i18n.js';

const allowedCategories = Object.keys(CATEGORY_LABELS);
const allowedStatuses = Object.keys(STATUS_LABELS);

const localizedStringSchema = (fieldName = 'Field') =>
  z.object({
    en: z
      .string({ message: `${fieldName} (EN) must be a string` })
      .trim()
      .nonempty({ message: `${fieldName} (EN) is required` }),
    de: z
      .string({ message: `${fieldName} (DE) must be a string` })
      .trim()
      .optional(),
  });

// Zod validation schema for Tree
const treeValidationSchema = z.object({
  name: localizedStringSchema('Name'),
  category: z
    .string()
    .nonempty({ message: 'Category is required' })
    .refine(val => allowedCategories.includes(val), {
      message: 'Invalid category',
    }),
  price: z
    .string()
    .nonempty({ message: 'Price is required' })
    .refine(val => !isNaN(parseFloat(val)), {
      message: 'Price must be a valid number',
    }),
  availableQuantity: z
    .number()
    .min(0, { message: 'Available quantity must be at least 0' }),
  shortDescription: localizedStringSchema('Short description'),
  description: localizedStringSchema('Description'),
  imageUrl: z.string().trim().url({ message: 'Invalid URL format' }).optional(),
  imageKey: z.string().trim().optional(),
  imageBucket: z.string().trim().optional(),
  imageFilename: z.string().trim().optional(),
  imageMimeType: z.string().trim().optional(),
  imageFilesize: z.number().min(0).optional(),
  status: z
    .string()
    .default('Available')
    .refine(val => allowedStatuses.includes(val), {
      message: 'Invalid status',
    }),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
});

const validateTree = tree => {
  return treeValidationSchema.safeParse(tree);
};

export default validateTree;

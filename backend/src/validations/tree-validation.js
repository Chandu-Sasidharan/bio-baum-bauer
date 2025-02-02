import { z } from 'zod';

// Zod validation schema for Tree
const treeValidationSchema = z.object({
  name: z.string().trim().nonempty({ message: 'Name is required' }),
  category: z
    .string()
    .nonempty({ message: 'Category is required' })
    .refine(
      val =>
        [
          'Fruit Tree',
          'Nut Tree',
          'Flowering Tree',
          'Berry Shrubs',
          'Deciduous Forest',
          'Evergreen Forest',
        ].includes(val),
      { message: 'Invalid category' }
    ),
  price: z
    .string()
    .nonempty({ message: 'Price is required' })
    .refine(val => !isNaN(parseFloat(val)), {
      message: 'Price must be a valid number',
    }),
  availableQuantity: z
    .number()
    .min(0, { message: 'Available quantity must be at least 0' }),
  shortDescription: z
    .string()
    .trim()
    .nonempty({ message: 'Short description is required' }),
  description: z
    .string()
    .trim()
    .nonempty({ message: 'Description is required' }),
  imageUrl: z
    .string()
    .trim()
    .nonempty({ message: 'Image URL is required' })
    .url({ message: 'Invalid URL format' }),
  status: z
    .string()
    .default('Available')
    .refine(val => ['Available', 'Sold Out', 'Backorder'].includes(val), {
      message: 'Invalid status',
    }),
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
});

const validateTree = tree => {
  return treeValidationSchema.safeParse(tree);
};

export default validateTree;

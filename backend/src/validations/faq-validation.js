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

// Zod validation schema
const faqValidationSchema = z.object({
  question: localizedStringSchema('Question'),
  answer: localizedStringSchema('Answer'),
});

const validateFaqData = formData => {
  return faqValidationSchema.safeParse(formData);
};

export default validateFaqData;

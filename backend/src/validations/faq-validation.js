import { z } from 'zod';

// Zod validation schema
const faqValidationSchema = z.object({
  question: z
    .string({ message: 'Question must be a string' })
    .trim()
    .min(1, { message: 'Question is required' }),
  answer: z
    .string({ message: 'Answers must be a string' })
    .trim()
    .min(1, { message: 'Answers are required' }),
});

const validateFaqData = formData => {
  return faqValidationSchema.safeParse(formData);
};

export default validateFaqData;

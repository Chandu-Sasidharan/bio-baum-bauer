import { describe, it, expect } from 'vitest';
import Faq from '../faq.js';
import validateFaqData from '#src/validations/faq-validation.js';

describe('Faq model', () => {
  it('provides the FAQ data validator', () => {
    expect(Faq.validateFaqData).toBe(validateFaqData);
    const result = Faq.validateFaqData({
      question: {
        en: 'What is Bio Baum Bauer?',
        de: 'Was ist Bio Baum Bauer?',
      },
      answer: { en: 'A project.', de: 'Ein Projekt.' },
    });
    expect(result.success).toBe(true);
  });
});

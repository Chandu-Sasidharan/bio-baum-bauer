import { describe, it, expect } from 'vitest';
import Impression from '../impression.js';
import validateImpression from '#src/validations/impression-validation.js';

describe('Impression model', () => {
  it('exposes the impression validator', () => {
    expect(Impression.validateImpression).toBe(validateImpression);
    const result = Impression.validateImpression({
      title: 'Great experience',
      imageUrl: 'https://example.com/image.png',
    });
    expect(result.success).toBe(true);
  });
});

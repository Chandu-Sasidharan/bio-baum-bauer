import { describe, it, expect } from 'vitest';
import Contact from '../contact.js';
import validateContactFormData from '#src/validations/contact-form-validation.js';

describe('Contact model', () => {
  it('exposes the contact form validator', () => {
    expect(Contact.validateFormData).toBe(validateContactFormData);
    const sample = {
      userName: 'Test User',
      email: 'user@example.com',
      message: 'Hello',
      agreeToPolicies: true,
    };
    expect(Contact.validateFormData(sample).success).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import Sponsorship from '../sponsorship.js';
import validateSponsorship from '#src/validations/sponsorship-validation.js';

describe('Sponsorship model', () => {
  it('exposes the sponsorship validator', () => {
    expect(Sponsorship.validateSponsorship).toBe(validateSponsorship);
    const result = Sponsorship.validateSponsorship({
      email: 'sponsor@example.com',
      isGuest: true,
      amount: 1000,
      currency: 'eur',
      taxRate: 0.2,
      cartItems: [{ treeId: '655f1f77bcf86cd799439011', quantity: 1 }],
    });
    expect(result.success).toBe(true);
  });
});

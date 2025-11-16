import { describe, it, expect } from 'vitest';
import User from '../user.js';
import validateUser from '#src/validations/user-validation.js';
import validateSignupFormData from '#src/validations/signup-form-validation.js';
import validateUpdateFormData from '#src/validations/update-form-validation.js';

describe('User model', () => {
  it('provides access to the validation helpers', () => {
    expect(User.validateUser).toBe(validateUser);
    expect(User.validateSignupFormData).toBe(validateSignupFormData);
    expect(User.validateUpdateFormData).toBe(validateUpdateFormData);
  });

  it('applies schema defaults for avatarUrl and deletedAt', () => {
    const user = new User({
      email: 'user@example.com',
      password: 'secret',
      isVerified: true,
    });

    expect(user.avatarUrl).toBe('dummy');
    expect(user.deletedAt).toBeNull();
  });
});

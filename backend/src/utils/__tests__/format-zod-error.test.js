import { describe, it, expect } from 'vitest';
import formatZodError from '../format-zod-error.js';

describe('formatZodError', () => {
  it('maps zod issues to flat field/message pairs', () => {
    const zodError = {
      errors: [
        { path: ['user', 'email'], message: 'Invalid email' },
        { path: ['password'], message: 'Too short' },
      ],
    };

    const result = formatZodError(zodError);

    expect(result).toEqual([
      { field: 'user.email', message: 'Invalid email' },
      { field: 'password', message: 'Too short' },
    ]);
  });
});

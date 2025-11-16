import { describe, it, expect } from 'vitest';
import formatError from '../format-error.js';

describe('formatError utility', () => {
  it('returns a generic fallback when there is no response object', () => {
    expect(formatError({})).toBe('Something went wrong!');
  });

  it('renders zod errors as an unordered list', () => {
    const error = {
      response: {
        status: 400,
        data: {
          errors: [
            { message: 'Email is required' },
            { message: 'Password is required' },
          ],
        },
      },
    };

    expect(formatError(error)).toBe(
      '<ul><li>Email is required</li><li>Password is required</li></ul>',
    );
  });

  it('uses the server-provided message when available', () => {
    const error = {
      response: {
        status: 500,
        data: {
          message: 'Custom error',
        },
      },
    };

    expect(formatError(error)).toBe('Custom error');
  });
});

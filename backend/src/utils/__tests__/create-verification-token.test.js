import { describe, it, expect } from 'vitest';
import createVerificationToken from '../create-verification-token.js';

describe('createVerificationToken', () => {
  it('returns a 64-character hex string', () => {
    const token = createVerificationToken();

    expect(token).toMatch(/^[a-f0-9]{64}$/);
  });

  it('generates different tokens for subsequent calls', () => {
    const tokenA = createVerificationToken();
    const tokenB = createVerificationToken();

    expect(tokenA).not.toEqual(tokenB);
  });
});

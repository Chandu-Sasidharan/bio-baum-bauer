import { describe, it, expect, vi, afterEach } from 'vitest';
import jwt from 'jsonwebtoken';
import createJwt from '../create-jwt.js';

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn(),
  },
}));

describe('createJwt utility', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  it('signs a token with the whitelisted payload fields', () => {
    vi.stubEnv('JWT_SECRET_KEY', 'secret');
    jwt.sign.mockReturnValueOnce('signed-token');
    const user = {
      _id: '1',
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@example.com',
      isAdmin: true,
      isSuperAdmin: false,
      isVerified: true,
      password: 'hidden',
    };

    const token = createJwt(user);

    expect(jwt.sign).toHaveBeenCalledWith(
      {
        _id: '1',
        firstName: 'Ada',
        lastName: 'Lovelace',
        email: 'ada@example.com',
        isAdmin: true,
        isSuperAdmin: false,
        isVerified: true,
      },
      'secret',
      { expiresIn: '1d' }
    );
    expect(token).toBe('signed-token');
  });
});

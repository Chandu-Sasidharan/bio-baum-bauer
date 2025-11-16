import { describe, it, expect } from 'vitest';
import pickUserPayload from '../pick-user-payload.js';

describe('pickUserPayload', () => {
  it('returns only the whitelisted public fields', () => {
    const user = {
      id: 'user-1',
      firstName: 'Ada',
      lastName: 'Lovelace',
      address: { city: 'London' },
      email: 'ada@example.com',
      phoneNumber: '123',
      avatarUrl: 'avatar.png',
      isAdmin: true,
      isSuperAdmin: false,
      deletedAt: null,
      password: 'secret',
      tokens: [],
    };

    const payload = pickUserPayload(user);

    expect(payload).toEqual({
      id: 'user-1',
      firstName: 'Ada',
      lastName: 'Lovelace',
      address: { city: 'London' },
      email: 'ada@example.com',
      phoneNumber: '123',
      avatarUrl: 'avatar.png',
      isAdmin: true,
      isSuperAdmin: false,
      deletedAt: null,
    });
    expect(payload.password).toBeUndefined();
  });
});

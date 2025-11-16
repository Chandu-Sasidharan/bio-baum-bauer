import { describe, it, expect } from 'vitest';
import Admin from '../admin.js';

describe('Admin model', () => {
  it('defaults privilege flags to false', () => {
    const admin = new Admin({
      name: 'Alice',
      email: 'ADMIN@example.com',
      password: 'secret',
    });

    expect(admin.isAdmin).toBe(false);
    expect(admin.isSuperAdmin).toBe(false);
  });
});

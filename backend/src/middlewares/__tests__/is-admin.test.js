import { describe, it, expect, vi } from 'vitest';
import { StatusCodes } from 'http-status-codes';
import isAdmin from '../is-admin.js';

const createMockResponse = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

const expectJsonMessage = (res, regex) => {
  expect(res.json).toHaveBeenCalledWith({
    message: expect.stringMatching(regex),
  });
};

describe('isAdmin middleware', () => {
  it('rejects users without admin privileges', () => {
    const req = { user: { isAdmin: false, isSuperAdmin: false } };
    const res = createMockResponse();
    const next = vi.fn();

    isAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.FORBIDDEN);
    expectJsonMessage(res, /Access denied/i);
    expect(next).not.toHaveBeenCalled();
  });

  it('allows admin users through', () => {
    const req = { user: { isAdmin: true, isSuperAdmin: false } };
    const res = createMockResponse();
    const next = vi.fn();

    isAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('allows super admins even if isAdmin is false', () => {
    const req = { user: { isAdmin: false, isSuperAdmin: true } };
    const res = createMockResponse();
    const next = vi.fn();

    isAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

import { describe, it, expect, vi } from 'vitest';
import { StatusCodes } from 'http-status-codes';
import isSuperAdmin from '../is-super-admin.js';

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

describe('isSuperAdmin middleware', () => {
  it('rejects users without super admin privileges', () => {
    const req = { user: { isSuperAdmin: false } };
    const res = createMockResponse();
    const next = vi.fn();

    isSuperAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.FORBIDDEN);
    expectJsonMessage(res, /Access denied/i);
    expect(next).not.toHaveBeenCalled();
  });

  it('allows super admin users through', () => {
    const req = { user: { isSuperAdmin: true } };
    const res = createMockResponse();
    const next = vi.fn();

    isSuperAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

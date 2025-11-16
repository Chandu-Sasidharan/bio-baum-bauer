import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import isAuthenticated from '../is-authenticated.js';

vi.mock('jsonwebtoken', () => ({
  default: {
    verify: vi.fn(),
  },
}));

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

describe('isAuthenticated middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('rejects requests without a jwt cookie', () => {
    const req = { cookies: {} };
    const res = createMockResponse();
    const next = vi.fn();

    isAuthenticated(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
    expectJsonMessage(res, /No token provided/i);
    expect(next).not.toHaveBeenCalled();
  });

  it('rejects invalid tokens from jwt.verify', () => {
    const req = { cookies: { jwt: 'invalid' } };
    const res = createMockResponse();
    const next = vi.fn();
    jwt.verify.mockImplementationOnce(() => {
      throw new Error('bad token');
    });

    isAuthenticated(req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
    expectJsonMessage(res, /Invalid token/i);
    expect(next).not.toHaveBeenCalled();
  });

  it('attaches the decoded user and calls next when the token is valid', () => {
    const decoded = { _id: 'user-1' };
    jwt.verify.mockReturnValueOnce(decoded);
    const req = { cookies: { jwt: 'valid' } };
    const res = createMockResponse();
    const next = vi.fn();

    isAuthenticated(req, res, next);

    expect(req.user).toEqual(decoded);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});

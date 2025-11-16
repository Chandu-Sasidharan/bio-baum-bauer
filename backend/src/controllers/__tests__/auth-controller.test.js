import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StatusCodes } from 'http-status-codes';
import User from '#src/models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createJwt from '#src/utils/create-jwt.js';
import createVerificationToken from '#src/utils/create-verification-token.js';
import formatZodError from '#src/utils/format-zod-error.js';
import pickUserPayload from '#src/utils/pick-user-payload.js';
import sendVerificationEmail from '#src/utils/send-verification-email.js';
import sendPasswordResetEmail from '#src/utils/send-password-reset-email.js';
import {
  requestPasswordResetSchema,
  resetPasswordSchema,
} from '#src/validations/auth-validation.js';
import {
  loginUser,
  refreshToken,
  signUp,
  confirmAccount,
  requestPasswordReset,
  resetPassword,
  logoutUser,
} from '../auth-controller.js';

vi.mock('#src/models/user.js', () => ({
  default: {
    findOne: vi.fn(),
    findById: vi.fn(),
    updateOne: vi.fn(),
    create: vi.fn(),
    validateSignupFormData: vi.fn(),
  },
}));

vi.mock('bcryptjs', () => ({
  default: {
    compare: vi.fn(),
    genSalt: vi.fn(),
    hash: vi.fn(),
  },
}));

vi.mock('jsonwebtoken', () => ({
  default: {
    verify: vi.fn(),
  },
}));

vi.mock('#src/utils/create-jwt.js', () => ({
  default: vi.fn(),
}));

vi.mock('#src/utils/pick-user-payload.js', () => ({
  default: vi.fn(),
}));

vi.mock('#src/utils/send-verification-email.js', () => ({
  default: vi.fn(),
}));

vi.mock('#src/utils/send-password-reset-email.js', () => ({
  default: vi.fn(),
}));

vi.mock('#src/utils/create-verification-token.js', () => ({
  default: vi.fn(),
}));

vi.mock('#src/utils/format-zod-error.js', () => ({
  default: vi.fn(),
}));

vi.mock('#src/validations/auth-validation.js', () => ({
  requestPasswordResetSchema: {
    safeParse: vi.fn(),
  },
  resetPasswordSchema: {
    safeParse: vi.fn(),
  },
}));

const createMockResponse = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.cookie = vi.fn().mockReturnValue(res);
  res.clearCookie = vi.fn().mockReturnValue(res);
  return res;
};

const expectJsonMessage = (res, regex, extra = {}) => {
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      message: expect.stringMatching(regex),
      ...extra,
    })
  );
};

describe('auth controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('loginUser', () => {
    it('responds with unauthorized when the user does not exist', async () => {
      User.findOne.mockResolvedValueOnce(null);
      const req = {
        body: {
          email: 'missing@example.com',
          password: 'secret',
        },
      };
      const res = createMockResponse();
      const next = vi.fn();

      await loginUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
      expectJsonMessage(res, /Email or password does not match/i);
      expect(next).not.toHaveBeenCalled();
    });

    it('sets a secure cookie and returns the public user payload on success', async () => {
      const fakeUser = {
        _id: 'abc',
        password: 'hashed',
        email: 'user@test.io',
      };
      User.findOne.mockResolvedValueOnce(fakeUser);
      bcrypt.compare.mockResolvedValueOnce(true);
      createJwt.mockReturnValueOnce('jwt-token');
      const publicPayload = { _id: 'abc', email: fakeUser.email };
      pickUserPayload.mockReturnValueOnce(publicPayload);

      const req = {
        body: {
          email: fakeUser.email,
          password: 'correct-password',
        },
      };
      const res = createMockResponse();
      const next = vi.fn();

      await loginUser(req, res, next);

      expect(res.cookie).toHaveBeenCalledWith(
        'jwt',
        'jwt-token',
        expect.objectContaining({
          httpOnly: true,
          sameSite: 'lax',
        })
      );
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expectJsonMessage(res, /Logged in successfully/i, {
        user: publicPayload,
      });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('refreshToken', () => {
    it('rejects requests without a token cookie', async () => {
      const req = { cookies: {} };
      const res = createMockResponse();
      const next = vi.fn();

      await refreshToken(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
      expectJsonMessage(res, /No token provided/i);
      expect(next).not.toHaveBeenCalled();
    });

    it('clears the cookie when verification fails', async () => {
      const req = { cookies: { jwt: 'bad-token' } };
      const res = createMockResponse();
      const next = vi.fn();

      const error = new Error('bad token');
      error.name = 'JsonWebTokenError';
      jwt.verify.mockImplementationOnce(() => {
        throw error;
      });

      await refreshToken(req, res, next);

      expect(res.clearCookie).toHaveBeenCalledWith(
        'jwt',
        expect.objectContaining({
          httpOnly: true,
          sameSite: 'lax',
        })
      );
      expect(res.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED);
      expectJsonMessage(res, /Invalid or expired token/i);
    });

    it('issues a new cookie when the original token is valid', async () => {
      const req = { cookies: { jwt: 'old-token' } };
      const res = createMockResponse();
      const next = vi.fn();
      const user = { _id: '123', email: 'verified@example.com' };

      jwt.verify.mockReturnValueOnce({ _id: '123' });
      User.findById.mockResolvedValueOnce(user);
      createJwt.mockReturnValueOnce('new-token');

      await refreshToken(req, res, next);

      expect(res.cookie).toHaveBeenLastCalledWith(
        'jwt',
        'new-token',
        expect.objectContaining({
          httpOnly: true,
          sameSite: 'lax',
        })
      );
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expectJsonMessage(res, /Token refreshed successfully/i);
    });
  });

  describe('signUp', () => {
    it('returns validation errors when the payload fails schema validation', async () => {
      User.validateSignupFormData.mockReturnValueOnce({
        success: false,
        error: 'zod-error',
      });
      const formattedErrors = [{ path: 'email', message: 'Invalid email' }];
      formatZodError.mockReturnValueOnce(formattedErrors);
      const req = {
        body: { email: 'not-an-email', password: 'short' },
      };
      const res = createMockResponse();

      await signUp(req, res, vi.fn());

      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({ errors: formattedErrors });
      expect(User.create).not.toHaveBeenCalled();
      expect(sendVerificationEmail).not.toHaveBeenCalled();
    });

    it('prevents verified users from registering again with the same email', async () => {
      User.validateSignupFormData.mockReturnValueOnce({ success: true });
      User.findOne.mockResolvedValueOnce({
        deletedAt: null,
        isVerified: true,
      });
      const req = {
        body: { email: 'taken@example.com', password: 'secret' },
      };
      const res = createMockResponse();

      await signUp(req, res, vi.fn());

      expect(res.status).toHaveBeenCalledWith(StatusCodes.CONFLICT);
      expectJsonMessage(res, /Email already exists/i);
      expect(sendVerificationEmail).not.toHaveBeenCalled();
    });

    it('creates a new user record and sends a verification email', async () => {
      User.validateSignupFormData.mockReturnValueOnce({ success: true });
      User.findOne.mockResolvedValueOnce(null);
      bcrypt.genSalt.mockResolvedValueOnce('salt');
      bcrypt.hash.mockResolvedValueOnce('hashed-password');
      createVerificationToken.mockReturnValueOnce('verify-token');
      const req = {
        body: { email: 'new@example.com', password: 'strong-pass' },
      };
      const res = createMockResponse();

      await signUp(req, res, vi.fn());

      expect(User.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'new@example.com',
          password: 'hashed-password',
          verificationToken: 'verify-token',
          isVerified: false,
        })
      );
      expect(sendVerificationEmail).toHaveBeenCalledWith(
        'new@example.com',
        'verify-token'
      );
      expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
      expectJsonMessage(res, /Please check your inbox/i);
    });
  });

  describe('confirmAccount', () => {
    it('returns not found when the verification token does not match any user', async () => {
      User.findOne.mockResolvedValueOnce(null);
      const req = { body: { token: 'missing' } };
      const res = createMockResponse();

      await confirmAccount(req, res, vi.fn());

      expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
      expectJsonMessage(res, /Invalid or expired verification token/i);
    });

    it('rejects confirmation attempts for already verified accounts', async () => {
      User.findOne.mockResolvedValueOnce({
        _id: 'user-1',
        isVerified: true,
      });
      const req = { body: { token: 'already' } };
      const res = createMockResponse();

      await confirmAccount(req, res, vi.fn());

      expect(res.status).toHaveBeenCalledWith(StatusCodes.CONFLICT);
      expectJsonMessage(res, /Account already confirmed/i);
      expect(User.updateOne).not.toHaveBeenCalled();
    });

    it('marks the user verified and returns a new session cookie', async () => {
      const user = { _id: 'verified', isVerified: false, deletedAt: null };
      User.findOne.mockResolvedValueOnce(user);
      User.findById.mockResolvedValueOnce({
        _id: user._id,
        email: 'verified@example.com',
        isVerified: true,
      });
      createJwt.mockReturnValueOnce('jwt-token');
      const req = { body: { token: 'valid-token' } };
      const res = createMockResponse();

      await confirmAccount(req, res, vi.fn());

      expect(User.updateOne).toHaveBeenCalledWith(
        { _id: user._id },
        expect.objectContaining({
          isVerified: true,
          verificationToken: null,
          verificationTokenExpiresAt: null,
        })
      );
      expect(res.cookie).toHaveBeenCalledWith(
        'jwt',
        'jwt-token',
        expect.objectContaining({
          httpOnly: true,
          sameSite: 'lax',
        })
      );
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expectJsonMessage(res, /Account Confirmed/i, {
        user: {
          _id: 'verified',
          email: 'verified@example.com',
          isVerified: true,
        },
      });
    });
  });

  describe('requestPasswordReset', () => {
    it('returns validation errors when the email payload is invalid', async () => {
      requestPasswordResetSchema.safeParse.mockReturnValueOnce({
        success: false,
        error: 'zod-error',
      });
      const formattedErrors = { email: 'required' };
      formatZodError.mockReturnValueOnce(formattedErrors);
      const req = { body: { email: '' } };
      const res = createMockResponse();

      await requestPasswordReset(req, res, vi.fn());

      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({ errors: formattedErrors });
    });

    it('responds with a generic success message even when the email is unknown', async () => {
      requestPasswordResetSchema.safeParse.mockReturnValueOnce({
        success: true,
        data: { email: 'missing@example.com' },
      });
      User.findOne.mockResolvedValueOnce(null);
      const req = { body: { email: 'missing@example.com' } };
      const res = createMockResponse();

      await requestPasswordReset(req, res, vi.fn());

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expectJsonMessage(res, /If that email is registered/i);
      expect(sendPasswordResetEmail).not.toHaveBeenCalled();
    });

    it('generates a reset token and notifies the user when the address exists', async () => {
      requestPasswordResetSchema.safeParse.mockReturnValueOnce({
        success: true,
        data: { email: 'user@example.com' },
      });
      const user = {
        email: 'user@example.com',
        passwordResetToken: null,
        passwordResetTokenExpiresAt: null,
        save: vi.fn(),
      };
      User.findOne.mockResolvedValueOnce(user);
      createVerificationToken.mockReturnValueOnce('reset-token');
      const req = { body: { email: 'user@example.com' } };
      const res = createMockResponse();

      await requestPasswordReset(req, res, vi.fn());

      expect(user.passwordResetToken).toBe('reset-token');
      expect(user.passwordResetTokenExpiresAt).toBeGreaterThan(Date.now());
      expect(user.save).toHaveBeenCalled();
      expect(sendPasswordResetEmail).toHaveBeenCalledWith(
        'user@example.com',
        'reset-token'
      );
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expectJsonMessage(res, /If that email is registered/i);
    });
  });

  describe('resetPassword', () => {
    it('returns validation errors when the payload is invalid', async () => {
      resetPasswordSchema.safeParse.mockReturnValueOnce({
        success: false,
        error: 'zod-error',
      });
      const formattedErrors = { password: 'too short' };
      formatZodError.mockReturnValueOnce(formattedErrors);
      const req = { body: { token: '', password: '' } };
      const res = createMockResponse();

      await resetPassword(req, res, vi.fn());

      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({ errors: formattedErrors });
    });

    it('returns not found when the reset token is invalid or expired', async () => {
      resetPasswordSchema.safeParse.mockReturnValueOnce({
        success: true,
        data: { token: 'invalid', password: 'Password123!' },
      });
      User.findOne.mockResolvedValueOnce(null);
      const req = { body: { token: 'invalid', password: 'Password123!' } };
      const res = createMockResponse();

      await resetPassword(req, res, vi.fn());

      expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
      expectJsonMessage(res, /Invalid or expired password reset token/i);
    });

    it('updates the password and clears reset tokens when the payload is valid', async () => {
      resetPasswordSchema.safeParse.mockReturnValueOnce({
        success: true,
        data: { token: 'valid-token', password: 'NewPassword!1' },
      });
      const user = {
        password: 'old',
        passwordResetToken: 'valid-token',
        passwordResetTokenExpiresAt: Date.now() + 1000,
        isVerified: true,
        deletedAt: null,
        save: vi.fn(),
      };
      User.findOne.mockResolvedValueOnce(user);
      bcrypt.genSalt.mockResolvedValueOnce('salt');
      bcrypt.hash.mockResolvedValueOnce('hashed-new-password');
      const req = {
        body: { token: 'valid-token', password: 'NewPassword!1' },
      };
      const res = createMockResponse();

      await resetPassword(req, res, vi.fn());

      expect(user.password).toBe('hashed-new-password');
      expect(user.passwordResetToken).toBeNull();
      expect(user.passwordResetTokenExpiresAt).toBeNull();
      expect(user.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expectJsonMessage(
        res,
        /Password updated successfully. Please log in with your new password/i
      );
    });
  });

  describe('logoutUser', () => {
    it('clears the jwt cookie and returns a confirmation message', async () => {
      const res = createMockResponse();

      await logoutUser({}, res);

      expect(res.clearCookie).toHaveBeenCalledWith(
        'jwt',
        expect.objectContaining({
          httpOnly: true,
          sameSite: 'lax',
        })
      );
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expectJsonMessage(res, /User logged out/i);
    });
  });
});

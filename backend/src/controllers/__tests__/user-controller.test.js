import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StatusCodes } from 'http-status-codes';
import formatZodError from '#src/utils/format-zod-error.js';
import pickUserPayload from '#src/utils/pick-user-payload.js';
import User from '#src/models/user.js';
import { updateUser } from '../user-controller.js';

vi.mock('#src/utils/format-zod-error.js', () => ({
  default: vi.fn(),
}));

vi.mock('#src/utils/pick-user-payload.js', () => ({
  default: vi.fn(),
}));

vi.mock('#src/models/user.js', () => ({
  default: {
    validateUpdateFormData: vi.fn(),
    findById: vi.fn(),
    findByIdAndUpdate: vi.fn(),
  },
}));

const createMockResponse = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
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

describe('user controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('updateUser', () => {
    it('returns validation errors when the payload is invalid', async () => {
      User.validateUpdateFormData.mockReturnValueOnce({
        success: false,
        error: 'zod-error',
      });
      const formattedErrors = { firstName: 'required' };
      formatZodError.mockReturnValueOnce(formattedErrors);
      const req = { body: {}, user: { _id: 'user-1' } };
      const res = createMockResponse();

      await updateUser(req, res, vi.fn());

      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({ errors: formattedErrors });
      expect(User.findById).not.toHaveBeenCalled();
    });

    it('returns not found when the user no longer exists', async () => {
      User.validateUpdateFormData.mockReturnValueOnce({
        success: true,
        data: { firstName: 'New' },
      });
      User.findById.mockResolvedValueOnce(null);
      const req = { body: { firstName: 'New' }, user: { _id: 'user-1' } };
      const res = createMockResponse();

      await updateUser(req, res, vi.fn());

      expect(User.findById).toHaveBeenCalledWith('user-1');
      expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
      expectJsonMessage(res, /User not found/i);
    });

    it('updates the user and returns the public payload when validation passes', async () => {
      User.validateUpdateFormData.mockReturnValueOnce({
        success: true,
        data: { firstName: 'Updated' },
      });
      User.findById.mockResolvedValueOnce({ _id: 'user-1' });
      const updatedUser = { _id: 'user-1', firstName: 'Updated' };
      User.findByIdAndUpdate.mockResolvedValueOnce(updatedUser);
      const userPayload = { id: 'user-1', firstName: 'Updated' };
      pickUserPayload.mockReturnValueOnce(userPayload);
      const req = { body: { firstName: 'Updated' }, user: { _id: 'user-1' } };
      const res = createMockResponse();

      await updateUser(req, res, vi.fn());

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        'user-1',
        { firstName: 'Updated' },
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({
        user: userPayload,
        message: 'User updated',
      });
    });
  });
});

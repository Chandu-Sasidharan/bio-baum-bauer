import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StatusCodes } from 'http-status-codes';
import Contact from '#src/models/contact.js';
import formatZodError from '#src/utils/format-zod-error.js';
import sendContactFeedback from '#src/utils/contact-feedback-email.js';
import sendContactToTeam from '#src/utils/contact-to-team-email.js';
import { createContact } from '../contact-controller.js';

vi.mock('#src/models/contact.js', () => ({
  default: {
    validateFormData: vi.fn(),
    create: vi.fn(),
  },
}));

vi.mock('#src/utils/format-zod-error.js', () => ({
  default: vi.fn(),
}));

vi.mock('#src/utils/contact-feedback-email.js', () => ({
  default: vi.fn(),
}));

vi.mock('#src/utils/contact-to-team-email.js', () => ({
  default: vi.fn(),
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

describe('contact controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createContact', () => {
    it('returns validation errors when the payload is invalid', async () => {
      Contact.validateFormData.mockReturnValueOnce({
        success: false,
        error: 'zod-error',
      });
      const formattedErrors = { email: 'invalid' };
      formatZodError.mockReturnValueOnce(formattedErrors);
      const req = { body: { email: 'bad', message: '' } };
      const res = createMockResponse();

      await createContact(req, res, vi.fn());

      expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({ errors: formattedErrors });
      expect(Contact.create).not.toHaveBeenCalled();
      expect(sendContactFeedback).not.toHaveBeenCalled();
      expect(sendContactToTeam).not.toHaveBeenCalled();
    });

    it('persists the contact message and sends notifications', async () => {
      Contact.validateFormData.mockReturnValueOnce({ success: true });
      const formData = {
        email: 'friend@example.com',
        userName: 'Friendly Tree',
        message: 'Hello!',
      };
      const req = { body: formData };
      const res = createMockResponse();

      await createContact(req, res, vi.fn());

      expect(Contact.create).toHaveBeenCalledWith(formData);
      expect(sendContactFeedback).toHaveBeenCalledWith(
        formData.email,
        formData.message
      );
      expect(sendContactToTeam).toHaveBeenCalledWith(
        formData.email,
        formData.userName,
        formData.message
      );
      expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
      expectJsonMessage(res, /We have received your message/i);
    });
  });
});

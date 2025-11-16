import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import sendVerificationEmail from '../send-verification-email.js';
import sendPasswordResetEmail from '../send-password-reset-email.js';
import sendContactFeedback from '../contact-feedback-email.js';
import sendContactToTeam from '../contact-to-team-email.js';
import sendNewSponsorshipEmail from '../send-new-sponsorship-email.js';
import sendPaymemtSucceededEmail from '../send-payment-succeeded-email.js';
import sendPaymentFailedEmail from '../send-payment-failed-email.js';

vi.mock('#src/utils/send-email.js', () => {
  return {
    default: vi.fn(),
  };
});

const mockedSendEmail = (await import('#src/utils/send-email.js')).default;

describe('email helper utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('FRONTEND_URL', 'https://frontend.example.com');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('sends verification emails with the confirmation link', async () => {
    await sendVerificationEmail('user@example.com', 'token-123');

    expect(mockedSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'user@example.com',
        templateName: 'verification-email',
        templateData: {
          verificationLink:
            'https://frontend.example.com/confirm-account?token=token-123',
        },
      })
    );
  });

  it('sends password reset emails with reset link', async () => {
    await sendPasswordResetEmail('user@example.com', 'reset-123');

    expect(mockedSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'user@example.com',
        templateName: 'password-reset-email',
        templateData: {
          resetLink:
            'https://frontend.example.com/reset-password?token=reset-123',
        },
      })
    );
  });

  it('sends contact feedback emails to the requester', async () => {
    await sendContactFeedback('friend@example.com', 'Hello!');

    expect(mockedSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'friend@example.com',
        templateName: 'contact-form-feedback',
        templateData: {
          message: 'Hello!',
        },
      })
    );
  });

  it('notifies the team when a contact form is submitted', async () => {
    await sendContactToTeam('friend@example.com', 'Friendly', 'Hello!');

    expect(mockedSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'hello@biobaumbauer.de',
        templateName: 'contact-form-to-team',
        templateData: {
          userName: 'Friendly',
          message: 'Hello!',
        },
      })
    );
  });

  it('sends the new sponsorship email to the team', async () => {
    await sendNewSponsorshipEmail({ amount: 1000 });

    expect(mockedSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'hello@biobaumbauer.de',
        templateName: 'new-sponsorship',
        templateData: { amount: 1000 },
      })
    );
  });

  it('informs the sponsor about successful payments', async () => {
    await sendPaymemtSucceededEmail({
      email: 'user@example.com',
      amount: 1000,
    });

    expect(mockedSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'user@example.com',
        templateName: 'payment-succeeded',
        templateData: expect.objectContaining({ amount: 1000 }),
      })
    );
  });

  it('notifies the sponsor when payment fails', async () => {
    await sendPaymentFailedEmail({ email: 'user@example.com', amount: 1000 });

    expect(mockedSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'user@example.com',
        templateName: 'payment-failed',
        templateData: expect.objectContaining({ amount: 1000 }),
      })
    );
  });
});

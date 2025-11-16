import { describe, it, expect, vi, beforeEach } from 'vitest';

const sendMock = vi.hoisted(() => vi.fn());
const readFileSyncMock = vi.hoisted(() => vi.fn(() => '<p>Hello {{name}}</p>'));
const ResendMock = vi.hoisted(() =>
  vi.fn(function Resend() {
    this.emails = {
      send: sendMock,
    };
  })
);

vi.mock('resend', () => ({
  Resend: ResendMock,
}));

vi.mock('fs', () => ({
  default: {
    readFileSync: readFileSyncMock,
  },
}));

describe('sendEmail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  const loadModule = async () => {
    vi.resetModules();
    vi.stubEnv('RESEND_API_KEY', 'test-key');
    const module = await import('../send-email.js');
    return module.default;
  };

  it('renders the template and forwards the payload to Resend', async () => {
    const sendEmail = await loadModule();

    await sendEmail({
      templateName: 'welcome',
      templateData: { name: 'Ada' },
      to: 'ada@example.com',
      subject: 'Hi there',
    });

    expect(readFileSyncMock).toHaveBeenCalledWith(
      expect.stringContaining('templates/welcome.html'),
      'utf8'
    );
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'ada@example.com',
        subject: 'Hi there',
        html: expect.stringContaining('Ada'),
      })
    );
  });

  it('surfaces errors from the resend client', async () => {
    const sendEmail = await loadModule();
    sendMock.mockRejectedValueOnce(new Error('network'));

    await expect(
      sendEmail({
        templateName: 'welcome',
        templateData: {},
        to: 'ada@example.com',
        subject: 'Hi',
      })
    ).rejects.toThrow('network');
  });
});

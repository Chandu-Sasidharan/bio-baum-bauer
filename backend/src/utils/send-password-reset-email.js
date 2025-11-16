import sendEmail from '#src/utils/send-email.js';

const sendPasswordResetEmail = async (email, passwordResetToken) => {
  const frontEndUrl = process.env.FRONTEND_URL;
  const resetLink = `${frontEndUrl}/reset-password?token=${passwordResetToken}`;

  const emailOptions = {
    from: 'Team BioBaumBauer <hello@biobaumbauer.de>',
    replyTo: 'hello@biobaumbauer.de',
    to: email,
    subject: 'Reset your BioBaumBauer password',
    templateName: 'password-reset-email',
    templateData: {
      resetLink,
    },
  };

  await sendEmail(emailOptions);
};

export default sendPasswordResetEmail;

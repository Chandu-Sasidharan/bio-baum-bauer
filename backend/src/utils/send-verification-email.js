import sendEmail from '#src/utils/send-email.js';

const sendVerificationEmail = async (email, verificationToken) => {
  const frontEndUrl = process.env.FRONTEND_URL;
  const verificationLink = `${frontEndUrl}/confirm-account?token=${verificationToken}`;

  const emailOptions = {
    from: 'Team BioBaumBauer <hello@biobaumbauer.de>',
    replyTo: 'hello@biobaumbauer.de',
    to: email,
    subject: 'Confirm your BioBaumBauer account',
    templateName: 'verification-email',
    templateData: {
      verificationLink,
    },
  };

  await sendEmail(emailOptions);
};

export default sendVerificationEmail;

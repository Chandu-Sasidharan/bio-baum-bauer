import sendEmail from '#src/utils/send-email.js';

const sendPaymentFailedEmail = async sponsorshipData => {
  const emailOptions = {
    from: 'Team BioBaumBauer <hello@biobaumbauer.de>',
    replyTo: 'hello@biobaumbauer.de',
    to: sponsorshipData.email,
    subject: 'Payment Failed',
    templateName: 'payment-failed',
    templateData: {
      sponsorshipData,
    },
  };

  await sendEmail(emailOptions);
};

export default sendPaymentFailedEmail;

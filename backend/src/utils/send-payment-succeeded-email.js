import sendEmail from '#src/utils/send-email.js';

const sendPaymemtSucceededEmail = async sponsorshipData => {
  const emailOptions = {
    from: 'Team BioBaumBauer <hello@biobaumbauer.de>',
    replyTo: 'hello@biobaumbauer.de',
    to: sponsorshipData.email,
    subject: 'Payment Confirmation',
    templateName: 'payment-succeeded',
    templateData: {
      ...sponsorshipData,
    },
  };

  await sendEmail(emailOptions);
};

export default sendPaymemtSucceededEmail;

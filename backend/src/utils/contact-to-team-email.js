import sendEmail from '#src/utils/send-email.js';

const sendContactToTeam = async (email, userName, message) => {
  const emailOptions = {
    from: 'Contact Form Submission <contact-form-submission@biobaumbauer.de>',
    replyTo: email,
    to: 'hello@biobaumbauer.de',
    subject: 'New Contact Form Submission',
    templateName: 'contact-form-to-team',
    templateData: {
      userName,
      message,
    },
  };

  await sendEmail(emailOptions);
};

export default sendContactToTeam;

import sendEmail from '#src/utils/send-email.js';

const sendContactFeedback = async (email, message) => {
  const emailOptions = {
    from: 'Team BioBaumBauer <hello@biobaumbauer.de>',
    replyTo: 'hello@biobaumbauer.de',
    to: email,
    subject: 'Thank you for contacting us!',
    templateName: 'contact-form-feedback',
    templateData: {
      message,
    },
  };

  await sendEmail(emailOptions);
};

export default sendContactFeedback;

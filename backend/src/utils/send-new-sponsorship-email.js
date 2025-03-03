import sendEmail from '#src/utils/send-email.js';

const sendNewSponsorshipEmail = async sponsorshipData => {
  const emailOptions = {
    from: 'Team BioBaumBauer <new-sponsorship@biobaumbauer.de>',
    replyTo: 'no-reply@biobaumbauer.de',
    to: 'hello@biobaumbauer.de',
    subject: 'New Sponsorship Received',
    templateName: 'new-sponsorship',
    templateData: {
      sponsorshipData,
    },
  };

  await sendEmail(emailOptions);
};

export default sendNewSponsorshipEmail;

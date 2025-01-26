import { StatusCodes } from 'http-status-codes';
import Contact from '#src/models/contact.js';
import formatZodError from '#src/utils/format-zod-error.js';
import sendContactFeedback from '#src/utils/contact-feedback-email.js';
import sendContactToTeam from '#src/utils/contact-to-team-email.js';

export const createContact = async (req, res) => {
  const formData = req.body;

  // Validate the form data
  const result = Contact.validateFormData(formData);

  if (!result.success) {
    const errors = formatZodError(result.error);

    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }

  try {
    // Create a new contact form entry
    await Contact.create(formData);

    const { email, userName, message } = formData;
    await sendContactFeedback(email, message);
    await sendContactToTeam(email, userName, message);

    return res
      .status(StatusCodes.CREATED)
      .json({ message: 'We have recieved your message.' });
  } catch (error) {
    throw error;
  }
};

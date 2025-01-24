import { StatusCodes } from 'http-status-codes';
import Contact from '#src/models/contact.js';

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

    return res
      .status(StatusCodes.CREATED)
      .json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    throw error;
  }
};

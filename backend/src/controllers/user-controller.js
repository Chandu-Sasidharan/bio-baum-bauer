import { StatusCodes } from 'http-status-codes';
import formatZodError from '#src/utils/format-zod-error.js';
import pickUserPayload from '#src/utils/pick-user-payload.js';
import User from '#src/models/user.js';

// Update user
export const updateUser = async (req, res) => {
  try {
    const formData = req.body;
    const { _id } = req.user;
    // Validate the form data
    const result = User.validateUpdateFormData(formData);
    if (!result.success) {
      const errors = formatZodError(result.error);

      return res.status(StatusCodes.BAD_REQUEST).json({ errors });
    }

    const user = await User.findById(_id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found' });
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(_id, formData, {
      new: true,
    });

    // Pick the fields that are needed for the response
    const userPayload = pickUserPayload(updatedUser);

    return res
      .status(StatusCodes.OK)
      .json({ user: userPayload, message: 'User updated' });
  } catch (error) {
    throw error;
  }
};

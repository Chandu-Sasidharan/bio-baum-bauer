import { body, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

export const validateChangePassword = [
  body('currentPassword')
    .trim()
    .notEmpty()
    .withMessage('Current Password field should not be empty!'),
  body('newPassword')
    .trim()
    .notEmpty()
    .withMessage('New Password field should not be empty..!')
    .isLength({ min: 5 })
    .withMessage('Password should be at least 5 characters'),
  body('confirmNewPassword')
    .trim()
    .notEmpty()
    .withMessage('Confirm Password field should not be empty!')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error(
          'Password confirmation does not match the new password'
        );
      }
      return true;
    }),
];

export const handlePasswordValidationResults = (req, res, next) => {
  const errors = validationResult(req);
  // If there are errors
  if (!errors.isEmpty()) {
    // Response code 400
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  // If there is no error, pass the control to the next middleware
  next();
};

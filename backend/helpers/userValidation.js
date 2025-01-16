import { body, param, validationResult } from 'express-validator';
import { changeToUpperCase } from './generalSanitizers.js';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import { ObjectId } from 'mongodb';

export const validateSignup = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email should not be empty.')
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .custom(async value => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error('Email is already in use.');
      }
    }),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password should not be empty.')
    .isLength({ min: 5 })
    .withMessage('Password should be at least 5 characters long.'),
  body('confirmPassword')
    .trim()
    .notEmpty()
    .withMessage('Confirm Password should not be empty.')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match.');
      }
      return true;
    }),
];

export const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email should not be empty.')
    .isEmail()
    .withMessage('Please enter a valid email address.'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password should not be empty!'),
];

export const validateUserFields = [
  body(['firstName', 'lastName'])
    .trim()
    .notEmpty()
    .withMessage('FirstName and LastName should not be empty!')
    .isLength({ min: 3, max: 20 })
    .withMessage(
      'The length of FirstName and LastName should be between 3 and 20 characters'
    )
    .customSanitizer(value => changeToUpperCase(value)),
  body('city').trim().notEmpty().withMessage('Please provide the city name'),
  body('zipCode').trim().notEmpty().withMessage('Please provide the zip code'),
  body('address1').trim().notEmpty().withMessage('Please provide the address'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email should not be empty!')
    .isEmail()
    .withMessage('Please provide a valid email')
    .custom(async email => {
      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new Error('An account with this email already exists');
      }
    }),
  body('mobilePhone')
    .trim()
    .notEmpty()
    .withMessage('Please provide the mobile phone number'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password should not be empty!')
    .isLength({ min: 5 })
    .withMessage('Password should be at least 5 characters'),
  body('passwordConfirmation')
    .trim()
    .notEmpty()
    .withMessage('Password Confirmation should not be left empty!')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password should match with Confirm Password');
      }
      return true;
    }),
];

export const validateParams = [
  param('uId').custom(value => {
    // The parameter needs to be only of ObjectId type
    if (!ObjectId.isValid(value)) {
      throw new Error('User ID is not valid');
    }
    return true;
  }),
];

export const handleValidationResults = (req, res, next) => {
  const errors = validationResult(req);
  // If there are errors
  if (!errors.isEmpty()) {
    // Response code 400
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  // If there is no error, pass the control to the next middleware
  next();
};

import { body, param, validationResult } from 'express-validator';
import {
  changeToUpperCase,
  filterBadWordSanitizer,
} from './generalSanitizers.js';
import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';

// Validating incoming data for creating and updating Contact
export const validateFullContact = [
  body(['firstName', 'lastName'])
    .trim()
    .notEmpty()
    .withMessage('FirstName and LastName should not be empty!')
    .isLength({ min: 3, max: 18 })
    .withMessage(
      'The length of FirsName and LastName should be between 3 and 20'
    )
    .customSanitizer(value => changeToUpperCase(value)),
  body('emailAddress')
    .trim()
    .notEmpty()
    .withMessage('Email should not left empty!')
    .isEmail()
    .withMessage('This field is an email address!'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('You need to provide some detail')
    .isLength({ min: 3 })
    .withMessage('The length of your message should be at least 3 characters!')
    .customSanitizer(value => filterBadWordSanitizer(value)),
];

/**
 * for parameter validation
 * @returns
 */
export const paramValidatorContact = [
  param('cId').custom(value => {
    // the parameter need to be only from ObjectId type
    if (!ObjectId.isValid(value)) {
      throw new Error('Parameter can be only of type ObjectId');
    }
    return true;
  }),
];
/**
 * this function is for showing validation result
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const validationResultContact = (req, res, next) => {
  const errors = validationResult(req);
  console.log('Req: ', errors);
  //if there are errors
  if (!errors.isEmpty()) {
    //response code 400
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  // if there is not any error, should pass the control to next middleware
  next();
};

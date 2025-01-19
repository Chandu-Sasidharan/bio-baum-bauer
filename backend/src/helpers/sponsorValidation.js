import { body, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

export const sponsorshipFullValidation = [
  body('price')
    .trim()
    .notEmpty()
    .withMessage('price of tree should be added for sponsorship')
    .isNumeric()
    .withMessage('please enter a number'),

  body('location')
    .notEmpty()
    .withMessage('please specify the location of tree'),
];

//*************************the validation of userId and treeId should be added here???? */

/**
 * this function is for showing validation result
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */

export const validationResultSponsor = (req, res, next) => {
  const errors = validationResult(req);
  //if there are errors
  if (!errors.isEmpty()) {
    //response code 400
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  // if there is not any error, should pass the control to next middleware
  next();
};

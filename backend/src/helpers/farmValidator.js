import { body, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
/* import { changeToUpperCase } from "./userSanitization.js";
 */
import Filter from 'bad-words';
export const validateFarm = [
  body('farmName')
    .trim()
    .notEmpty()
    .withMessage('farmname should not left empty!')
    .isLength({ min: 3 })
    .withMessage('The length of farmName should be at least 3 characters!'),
  /*     .customSanitizer((value) => changeToUpperCase(value)),
   */
  body('ownerName')
    .trim()
    .notEmpty()
    .withMessage('You need to provide some detail')
    .isLength({ min: 3 })
    .withMessage('The length of ownerName should be at least 3 characters!'),
  /*     .customSanitizer((value) => validationMiddleWare(value)),
   */
  body('contactInfo').notEmpty().withMessage('You need to provide some detail'),

  body('GPScoordinates')
    .isNumeric()
    .withMessage('GPS should be a number')
    .notEmpty()
    .withMessage('You need to provide some detail'),
  body('fieldType').notEmpty().withMessage('You need to provide some detail'),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  //if there are errors
  if (!errors.isEmpty()) {
    //response code 400
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  next();
};
/**
 * for validating
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const validationMiddleWare = paragraph => {
  const badWords = ['foolish', 'bad', 'wrong', 'crazy'];
  const filter = new Filter();
  filter.addWords(...badWords);
  return filter.clean(paragraph);
};

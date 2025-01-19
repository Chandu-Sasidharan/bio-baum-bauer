import { body, validationResult } from 'express-validator';
import { changeToUpperCase, changeToNumber } from './generalSanitizers.js';
import { StatusCodes } from 'http-status-codes';

export const validateFullTree = [
  body('treeName')
    .trim()
    .notEmpty()
    .withMessage('Tree Name should not be empty!')
    .isLength({ min: 3 })
    .withMessage('The length of Tree Name should be at least 3 characters')
    .customSanitizer(value => changeToUpperCase(value)),
  body('treePrice')
    .trim()
    .notEmpty()
    .withMessage('Tree Price should not be empty!')
    .customSanitizer(value => changeToNumber(value)),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('You need to provide some description'),
  body('treeImage').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('Uploading One Image for Tree is required!');
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
export const validationResultTree = (req, res, next) => {
  const errors = validationResult(req);
  console.log('Req: ', errors);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  next();
};

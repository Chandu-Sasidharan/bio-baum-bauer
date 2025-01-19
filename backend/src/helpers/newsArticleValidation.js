import { body, validationResult } from 'express-validator';
import {
  changeToUpperCase,
  filterBadWordSanitizer,
} from './generalSanitizers.js';
import { StatusCodes } from 'http-status-codes';

export const validateFullNewsArticle = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title should not be empty!')
    .isLength({ min: 3 })
    .withMessage('The length of title should be at least 3 characters')
    .customSanitizer(value => changeToUpperCase(value)),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Provide some description!')
    .isLength({ min: 3 })
    .withMessage('The length of description should be at least 3')
    .customSanitizer(value => filterBadWordSanitizer(value)),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('You need to provide some content'),
  body('newsImage').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('Uploading One Image for News is required!');
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
export const validationResultNewsArticle = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
  next();
};

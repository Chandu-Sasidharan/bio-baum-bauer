import { body, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import Filter from 'bad-words';
export const faqValidator = [
  body('Question')
    .trim()
    .notEmpty()
    .withMessage('Questions should not left empty!')
    .isLength({ min: 10 })
    .withMessage('The length of Question should be at least 3 characters!')
    .contains('?')
    .withMessage('add questionmark'),
  /*     .customSanitizer((value) => changeToUpperCase(value)),
   */
  body('Answers')
    .trim()
    .notEmpty()
    .withMessage('Answers should not left empty!')
    .isLength({ min: 2 })
    .withMessage('The length of Answer should be at least 3 characters!')
    .customSanitizer(value => validationMiddleWare(value)),
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

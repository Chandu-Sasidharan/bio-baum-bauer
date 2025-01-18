import express from 'express';
const router = express.Router();
import {
  createNewUser,
  getAllUsers,
  findUserById,
  findUserByEmail,
  updateById,
  findByEmailAndUpdate,
  deleteUserBasedOnId,
  loginUser,
  changePassword,
  logoutUser,
  refreshToken,
} from '../controllers/userController.js';
import {
  validateLogin,
  validateSignup,
  validateParams,
  handleValidationResults,
} from '../helpers/userValidation.js';
import {
  validateChangePassword,
  handlePasswordValidationResults,
} from '../helpers/passwordValidation.js';

// route for user
router.post('/signup', validateSignup, handleValidationResults, createNewUser);

router.post('/login', validateLogin, handleValidationResults, loginUser);

router.get('/logout', logoutUser);

router.get('/refresh-token', refreshToken);

router.get('/get-all-users', getAllUsers);
router.get(
  '/find-by-id/:uId',
  validateParams,
  handleValidationResults,
  findUserById
);
router.get('/find-by-email', findUserByEmail);
router.patch(
  '/update-by-id/:uId',
  validateParams,
  handleValidationResults,
  updateById
);
router.patch('/find-by-email-and-update/', findByEmailAndUpdate);
router.delete(
  '/find-by-id-and-delete/:uId',
  validateParams,
  handleValidationResults,
  deleteUserBasedOnId
);

router.post(
  '/change-password/:uId',
  validateChangePassword,
  handlePasswordValidationResults,
  changePassword
);

export default router;

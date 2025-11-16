import express from 'express';
const router = express.Router();
import {
  signUp,
  confirmAccount,
  loginUser,
  logoutUser,
  refreshToken,
  requestPasswordReset,
  resetPassword,
} from '#src/controllers/auth-controller.js';

// User Routes
router.post('/signup', signUp);
router.post('/confirm-account', confirmAccount);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/refresh-token', refreshToken);
router.post('/forgot-password', requestPasswordReset);
router.post('/reset-password', resetPassword);

export default router;

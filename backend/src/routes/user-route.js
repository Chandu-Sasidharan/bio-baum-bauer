import express from 'express';
const router = express.Router();
import {
  signUp,
  loginUser,
  logoutUser,
  refreshToken,
} from '#src/controllers/auth-controller.js';

// User Routes
router.post('/signup', signUp);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/refresh-token', refreshToken);

export default router;

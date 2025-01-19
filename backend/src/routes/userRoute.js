import express from 'express';
const router = express.Router();
import {
  createNewUser,
  loginUser,
  logoutUser,
  refreshToken,
} from '#src/controllers/userController.js';

// User Routes
router.post('/signup', createNewUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/refresh-token', refreshToken);

export default router;

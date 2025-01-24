import express from 'express';
import { updateUser } from '#src/controllers/user-controller.js';
import isAuthenticated from '#src/middlewares/is-authenticated.js';

const router = express.Router();

// User Routes
router.put('/update', isAuthenticated, updateUser);

export default router;

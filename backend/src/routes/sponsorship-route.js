import express from 'express';
import { getUserSponsorships } from '#src/controllers/sponsorship-controller.js';
import isAuthenticated from '#src/middlewares/is-authenticated.js';

const router = express.Router();

router.get('/', isAuthenticated, getUserSponsorships);

export default router;

import express from 'express';
import { getAllImpressions } from '#src/controllers/impression-controller.js';

const router = express.Router();

router.get('/', getAllImpressions);

export default router;

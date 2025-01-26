import express from 'express';
import { getAllFeaturedTrees } from '#src/controllers/tree-controller.js';

const router = express.Router();

router.get('/featured', getAllFeaturedTrees);

export default router;

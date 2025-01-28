import express from 'express';
import {
  getAllTrees,
  getAllFeaturedTrees,
} from '#src/controllers/tree-controller.js';

const router = express.Router();

router.get('/', getAllTrees);
router.get('/featured', getAllFeaturedTrees);

export default router;

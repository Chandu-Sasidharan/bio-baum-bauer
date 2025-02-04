import express from 'express';
import {
  getAllTrees,
  getTreeById,
  getAllFeaturedTrees,
} from '#src/controllers/tree-controller.js';

const router = express.Router();

router.get('/', getAllTrees);
router.get('/featured', getAllFeaturedTrees);
router.get('/:id', getTreeById);

export default router;

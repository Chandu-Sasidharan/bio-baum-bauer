import express from 'express';
import {
  getAllTrees,
  getTreeById,
  getAllFeaturedTrees,
} from '#src/controllers/tree-controller.js';

const router = express.Router();

router.get('/', getAllTrees);
router.get('/:id', getTreeById);
router.get('/featured', getAllFeaturedTrees);

export default router;

import express from 'express';
import {
  getAllTrees,
  getTreeById,
  getAllFeaturedTrees,
  getTreesInCart,
} from '#src/controllers/tree-controller.js';

const router = express.Router();

router.get('/', getAllTrees);
router.get('/featured', getAllFeaturedTrees);
router.get('/:id', getTreeById);
router.post('/cart', getTreesInCart);

export default router;

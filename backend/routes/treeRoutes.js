import express from 'express';
import * as treeController from '../controllers/treeController.js';
import {
  validateFullTree,
  validationResultTree,
} from '../helpers/treeValidation.js';
import multer from 'multer';
import bytes from 'bytes';
import { storage } from '../config/treecloudstorage.js';
const router = express.Router();

const upload = multer({
  storage: storage,
  limits: { fileSize: bytes('3MB') },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/webp'
    ) {
      cb(null, true);
    } else {
      return cb(new Error('allowed images are jpg, png and webp'));
    }
  },
});

router.get('/get', treeController.getAllTrees);
router.get('/search/:searchParam', treeController.searchByName);

router.get('/:id', treeController.getTreeById);
router.post(
  '/create',
  upload.single('treeImage'),
  validateFullTree,
  validationResultTree,
  treeController.addTree
);
router.patch('/update/:_id', treeController.updateTree);
router.delete('/:id', treeController.deleteTree);
router.post('/cart', treeController.getTreesInCart);
router.get('/featured/all', treeController.getFeaturedTrees);

export default router;

// newsArticlesRoutes.js
import express from 'express';
import multer from 'multer';
import bytes from 'bytes';
import { storage } from '#root/config/newscloudstorage.js';
import {
  getAllNewsArticles,
  getNewsArticleById,
  createNewsArticle,
  updateNewsArticle,
  deleteNewsArticle,
} from '../controllers/newsArticlesController.js';
import {
  validateFullNewsArticle,
  validationResultNewsArticle,
} from '../helpers/newsArticleValidation.js';

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

router.get('/', getAllNewsArticles); // Fetch all news articles
router.get('/:id', getNewsArticleById); // Fetch a single news article by ID
router.post(
  '/create',
  upload.single('newsImage'),
  validateFullNewsArticle,
  validationResultNewsArticle,
  createNewsArticle
); // Create a new news article
router.put('/:id', updateNewsArticle); // Update a news article by ID
router.delete('/:id', deleteNewsArticle); // Delete a news article by ID

export default router;

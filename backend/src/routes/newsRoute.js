import express from 'express';
import {
  addNews,
  deleteNews,
  getAllNews,
  updateNews,
} from '../controllers/newsController.js';

const router = express.Router();
router.get('/allNews', getAllNews);
router.post('/addNews', addNews);
router.patch('/updateNews/:id', updateNews);
router.delete('/deleteNews/:id', deleteNews);

export default router;

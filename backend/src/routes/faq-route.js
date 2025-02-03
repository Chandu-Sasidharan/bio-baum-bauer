import express from 'express';
import { getAllFaqs } from '#src/controllers/faq-controller.js';

const router = express.Router();

router.get('/', getAllFaqs);

export default router;

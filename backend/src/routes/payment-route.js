import express from 'express';
import { getPaymentIntent } from '#src/controllers/stripe-controller.js';

const router = express.Router();

router.post('/', getPaymentIntent);

export default router;

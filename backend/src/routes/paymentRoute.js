import express from 'express';
import {
  createStripePayment,
  addPaymentAndSponsorShip,
  sponsorShipCounts,
  getAllSponsorships,
  getSponsorShipById,
} from '../controllers/paymentController.js';
const router = express.Router();

router.post('/checkout', createStripePayment);
router.post('/create', addPaymentAndSponsorShip);
router.get('/getTotalCount/:uId', sponsorShipCounts);
router.get('/getAll/:uId', getAllSponsorships);
router.get('/getDetail/:sId', getSponsorShipById);

export default router;

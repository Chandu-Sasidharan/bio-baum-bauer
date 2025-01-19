import express from 'express';
import {
  createSponsorShip,
  deleteSponsor,
  getAllSponsors,
  updateSponsorShip,
} from '../controllers/sponsorShipController.js';

const router = express.Router();

router.get('/allSponsors', getAllSponsors);
router.post('/newSponsorShip', createSponsorShip);
router.delete('/deleteSponsor/:id', deleteSponsor);
router.patch('/updateSponsorShip/:sId', updateSponsorShip);

export default router;

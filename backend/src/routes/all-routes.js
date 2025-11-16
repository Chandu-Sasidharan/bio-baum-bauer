import express from 'express';
import userRoute from '#src/routes/user-route.js';
import treeRoute from '#src/routes/tree-route.js';
import impressionRoute from '#src/routes/impression-route.js';
import faqRoute from '#src/routes/faq-route.js';
import contactRoute from '#src/routes/contact-route.js';
import authRoute from '#src/routes/auth-route.js';
import paymentRoute from '#src/routes/payment-route.js';
import sponsorshipRoute from '#src/routes/sponsorship-route.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/trees', treeRoute);
router.use('/user', userRoute);
router.use('/contact', contactRoute);
router.use('/impressions', impressionRoute);
router.use('/faqs', faqRoute);
router.use('/payment-intent', paymentRoute);
router.use('/sponsorships', sponsorshipRoute);

export default router;

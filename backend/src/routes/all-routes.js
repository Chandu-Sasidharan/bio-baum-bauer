import express from 'express';
import userRoute from '#src/routes/user-route.js';
import treeRoute from '#src/routes/tree-route.js';
import impressionRoute from '#src/routes/impression-route.js';
import faqRoute from '#src/routes/faq-route.js';
import contactRoute from '#src/routes/contact-route.js';
import authRoute from '#src/routes/auth-route.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/trees', treeRoute);
router.use('/user', userRoute);
router.use('/contact', contactRoute);
router.use('/impressions', impressionRoute);
router.use('/faqs', faqRoute);

export default router;

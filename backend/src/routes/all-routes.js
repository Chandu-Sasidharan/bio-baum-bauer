import express from 'express';
import userRoute from '#src/routes/user-route.js';
import feedbackRoute from '#src/routes/feedbackRoute.js';
// import sponsorShipRoute from '#src/routes/sponsorShipRoute.js';
import contactRoute from '#src/routes/contact-route.js';
import newsArticleRoute from '#src/routes/newsArticleRoute.js';
import farmRoute from '#src/routes/farmRoute.js';
import galleryRoute from '#src/routes/galleryRoute.js';
import treeRoute from '#src/routes/treeRoute.js';
import paymentRoute from '#src/routes/paymentRoute.js';
import authRoute from '#src/routes/auth-route.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/feedbacks', feedbackRoute);
router.use('/contact', contactRoute);
// router.use('/sponsorships', sponsorShipRoute);
router.use('/news-articles', newsArticleRoute);
router.use('/farm', farmRoute);
router.use('/gallery', galleryRoute);
router.use('/tree', treeRoute);
router.use('/payment', paymentRoute);

export default router;

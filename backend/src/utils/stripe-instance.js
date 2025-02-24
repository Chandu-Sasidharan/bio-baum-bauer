import stripe from 'stripe';

const stripeInstance = stripe(process.env.STRIPE_API_SECRET_KEY);

export default stripeInstance;

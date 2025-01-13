import stripe from 'stripe';

export const stripeInstance = stripe(process.env.STRIPE_API_SECRET_KEY);

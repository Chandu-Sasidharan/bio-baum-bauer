import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { postPaymentWebhook } from '#src/controllers/webhook-controller.js';
import allowCors from '#src/middlewares/allow-cors.js';
import allRoutes from '#src/routes/all-routes.js';

const app = express();

// Trust first proxy in production (e.g., when behind caddy)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use('/admin-assets', express.static('./src/admin/assets'));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'script-src': ["'self'", "'unsafe-inline'"],
      },
    },
  })
); //provide basic security
allowCors(app); // allow cors
app.use(cookieParser()); // parse cookies

// Stripe webhook route, requires raw body
app.post(
  '/api/webhook',
  express.raw({ type: 'application/json' }),
  postPaymentWebhook
);

// parse json
app.use(express.json());

// Log requests to console if in development
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}

// Home route for testing
app.get('/', (_, res) => {
  res.send('<h1>Backend is running!!!</h1>');
});

// All routes
app.use('/api', allRoutes);

// Handle thrown errors
app.use((error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';
  const message = isProduction
    ? 'Something went wrong!'
    : error.message || 'Something went wrong!';

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(isProduction ? {} : { stack: error.stack }),
  });
});

export default app;

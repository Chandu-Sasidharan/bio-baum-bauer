import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import allowCors from '#src/middlewares/allow-cors.js';
import allRoutes from '#src/routes/all-routes.js';

const app = express();

app.use(helmet()); //provide basic security
allowCors(app); // allow cors
app.use(express.json()); // parse json
app.use(cookieParser()); // parse cookies

// Log requests to access.log
const accessLogStream = fs.createWriteStream('./logs/access.log', {
  flags: 'a',
});
app.use(morgan('combined', { stream: accessLogStream }));

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

import express from 'express';
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
  // eslint-disable-next-line no-console
  console.log(error);

  const statusCode = error.statusCode || 500;
  // const isProduction = process.env.NODE_ENV === 'production';
  // const message = isProduction
  //   ? 'Something went wrong!'
  //   : error.message || 'Something went wrong!';

  const message = error.message || 'Something went wrong!!!';

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    stack: error.stack,
    // ...(isProduction ? {} : { stack: error.stack }),
  });
});

export default app;

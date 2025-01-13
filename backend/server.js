import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import allowCors from './middlewares/cors.js';
import allRoutes from './routes/allRoutes.js';
import db from './db.js';
import fs from 'fs';

const app = express();

app.use(helmet()); //provide basic securites
allowCors(app); // allow cors
app.use(express.json()); // parse json
app.use(cookieParser()); // parse cookies

// log requests to access.log
const accessLogStream = fs.createWriteStream('./logs/access.log', {
  flags: 'a',
});
app.use(morgan('combined', { stream: accessLogStream }));

// log requests to console if in development
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}

// Home route for testing
app.get('/', (_, res) => {
  res.send('<h1>Backend is running!!!</h1>');
});

// All routes
app.use('/api', allRoutes);

// Start server
const port = process.env.PORT || 4000;
app.listen(port, async () => {
  try {
    await db.connect();
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
});

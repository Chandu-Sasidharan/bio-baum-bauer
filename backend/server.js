import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import allowCors from './middlewares/cors.js';
import allRoutes from './routes/allRoutes.js';
import db from './db.js';
import fs from 'fs';

const app = express();

const port = process.env.PORT || 4000;
app.use(helmet()); //provide basic securites
allowCors(app);
// app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser()); // parse cookies

// log requests to access.log
const accessLogStream = fs.createWriteStream('./logs/access.log', {
  flags: 'a',
});
app.use(morgan('combined', { stream: accessLogStream }));

if (app.get('env') === 'development') {
  app.use(morgan('tiny')); // provide logging to the console
}

app.get('/', (_, res) => {
  res.send('<h1>Backend is running!!!</h1>');
});
app.use('/api', allRoutes);

// Start server
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

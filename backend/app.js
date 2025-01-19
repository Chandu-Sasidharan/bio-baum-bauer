import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import allowCors from '#src/middlewares/cors.js';
import allRoutes from '#src/routes/allRoutes.js';

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

export default app;

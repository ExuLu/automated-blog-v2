import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import morgan from 'morgan';
import articleRouter from './routes/articleRoute.js';
import { isDefinedString } from './validation/isDefinedString.js';

import type { Express, Request, Response } from 'express';
import type { CorsOptions } from 'cors';
import type { RateLimitRequestHandler } from 'express-rate-limit';
import { sendError } from './utils/sendError.js';

const app: Express = express();
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;

if (!isDefinedString(FRONTEND_ORIGIN))
  throw Error('Please provide FRONTEND_ORIGIN to setup cors');

app.set('trust proxy', true);

const corsOptions: CorsOptions = {
  origin: FRONTEND_ORIGIN,
  methods: ['GET', 'POST'],
};

app.use(helmet());

app.use(morgan('dev'));

const limiter: RateLimitRequestHandler = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour!',
});
app.use('/api', limiter);

app.use(cors(corsOptions));

app.use(express.json({ limit: '10kb' }));

app.use('/api/articles', articleRouter);
app.use((req: Request, res: Response) => {
  sendError(res, 'ROUTE_NOT_FOUND');
});

export default app;

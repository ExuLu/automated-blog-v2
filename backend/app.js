const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const morgan = require('morgan');
const articleRouter = require('./routes/articleRoute');

const app = express();
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
const corsOptions = {
  origin: FRONTEND_ORIGIN,
  methods: ['GET', 'POST'],
};

app.use(helmet());

app.use(morgan('dev'));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour!',
});
app.use('/api', limiter);

app.use(cors(corsOptions));

app.use(express.json({ limit: '10kb' }));

app.use('/api/articles', articleRouter);
app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Page not found',
  });
});

module.exports = app;

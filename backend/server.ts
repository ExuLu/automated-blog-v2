import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import startArticleScheduler from './services/articleScheduler';

import type { Server } from 'http';

process.on('uncaughtException', (err: Error) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);

  process.exit(1);
});

const port: number = Number(process.env.PORT ?? 3000);

const server: Server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
  startArticleScheduler();
});

process.on('unhandledRejection', (err: unknown) => {
  const error = err instanceof Error ? err : new Error(String(err));

  console.log(error.name, error.message);
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

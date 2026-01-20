import { OpenRouterErrorResponse } from '../types/llm.js';
import HttpError from './HttpError.js';

type ErrorLike = { status?: unknown; message?: unknown };

export const normalizeError = (err: unknown, fallbackMessage: string) => {
  if (err instanceof HttpError) {
    return { status: err.status, message: err.message };
  }

  if (typeof err === 'object' && err !== null) {
    const maybeErr = err as ErrorLike;
    const statusValue = maybeErr.status;
    const hasStatus =
      typeof statusValue === 'number' &&
      Number.isInteger(statusValue) &&
      statusValue >= 400 &&
      statusValue < 600;

    const status = hasStatus ? statusValue : 500;

    const message =
      status >= 400 && status < 500 && typeof maybeErr.message === 'string'
        ? maybeErr.message
        : fallbackMessage;

    return { status, message };
  }

  return { status: 500, message: fallbackMessage };
};


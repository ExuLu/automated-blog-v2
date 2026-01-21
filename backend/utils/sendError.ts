import { AppError } from '../types/errors.js';
import { ErrorResBody } from '../types/responses.js';
import type { Response } from 'express';

export function sendError(
  res: Response<ErrorResBody>,
  { statusCode, message, code }: AppError,
) {
  const jsonStatus = String(statusCode).startsWith('4') ? 'fail' : 'error';
  res.status(statusCode).json({
    status: jsonStatus,
    message: message,
    code: code,
  });
}

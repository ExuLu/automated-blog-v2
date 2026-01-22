import { ErrorCodes } from '../types/errors.js';
import { ErrorResBody } from '../types/responses.js';
import type { Response } from 'express';
import { errorCodes } from './errorCodes.js';

export function sendError(res: Response<ErrorResBody>, code: ErrorCodes) {
  const { message, statusCode } = errorCodes[code];

  console.error(`💥 App Error: ${code} - ${message}`);

  const jsonStatus = String(statusCode).startsWith('4') ? 'fail' : 'error';
  res.status(statusCode).json({
    status: jsonStatus,
    message: message,
    code: code,
  });
}

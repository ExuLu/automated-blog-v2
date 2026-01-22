import { AppError, ErrorCodes } from '../types/errors.js';
import { ErrorResBody } from '../types/responses.js';
import type { Response } from 'express';
import { errorCodes } from './errorCodes.js';

export function sendError(res: Response<ErrorResBody>, code: ErrorCodes) {
  const errorCode = errorCodes[code] ? code : 'INTERNAL_ERROR';
  const { message, statusCode } = errorCodes[errorCode];

  console.error(`💥 App Error: ${errorCode} - ${message}`);

  const jsonStatus = String(statusCode).startsWith('4') ? 'fail' : 'error';
  res.status(statusCode).json({
    status: jsonStatus,
    message: message,
    code: errorCode,
  });
}

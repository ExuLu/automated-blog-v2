import { AppError } from '../types/errors.js';
import { ErrorResBody } from '../types/responses.js';
import type { Response } from 'express';
import { errorCodes } from './errorCodes.js';

export function sendError(res: Response<ErrorResBody>, code: string) {
  let errorCode = 'INTERNAL_ERROR';
  const appError: AppError = errorCodes[errorCode];

  if (errorCodes[code]) {
    errorCode = code;
    appError.message = errorCodes[errorCode].message;
    appError.statusCode = errorCodes[errorCode].statusCode;
  }

  const { message, statusCode } = appError;
  console.error(`💥 App Error: ${errorCode} - ${message}`);

  const jsonStatus = String(statusCode).startsWith('4') ? 'fail' : 'error';
  res.status(statusCode).json({
    status: jsonStatus,
    message: message,
    code: errorCode,
  });
}

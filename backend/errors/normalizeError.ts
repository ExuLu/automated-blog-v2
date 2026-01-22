import { ErrorCodes } from '../types/errors.js';
import ApiError from './ApiError.js';

export const normalizeErrorCode = (
  err: unknown,
  fallBackCode: ErrorCodes,
): ErrorCodes => {
  if (err instanceof ApiError) return err.code;

  return fallBackCode;
};

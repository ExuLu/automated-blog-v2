import ApiError from './ApiError.js';

export const normalizeErrorCode = (
  err: unknown,
  fallBackCode: string,
): string => {
  if (err instanceof ApiError) return err.code;

  return fallBackCode;
};

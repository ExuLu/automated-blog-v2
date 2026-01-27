import type { ApiError } from '../types/error';

export default function buildApiError(
  message: string,
  status?: number,
): ApiError {
  const error = new Error(message) as ApiError;
  if (status !== undefined) error.status = status;
  return error;
}

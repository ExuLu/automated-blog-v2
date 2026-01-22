import { ErrorCodes } from '../types/errors.js';
import { errorCodes } from '../utils/errorCodes.js';

export default class ApiError extends Error {
  code: ErrorCodes;

  constructor(code: ErrorCodes) {
    const message = errorCodes[code]
      ? errorCodes[code].message
      : errorCodes['INTERNAL_ERROR'].message;

    super(message);
    this.code = code;
    this.name = 'ApiError';
  }
}

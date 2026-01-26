import * as z from 'zod';
import { CONTENT_MAX_LENGTH, TITLE_MAX_LENGTH } from '../../constants.js';
import { ErrorCodes } from '../../types/errors.js';

export const CreateArticleReqBodySchema = z
  .object({
    title: z
      .string({ message: ErrorCodes.articleValidationFailed })
      .trim()
      .min(1, {
        message: ErrorCodes.articleTitleValidationFailed,
      })
      .max(TITLE_MAX_LENGTH, {
        message: ErrorCodes.articleTitleValidationFailed,
      }),
    content: z
      .string({ message: ErrorCodes.articleValidationFailed })
      .trim()
      .min(1, {
        message: ErrorCodes.articleContentValidationFailed,
      })
      .max(CONTENT_MAX_LENGTH, {
        message: ErrorCodes.articleContentValidationFailed,
      }),
  })
  .strict();

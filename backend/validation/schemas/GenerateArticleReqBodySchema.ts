import * as z from 'zod';

import { ErrorCodes } from '../../types/errors.js';

export const GenerateArticleReqBodySchema = z
  .object({
    topic: z
      .string({ message: ErrorCodes.articleTopicValidationFailed })
      .trim()
      .min(1, { message: ErrorCodes.articleTopicValidationFailed }),
  })
  .strict();

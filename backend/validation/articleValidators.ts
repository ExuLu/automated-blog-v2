import { validate as uuidValidate } from 'uuid';

import { CreateArticleReqBodySchema } from './schemas/CreateArticleReqBodySchema.js';
import { sendError } from '../utils/sendError.js';

import { ErrorCodes } from '../types/errors.js';
import type { NextFunction, Request, Response } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import type { ArticleInput, TopicInput } from '../types/article.js';
import type { ErrorResBody } from '../types/responses.js';

export const validateArticle = (
  req: Request<ParamsDictionary, unknown, Partial<ArticleInput>>,
  res: Response<ErrorResBody>,
  next: NextFunction,
): asserts req is Request<ParamsDictionary, unknown, ArticleInput> => {
  const validBody = CreateArticleReqBodySchema.safeParse(req.body);

  if (!validBody.success) {
    const errCode = validBody.error.issues[0].message as ErrorCodes;
    sendError(res, errCode);

    return;
  }

  req.body = validBody.data;
  next();
};

export const validateArticleId = (
  req: Request<{ id: string }>,
  res: Response<ErrorResBody>,
  next: NextFunction,
) => {
  const { id } = req.params;

  if (!uuidValidate(id)) {
    sendError(res, ErrorCodes.articleIdValidationFailed);
    return;
  }

  next();
};

export const validateArticleTopic = (
  req: Request<ParamsDictionary, unknown, Partial<TopicInput>>,
  res: Response<ErrorResBody>,
  next: NextFunction,
): asserts req is Request<ParamsDictionary, unknown, TopicInput> => {
  const { topic } = req.body || {};

  if (typeof topic !== 'string' || topic.trim().length < 1) {
    sendError(res, ErrorCodes.articleTopicValidationFailed);
    return;
  }

  req.body.topic = topic.trim();

  next();
};

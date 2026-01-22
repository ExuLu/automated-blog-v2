import { validate as uuidValidate } from 'uuid';

import type { NextFunction, Request, Response } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import { ArticleInput, TopicInput } from '../types/article.js';
import { ErrorResBody } from '../types/responses.js';
import { CONTENT_MAX_LENGTH, TITLE_MAX_LENGTH } from '../constants.js';
import { sendError } from '../utils/sendError.js';

export const validateArticle = (
  req: Request<ParamsDictionary, unknown, Partial<ArticleInput>>,
  res: Response<ErrorResBody>,
  next: NextFunction,
): asserts req is Request<ParamsDictionary, unknown, ArticleInput> => {
  const { title, content } = req.body || {};

  if (typeof title !== 'string' || typeof content !== 'string') {
    sendError(res, 'ARTICLE_VALIDATION_FAILED');
    return;
  }

  const titleTrimmed = title.trim();
  const contentTrimmed = content.trim();

  if (titleTrimmed.length < 1 || titleTrimmed.length > TITLE_MAX_LENGTH) {
    sendError(res, 'ARTICLE_TITLE_VALIDATION_FAILED');
    return;
  }

  if (contentTrimmed.length < 1 || contentTrimmed.length > CONTENT_MAX_LENGTH) {
    sendError(res, 'ARTICLE_CONTENT_VALIDATION_FAILED');
    return;
  }

  req.body.title = titleTrimmed;
  req.body.content = contentTrimmed;

  next();
};

export const validateArticleId = (
  req: Request<{ id: string }>,
  res: Response<ErrorResBody>,
  next: NextFunction,
) => {
  const { id } = req.params;

  if (!uuidValidate(id)) {
    sendError(res, 'ARTICLE_ID_VALIDATION_FAILED');
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
    sendError(res, 'ARTICLE_TOPIC_VALIDATION_FAILED');
    return;
  }

  req.body.topic = topic.trim();

  next();
};

import { validate as uuidValidate } from 'uuid';
import * as z from 'zod';

import type { NextFunction, Request, Response } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import { ArticleInput, TopicInput } from '../types/article.js';
import { ErrorResBody } from '../types/responses.js';
import { CONTENT_MAX_LENGTH, TITLE_MAX_LENGTH } from '../constants.js';
import { sendError } from '../utils/sendError.js';
import { ErrorCodes } from '../types/errors.js';

export const validateArticle = (
  req: Request<ParamsDictionary, unknown, Partial<ArticleInput>>,
  res: Response<ErrorResBody>,
  next: NextFunction,
): asserts req is Request<ParamsDictionary, unknown, ArticleInput> => {
  const TitleSchema = z
    .string({ message: ErrorCodes.articleValidationFailed })
    .trim()
    .min(1, {
      message: ErrorCodes.articleTitleValidationFailed,
    })
    .max(TITLE_MAX_LENGTH, {
      message: ErrorCodes.articleTitleValidationFailed,
    });

  const ContentSchema = z
    .string({ message: ErrorCodes.articleValidationFailed })
    .trim()
    .min(1, {
      message: ErrorCodes.articleContentValidationFailed,
    })
    .max(CONTENT_MAX_LENGTH, {
      message: ErrorCodes.articleContentValidationFailed,
    });

  const { title, content } = req.body || {};

  const validTitle = TitleSchema.safeParse(title);
  const validContent = ContentSchema.safeParse(content);

  if (!validContent.success) {
    const errorMessage = validContent.error?.issues[0].message;
    let errorCode: ErrorCodes;
    errorCode = errorMessage
      ? (errorMessage as ErrorCodes)
      : ErrorCodes.internalError;
    sendError(res, errorCode);
    return;
  }

  if (!validTitle.success) {
    const errorMessage = validTitle.error?.issues[0].message;
    let errorCode: ErrorCodes;
    errorCode = errorMessage
      ? (errorMessage as ErrorCodes)
      : ErrorCodes.internalError;
    sendError(res, errorCode);
    return;
  }

  req.body.title = validTitle.data;
  req.body.content = validContent.data;

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

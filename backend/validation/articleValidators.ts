import { validate as uuidValidate } from 'uuid';

import type { NextFunction, Request, Response } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import { ArticleInput, TopicInput } from '../types/article.js';
import { ErrorResBody } from '../types/responses.js';
import { CONTENT_MAX_LENGTH, TITLE_MAX_LENGTH } from '../constants.js';

export const validateArticle = (
  req: Request<ParamsDictionary, unknown, Partial<ArticleInput>>,
  res: Response<ErrorResBody>,
  next: NextFunction,
): asserts req is Request<ParamsDictionary, unknown, ArticleInput> => {
  const { title, content } = req.body || {};

  if (typeof title !== 'string' || typeof content !== 'string') {
    res.status(400).json({
      status: 'fail',
      message: 'The article should contain title and content',
    });
    return;
  }

  const titleTrimmed = title.trim();
  const contentTrimmed = content.trim();

  if (titleTrimmed.length < 1 || titleTrimmed.length > TITLE_MAX_LENGTH) {
    res.status(400).json({
      status: 'fail',
      message: `Article title should contain from 1 to ${TITLE_MAX_LENGTH} characters`,
    });
    return;
  }

  if (contentTrimmed.length < 1 || contentTrimmed.length > CONTENT_MAX_LENGTH) {
    res.status(400).json({
      status: 'fail',
      message: `Article content should contain from 1 to ${CONTENT_MAX_LENGTH} characters`,
    });
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
    return res.status(400).json({
      status: 'fail',
      message: 'Article id is not valid',
    });
  }

  next();
};

export const validateArticleTopic = (
  req: Request<ParamsDictionary, unknown, Partial<TopicInput>>,
  res: Response<ErrorResBody>,
  next: NextFunction,
): asserts req is Request<ParamsDictionary, unknown, TopicInput> => {
  const { topic } = req.body || {};

  if (typeof topic !== 'string') {
    res.status(400).json({
      status: 'fail',
      message: 'Please provide topic to generate an article',
    });
    return;
  }

  const trimmedTopic = topic.trim();

  if (trimmedTopic.length < 1) {
    res.status(400).json({
      status: 'fail',
      message: 'Topic should not be empty',
    });
    return;
  }

  req.body.topic = trimmedTopic;

  next();
};

export const isArticleInput = (article: unknown): article is ArticleInput => {
  if (!article || typeof article !== 'object') return false;
  const partialArticleInput = article as Partial<ArticleInput>;

  return (
    typeof partialArticleInput.title === 'string' &&
    typeof partialArticleInput.content === 'string' &&
    !!partialArticleInput.content.trim() &&
    !!partialArticleInput.title.trim()
  );
};

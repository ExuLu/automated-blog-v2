import { validate as uuidValidate } from 'uuid';

import type { NextFunction, Request, Response } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';

type ArticleBody = { title?: string; content?: string };
type TopicBody = { topic?: string };

const TITLE_MAX_LENGTH: number = Number(process.env.TITLE_MAX_LENGTH) || 200;
const CONTENT_MAX_LENGTH: number =
  Number(process.env.CONTENT_MAX_LENGTH) || 20000;

export const validateArticle = (
  req: Request<ParamsDictionary, unknown, ArticleBody>,
  res: Response,
  next: NextFunction
) => {
  const { title, content } = req.body || {};

  if (typeof title !== 'string' || typeof content !== 'string') {
    return res.status(400).json({
      status: 'fail',
      message: 'The article should contain title and content',
    });
  }

  const titleTrimmed = title.trim();
  const contentTrimmed = content.trim();

  if (titleTrimmed.length < 1 || titleTrimmed.length > TITLE_MAX_LENGTH) {
    return res.status(400).json({
      status: 'fail',
      message: `Article title should contain from 1 to ${TITLE_MAX_LENGTH} characters`,
    });
  }

  if (contentTrimmed.length < 1 || contentTrimmed.length > CONTENT_MAX_LENGTH) {
    return res.status(400).json({
      status: 'fail',
      message: `Article content should contain from 1 to ${CONTENT_MAX_LENGTH} characters`,
    });
  }

  req.body.title = titleTrimmed;
  req.body.content = contentTrimmed;

  next();
};

export const validateArticleId = (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
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
  req: Request<ParamsDictionary, unknown, TopicBody>,
  res: Response,
  next: NextFunction
) => {
  const { topic } = req.body || {};

  if (typeof topic !== 'string') {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide topic to generate an article',
    });
  }

  const trimmedTopic = topic.trim();

  if (trimmedTopic.length < 1) {
    return res.status(400).json({
      status: 'fail',
      message: 'Topic should not be empty',
    });
  }

  req.body.topic = trimmedTopic;

  next();
};

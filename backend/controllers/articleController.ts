import {
  createNewArticle,
  getArticle,
  listArticles,
  generateNewArticle,
} from '../services/articles/articleService.js';
import { normalizeErrorCode } from '../errors/normalizeError.js';

import type { Request, Response } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import type { ArticleInput, TopicInput } from '../types/article.js';
import {
  ArticleResBody,
  ArticlesResBody,
  ErrorResBody,
} from '../types/responses.js';
import { sendError } from '../utils/sendError.js';
import { ErrorCodes } from '../types/errors.js';

export const getAllArticles = (
  req: Request,
  res: Response<ArticlesResBody>,
) => {
  const articles = listArticles();

  res.status(200).json({
    status: 'success',
    data: {
      articles,
    },
  });
};

export const getArticleById = (
  req: Request<{ id: string }>,
  res: Response<ArticleResBody | ErrorResBody>,
) => {
  const article = getArticle(req.params.id);

  if (!article) {
    sendError(res, ErrorCodes.articleNotFound);
    return;
  }

  res.status(200).json({
    status: 'success',
    data: {
      article,
    },
  });
};

export const createArticle = async (
  req: Request<ParamsDictionary, unknown, ArticleInput>,
  res: Response<ArticleResBody | ErrorResBody>,
) => {
  try {
    const newArticle = await createNewArticle({
      title: req.body.title,
      content: req.body.content,
    });

    res.status(201).json({
      status: 'success',
      data: {
        article: newArticle,
      },
    });
  } catch (err) {
    console.error('Failed to create article:', err);
    const code = normalizeErrorCode(err, ErrorCodes.articleCreationFailed);
    sendError(res, code);
  }
};

export const generateArticleWithTopic = async (
  req: Request<ParamsDictionary, unknown, TopicInput>,
  res: Response<ArticleResBody | ErrorResBody>,
) => {
  const { topic } = req.body;

  try {
    const newArticle = await generateNewArticle(topic);

    res.status(201).json({
      status: 'success',
      data: {
        article: newArticle,
      },
    });
  } catch (err) {
    console.error('Failed to create article:', err);
    const code = normalizeErrorCode(err, ErrorCodes.articleGenerationFailed);
    sendError(res, code);
  }
};

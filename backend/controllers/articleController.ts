import {
  createNewArticle,
  getArticle,
  listArticles,
  generateNewArticle,
} from '../services/articles/articleService.js';
import { normalizeError } from '../errors/normalizeError.js';

import type { Request, Response } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import type { ArticleInput, TopicInput } from '../types/article.js';
import {
  ArticleResBody,
  ArticlesResBody,
  ErrorResBody,
} from '../types/responses.js';

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
    return res.status(404).json({
      status: 'fail',
      message: 'Article is not found',
    });
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

    const { status, message } = normalizeError(
      err,
      'There was an error while saving an article. Please try again',
    );

    res.status(status).json({
      status: 'error',
      message,
    });
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
    console.error('Generation failed: ', err);

    const { status, message } = normalizeError(
      err,
      'Failed to generate and save article. Please try again later',
    );

    res.status(status).json({
      status: 'error',
      message,
    });
  }
};

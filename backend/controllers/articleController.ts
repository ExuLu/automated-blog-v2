import articleRepository from '../data/articleRepository.js';
import createAndGenerate from '../services/articleService.js';
import HttpError from '../errors/HttpError.js';

import type { Request, Response } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import { normalizeError } from '../errors/normalizeError.js';

type ArticleBody = { title?: string; content?: string };
type TopicBody = { topic?: string };
type SuccessResponseBody<TData> = {
  status: 'success';
  data: TData;
};
type ErrorResponseBody = {
  status: 'fail' | 'error';
  message: string;
};
type ArticlesResBody = SuccessResponseBody<{
  articles: ArticleBody[];
}>;
type ArticleResBody = SuccessResponseBody<{ article: ArticleBody }>;

export const getAllArticles = (
  req: Request,
  res: Response<ArticlesResBody>
) => {
  const articles = articleRepository.getAllArticles();

  res.status(200).json({
    status: 'success',
    data: {
      articles,
    },
  });
};

export const getArticleById = (
  req: Request<{ id: string }>,
  res: Response<ArticleResBody | ErrorResponseBody>
) => {
  const article = articleRepository.getArticleById(req.params.id);

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
  req: Request<ParamsDictionary, unknown, ArticleBody>,
  res: Response<ArticleResBody | ErrorResponseBody>
) => {
  let newArticle: ReturnType<typeof articleRepository.createArticle> | null =
    null;

  try {
    newArticle = articleRepository.createArticle({
      title: req.body.title,
      content: req.body.content,
    });

    await articleRepository.saveArticleToFile();

    res.status(201).json({
      status: 'success',
      data: {
        article: newArticle,
      },
    });
  } catch (err) {
    console.error('Failed to create article:', err);

    if (newArticle) {
      try {
        articleRepository.removeArticleAfterError();
      } catch (cleanupErr) {
        console.error('Failed to rollback article after error:', cleanupErr);
      }
    }

    const { status, message } = normalizeError(
      err,
      'There was an error while saving an article. Please try again'
    );

    res.status(status).json({
      status: 'error',
      message,
    });
  }
};

export const generateAndCreateArticle = async (
  req: Request<ParamsDictionary, unknown, TopicBody>,
  res: Response<ArticleResBody | ErrorResponseBody>
) => {
  const { topic } = req.body;

  try {
    const newArticle = await createAndGenerate(topic);

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
      'Failed to generate and save article. Please try again later'
    );

    res.status(status).json({
      status: 'error',
      message,
    });
  }
};

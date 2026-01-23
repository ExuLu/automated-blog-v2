import type { Response } from 'express';
import { ArticleRecord } from '../types/article.js';

export default function sendSuccessResponse(
  res: Response,
  statusCode: number,
  data: { article: ArticleRecord } | { articles: ArticleRecord[] },
) {
  res.status(statusCode).json({
    status: 'success',
    data,
  });
}

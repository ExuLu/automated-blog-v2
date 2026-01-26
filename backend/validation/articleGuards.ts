import { ArticleInputSchema } from './schemas/ArticleInputSchema.js';

import type { ArticleInput } from '../types/article.js';

export const isArticleInput = (article: unknown): article is ArticleInput =>
  ArticleInputSchema.safeParse(article).success;

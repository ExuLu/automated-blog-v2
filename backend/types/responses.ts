import { ArticleRecord } from './article.js';

export type SuccessResBody<TData> = {
  status: 'success';
  data: TData;
};

export type ErrorResBody = {
  status: 'fail' | 'error';
  message: string;
};

export type ArticlesResBody = SuccessResBody<{
  articles: ArticleRecord[];
}>;

export type ArticleResBody = SuccessResBody<{ article: ArticleRecord }>;

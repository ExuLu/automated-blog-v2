import type { ApiResponse } from '../types/api';
import type { ArticlePayload, ArticlesPayload } from '../types/article';
import { request } from './httpClient';

export async function getAllArticles() {
  const result = await request<ApiResponse<ArticlesPayload>>('/articles');
  return result.data.articles;
}

export async function getArticleById(id: string) {
  const result = await request<ApiResponse<ArticlePayload>>(`/articles/${id}`);
  return result.data.article;
}

export async function generateAndAddArticle(topic: string) {
  const config = { method: 'POST', body: JSON.stringify({ topic }) };
  const result = await request<ApiResponse<ArticlePayload>>(
    `/articles/generate`,
    config,
  );
  return result.data.article;
}

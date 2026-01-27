import type { ApiFailure, ApiResponse } from '../types/api';
import type { ArticlePayload, ArticlesPayload } from '../types/article';
import buildApiError from './buildApiError';

const API_URL = import.meta.env.VITE_API_URL || '/api';

async function request<T extends ApiResponse<unknown>>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const config: RequestInit = { ...options };

  if (config.body && !config.headers) {
    config.headers = { 'Content-Type': 'application/json' };
  }

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, config);
  } catch (err) {
    throw buildApiError('Network error. Please try again.', undefined);
  }

  let parsed: unknown;
  try {
    parsed = await response.json();
  } catch (err) {
    if (!response.ok) {
      throw buildApiError(
        response.statusText || 'Request failed',
        response.status,
      );
    }
    throw buildApiError('Malformed response from server', response.status);
  }

  if (!response.ok) {
    const body = parsed as ApiFailure | undefined;
    const message =
      typeof body?.message === 'string' && body.message.trim().length > 0
        ? body.message
        : response.statusText || 'Something went wrong';
    throw buildApiError(message, response.status);
  }

  return parsed as T;
}

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

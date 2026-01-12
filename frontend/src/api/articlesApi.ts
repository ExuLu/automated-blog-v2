import type {
  ApiError,
  ApiFailure,
  ApiResponse,
  ArticlePayload,
  ArticlesPayload,
} from '../types/article';

const API_URL = import.meta.env.VITE_API_URL || '/api';

async function request<T extends ApiResponse<unknown>>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const config: RequestInit = { ...options };

  if (config.body && !config.headers) {
    config.headers = { 'Content-Type': 'application/json' };
  }

  const response = await fetch(`${API_URL}${path}`, config);
  const parsed = (await response.json()) as unknown;

  if (!response.ok) {
    const body = parsed as ApiFailure | undefined;
    const message = body?.message || 'Something went wrong';
    const error: ApiError = new Error(message);
    error.status = response.status;
    throw error;
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
    config
  );
  return result.data.article;
}

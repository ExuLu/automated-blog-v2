export interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export type ApiResponse<TData> = {
  status: 'success' | 'fail' | 'error';
  data: TData;
};

export type ApiFailure = { status: 'fail' | 'error'; message?: string; data?: unknown };

export type ArticlesPayload = { articles: Article[] };
export type ArticlePayload = { article: Article };
export type ApiError = Error & { status?: number };

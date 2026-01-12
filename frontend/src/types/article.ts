export interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export type ArticlesPayload = { articles: Article[] };
export type ArticlePayload = { article: Article };

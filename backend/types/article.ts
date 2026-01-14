export type ArticleInput = { title?: string; content?: string };

export type ArticleRecord = {
  title: string;
  content: string;
  id: string;
  createdAt: string;
};

export type TopicInput = { topic?: string };
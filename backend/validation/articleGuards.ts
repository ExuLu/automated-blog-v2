import { ArticleInput } from "../types/article.js";

export const isArticleInput = (article: unknown): article is ArticleInput => {
  if (!article || typeof article !== 'object') return false;
  const partialArticleInput = article as Partial<ArticleInput>;

  return (
    typeof partialArticleInput.title === 'string' &&
    typeof partialArticleInput.content === 'string' &&
    !!partialArticleInput.content.trim() &&
    !!partialArticleInput.title.trim()
  );
};

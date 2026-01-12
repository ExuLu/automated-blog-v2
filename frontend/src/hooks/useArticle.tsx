import { useEffect, useState } from 'react';

import { getArticleById } from '../api/articlesApi';

import type { Article } from '../types/article';
import type { AppError } from '../types/error';

interface UseArticleResult {
  article: Article | null;
  isLoading: boolean;
  error: string | null;
}

type ArticleState = Article | null;

export default function useArticle(id: string): UseArticleResult {
  const [article, setArticle] = useState<ArticleState>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<AppError>(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadArticle() {
      try {
        setIsLoading(true);
        setError(null);

        const articleData = await getArticleById(id);

        if (!isCancelled) {
          setArticle(articleData);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(
            err instanceof Error ? err.message : 'Failed to load article'
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }
    loadArticle();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  return { article, isLoading, error };
}

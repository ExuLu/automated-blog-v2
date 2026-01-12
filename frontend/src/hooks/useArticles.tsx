import { useCallback, useEffect, useState } from 'react';
import { getAllArticles } from '../api/articlesApi';
import type { Article } from '../types/article';

interface UseArticlesResult {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
type AppError = string | null;

export default function useArticles(): UseArticlesResult {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AppError>(null);

  const loadArticles = useCallback<() => Promise<void>>(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const articlesData = await getAllArticles();
      setArticles(articlesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load articles');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  return { articles, isLoading, error, refetch: loadArticles };
}

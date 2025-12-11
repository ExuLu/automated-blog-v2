import { useCallback, useEffect, useState } from 'react';
import { getAllArticles } from '../api/articlesApi';

export default function useArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const articlesData = await getAllArticles();
      setArticles(articlesData);
    } catch (err) {
      setError(err.message || 'Failed to load articles');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  return { articles, isLoading, error, refetch: loadArticles };
}

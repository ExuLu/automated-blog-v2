import { useEffect, useState } from 'react';
import { getAllArticles } from '../api/articlesApi';

export default function useArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadArticles() {
      try {
        setIsLoading(true);
        setError(null);
        const articlesData = await getAllArticles();
        if (!isCancelled) {
          setArticles(articlesData);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message || 'Failed to load articles');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadArticles();

    return () => {
      isCancelled = true;
    };
  }, []);

  return { articles, isLoading, error };
}

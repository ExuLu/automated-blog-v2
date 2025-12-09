import { useEffect, useState } from 'react';
import { getArticleById } from '../api/articlesApi';

export default function useArticle(id) {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

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
          setError(err.message || 'Failed to load an article');
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

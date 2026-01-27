import { useQuery } from '@tanstack/react-query';
import { getAllArticles } from '../api/articlesApi';

import type { Article } from '../types/article';
import type { ApiError } from '../types/error';

export default function useArticles() {
  const {
    data: articles,
    error,
    isLoading,
  } = useQuery<Article[], ApiError>({
    queryKey: ['articles'],
    queryFn: getAllArticles,
  });

  return { articles, error, isLoading };
}

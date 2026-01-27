import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getArticleById } from '../services/articlesApi';

import type { Article } from '../types/article';
import type { ApiError } from '../types/error';

export default function useArticle(articleId?: string) {
  const queryClient = useQueryClient();

  if (!articleId) {
    return { article: undefined, error: undefined, isLoading: false };
  }

  const {
    data: article,
    error,
    isLoading,
  } = useQuery<Article, ApiError>({
    queryKey: ['article', articleId],
    queryFn: () => getArticleById(articleId!),
    enabled: !!articleId,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    placeholderData: () => {
      const articles = queryClient.getQueryData<Article[]>(['articles']);
      return articles?.find((a) => a.id === articleId);
    },
  });

  return { article, error, isLoading };
}

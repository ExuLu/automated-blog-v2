import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getArticleById } from '../api/articlesApi';

import type { Article } from '../types/article';
import type { ApiError } from '../types/error';

export default function useArticle() {
  const { id: articleId } = useParams();

  const {
    data: article,
    error,
    isLoading,
  } = useQuery<Article, ApiError>({
    queryKey: ['articles', articleId],
    queryFn: () => getArticleById(articleId!),
    enabled: !!articleId,
  });

  return { article, error, isLoading };
}

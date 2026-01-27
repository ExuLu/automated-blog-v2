import { getArticleById } from '../api/articlesApi';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function useArticle() {
  const { id } = useParams();
  if (!id) return { article: null };

  const articleId = id;

  const {
    data: article,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['articles', articleId],
    queryFn: () => getArticleById(articleId),
  });

  return { article, error, isLoading };
}

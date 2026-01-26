import { useQuery } from '@tanstack/react-query';
import { getAllArticles } from '../api/articlesApi';

export default function useArticles() {
  const {
    data: articles,
    error,
    isLoading,
  } = useQuery({ queryKey: ['cabins'], queryFn: getAllArticles });

  return { articles, error, isLoading };
}

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { generateAndAddArticle } from '../api/articlesApi';

import type { Article } from '../types/article';
import type { ApiError } from '../types/error';

export default function useCreateArticle() {
  const queryClient = useQueryClient();

  const {
    mutate: generateArticle,
    isPending: isGenerating,
    error,
    reset,
  } = useMutation<Article, ApiError, string>({
    mutationFn: generateAndAddArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      reset();
    },
  });

  return {
    generateArticle,
    isGenerating,
    error,
    resetError: reset,
  };
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generateAndAddArticle } from '../api/articlesApi';
import { useState } from 'react';

export default function useCreateArticle() {
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutate: generateArticle, isPending: isGenerating } = useMutation({
    mutationFn: generateAndAddArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return {
    generateArticle,
    isGenerating,
    error,
    resetError: () => setError(null),
  };
}

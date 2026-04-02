import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Category } from '../backend';

interface PostProjectParams {
  title: string;
  description: string;
  budgetRange: [bigint, bigint];
  category: Category;
}

export function usePostProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: PostProjectParams) => {
      if (!actor) throw new Error('Actor not available');
      return actor.postProject(params.title, params.description, params.budgetRange, params.category);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

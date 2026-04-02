import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Category, Project } from '../backend';

export function useBrowseProjects(category: Category | null, minBudget: bigint | null, maxBudget: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Project[]>({
    queryKey: ['projects', category, minBudget?.toString(), maxBudget?.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.browseProjects(category, minBudget, maxBudget);
    },
    enabled: !!actor && !isFetching,
  });
}

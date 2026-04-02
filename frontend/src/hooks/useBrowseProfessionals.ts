import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Specialty, Professional } from '../backend';

export function useBrowseProfessionals(specialty: Specialty | null, minExperience: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Professional[]>({
    queryKey: ['professionals', specialty, minExperience?.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.browseProfessionals(specialty, minExperience);
    },
    enabled: !!actor && !isFetching,
  });
}

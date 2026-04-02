import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Professional } from '../backend';

export function useGetProfessional(professionalId: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<Professional | null>({
    queryKey: ['professional', professionalId.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProfessional(professionalId);
    },
    enabled: !!actor && !isFetching,
  });
}

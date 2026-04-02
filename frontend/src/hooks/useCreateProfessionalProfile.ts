import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Specialty } from '../backend';

interface CreateProfessionalProfileParams {
  name: string;
  specialty: Specialty;
  experience: bigint;
  serviceDescription: string;
}

export function useCreateProfessionalProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreateProfessionalProfileParams) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createProfessionalProfile(params.name, params.specialty, params.experience, params.serviceDescription);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['professionals'] });
    },
  });
}

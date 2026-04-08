'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { favoritesApi } from '../api/favorites.api';

export const favoriteKeys = {
  list: () => ['favorites', 'list'] as const,
  count: () => ['favorites', 'count'] as const,
  status: (meetingId: number) => ['favorites', 'status', meetingId] as const,
} as const;

export const useFavoritesCount = (initialCount: number, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: favoriteKeys.count(),
    queryFn: () => favoritesApi.getCount(),
    initialData: initialCount,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    ...options,
  });
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ meetingId, isFavorited }: { meetingId: number; isFavorited: boolean }) =>
      isFavorited ? favoritesApi.favoriteDelete(meetingId) : favoritesApi.favoritePost(meetingId),
    onMutate: async ({ meetingId, isFavorited }) => {
      await queryClient.cancelQueries({ queryKey: favoriteKeys.status(meetingId) });
      const previous = queryClient.getQueryData<boolean>(favoriteKeys.status(meetingId));
      queryClient.setQueryData(favoriteKeys.status(meetingId), !isFavorited);
      return { previous, meetingId };
    },
    onError: (_err, { meetingId }, context) => {
      queryClient.setQueryData(favoriteKeys.status(meetingId), context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: favoriteKeys.count() });
    },
  });
};

export const useFavoriteMeeting = (initialIsFavorited: boolean, meetingId: number) => {
  const { data: isFavorited = initialIsFavorited } = useQuery({
    queryKey: favoriteKeys.status(meetingId),
    queryFn: () => initialIsFavorited,
    initialData: initialIsFavorited,
    staleTime: Infinity,
    enabled: meetingId !== -1,
  });

  const { mutate: toggleMutate, isPending } = useToggleFavorite();

  const toggleFavorite = () => {
    if (isPending) return;
    toggleMutate({ meetingId, isFavorited });
  };

  return { isFavorited, toggleFavorite, isPending };
};

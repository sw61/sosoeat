'use client';

import { useQuery } from '@tanstack/react-query';

import { favoriteKeys, useToggleFavorite as useToggleFavoriteMutation } from './favorites.queries';

export const useFavoriteMeeting = (initialIsFavorited: boolean, meetingId: number) => {
  const { data: isFavorited = initialIsFavorited } = useQuery({
    queryKey: favoriteKeys.status(meetingId),
    queryFn: () => initialIsFavorited,
    initialData: initialIsFavorited,
    staleTime: Infinity,
  });

  const { mutate: toggleMutate, isPending } = useToggleFavoriteMutation();

  const toggleFavorite = () => {
    if (isPending) return;
    toggleMutate({ meetingId, isFavorited });
  };

  return { isFavorited, toggleFavorite, isPending };
};

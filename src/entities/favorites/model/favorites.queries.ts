import { useQuery } from '@tanstack/react-query';

import { favoritesApi } from '../api/favorites.api';

import { favoriteKeys } from './favorite-keys';

const MODULE_LOAD_TIME = Date.now();

export const useFavoritesCount = (initialCount: number, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: favoriteKeys.count(),
    queryFn: () => favoritesApi.getCount(),
    initialData: initialCount,
    initialDataUpdatedAt: MODULE_LOAD_TIME,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    placeholderData: (prev) => prev,
    ...options,
  });
};

export const useFavoriteList = () =>
  useQuery({
    queryKey: favoriteKeys.list(),
    queryFn: favoritesApi.fetchList,
    staleTime: 1000 * 60 * 5,
  });

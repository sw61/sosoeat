import { useEffect, useState } from 'react';

import { favoritesApi } from '../api/favorites.api';

export const useFavoriteMeeting = (initialIsFavorited: boolean) => {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);

  useEffect(() => {
    setIsFavorited(initialIsFavorited);
  }, [initialIsFavorited]);

  const toggleFavorite = async (meetingId: number) => {
    const prev = isFavorited;
    setIsFavorited(!prev); // Optimistic UI
    try {
      if (prev) {
        await favoritesApi.favoriteDelete(meetingId);
      } else {
        await favoritesApi.favoritePost(meetingId);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      setIsFavorited(prev); // 롤백
    }
  };

  return { isFavorited, toggleFavorite };
};

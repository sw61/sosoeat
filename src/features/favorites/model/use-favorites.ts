'use client';

import { useEffect, useRef, useState } from 'react';

import { favoritesApi } from '../api/favorites.api';

export const useFavoriteMeeting = (initialIsFavorited: boolean) => {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [isPending, setIsPending] = useState(false);
  const isPendingRef = useRef(false);

  useEffect(() => {
    setIsFavorited(initialIsFavorited);
  }, [initialIsFavorited]);

  const toggleFavorite = async (meetingId: number) => {
    if (isPendingRef.current) {
      return;
    }

    isPendingRef.current = true;
    setIsPending(true);

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
      setIsFavorited(prev); // Roll back on failure
    } finally {
      isPendingRef.current = false;
      setIsPending(false);
    }
  };

  return { isFavorited, isPending, toggleFavorite };
};

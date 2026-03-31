import { useEffect, useState } from 'react';

import { HeartRepository } from '../repository/heart.repository';

const useFavoriteMeeting = (initialIsFavorited: boolean) => {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);

  useEffect(() => {
    setIsFavorited(initialIsFavorited);
  }, [initialIsFavorited]);

  const toggleFavorite = async (meetingId: number) => {
    const prev = isFavorited;

    setIsFavorited(!prev); // Optimistic UI 업데이트
    try {
      if (prev) {
        await HeartRepository.favoriteDelete(meetingId);
      } else {
        await HeartRepository.favoritePost(meetingId);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      setIsFavorited(prev); // 롤백
    }
  };

  return { isFavorited, toggleFavorite };
};

export default useFavoriteMeeting;

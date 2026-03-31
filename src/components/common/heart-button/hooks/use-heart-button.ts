import { useState } from 'react';

import { HeartRepository } from '../repository/heart.repository';

const useFavoriteMeeting = (initialIsFavorited: boolean) => {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);

  const toggleFavorite = async (meetingId: number) => {
    setIsFavorited((prev) => !prev); // Optimistic UI 업데이트
    try {
      if (isFavorited) {
        await HeartRepository.favoriteDelete(meetingId);
      } else {
        await HeartRepository.favoritePost(meetingId);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      setIsFavorited((prev) => !prev); // 롤백
    }
  };

  return { isFavorited, toggleFavorite };
};

export default useFavoriteMeeting;

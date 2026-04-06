import favoriteApi from './api/favorite.api';

export const HeartRepository = {
  favoritePost: favoriteApi.favoritePost,
  favoriteDelete: favoriteApi.favoriteDelete,
};

import { createSearchParamsCache, parseAsStringEnum } from 'nuqs/server';

export const sosotalkSearchParamsCache = createSearchParamsCache({
  tab: parseAsStringEnum(['all', 'popular']).withDefault('all'),
  sort: parseAsStringEnum(['comments', 'likes', 'latest']).withDefault('latest'),
});

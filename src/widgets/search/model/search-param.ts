import { parseAsIsoDate } from 'nuqs';
import { createSearchParamsCache } from 'nuqs/server';

export const searchParamsCache = createSearchParamsCache({
  dateStart: parseAsIsoDate,
});

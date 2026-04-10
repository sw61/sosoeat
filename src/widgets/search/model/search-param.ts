import { createSearchParamsCache,parseAsIsoDate, parseAsStringEnum  } from 'nuqs/server';

export const searchParamsCache = createSearchParamsCache({
  dateStart: parseAsIsoDate,
  sortBy: parseAsStringEnum(['participantCount', 'dateTime', 'registrationEnd']).withDefault(
    'dateTime'
  ),
  sortOrder: parseAsStringEnum(['asc', 'desc']).withDefault('asc'),
  queryKeyword: parseAsStringEnum(['all', 'groupEat', 'groupBuy']).withDefault('groupEat'),
});

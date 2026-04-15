import {
  createSearchParamsCache,
  parseAsIsoDate,
  parseAsString,
  parseAsStringEnum,
} from 'nuqs/server';

export const searchParamsCache = createSearchParamsCache({
  dateStart: parseAsIsoDate,
  dateEnd: parseAsIsoDate,
  search: parseAsString.withDefault(''),
  typeFilter: parseAsStringEnum(['all', 'groupEat', 'groupBuy']).withDefault('all'),
  sortBy: parseAsStringEnum(['participantCount', 'dateTime', 'registrationEnd']).withDefault(
    'dateTime'
  ),
  sortOrder: parseAsStringEnum(['asc', 'desc']).withDefault('asc'),
});

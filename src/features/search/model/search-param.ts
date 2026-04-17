import { startOfDay } from 'date-fns';
import { SearchParams } from 'nuqs';
import {
  createSearchParamsCache,
  parseAsIsoDate,
  parseAsString,
  parseAsStringEnum,
} from 'nuqs/server';

export const searchParamsSchema = createSearchParamsCache({
  dateStart: parseAsIsoDate,
  dateEnd: parseAsIsoDate,
  search: parseAsString.withDefault(''),
  typeFilter: parseAsStringEnum(['all', 'groupEat', 'groupBuy']).withDefault('all'),
  sortBy: parseAsStringEnum(['participantCount', 'dateTime', 'registrationEnd']).withDefault(
    'dateTime'
  ),
  sortOrder: parseAsStringEnum(['asc', 'desc']).withDefault('asc'),
});

export const getMeetingSearchParams = async (searchParams: Promise<unknown>) => {
  const { dateStart, dateEnd, search, typeFilter, sortBy, sortOrder } = searchParamsSchema.parse(
    await (searchParams as Promise<SearchParams>)
  );

  const finalDateStart = dateStart ?? startOfDay(new Date());
  const requestParams = {
    sortBy,
    sortOrder,
    typeFilter: typeFilter === 'all' ? undefined : typeFilter,
    dateEnd: dateEnd ? dateEnd.toISOString() : undefined,
    dateStart: finalDateStart.toISOString(),
    keyword: search,
  };

  return requestParams;
};

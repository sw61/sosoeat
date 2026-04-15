import * as Sentry from '@sentry/nextjs';

import { getMeetings } from '@/entities/meeting/index.server';

import { getMeetingSearchParams } from '../model/search-param';

export const getInitialSearchData = async (
  requestParams: Awaited<ReturnType<typeof getMeetingSearchParams>>
) => {
  try {
    const data = await getMeetings(requestParams);
    return data;
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        area: 'search',
        action: 'load-initial-data',
      },
      extra: {
        requestParams,
      },
    });
    return null;
  }
};

export default getInitialSearchData;

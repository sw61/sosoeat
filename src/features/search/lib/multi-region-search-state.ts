import type { Meeting, MeetingListResult } from '@/entities/meeting';

export const buildRegionKey = (region?: string | string[]) =>
  Array.isArray(region) ? [...region].sort().join(',') : (region ?? '');

export const buildRegionRequestKey = (regionKey: string, region: string) =>
  `${regionKey}:${region}`;

type MergeRegionResultParams = {
  accumulated: Record<string, Array<Meeting>>;
  regionKey: string;
  region: string;
  result: MeetingListResult;
};

export const mergeRegionResult = ({
  accumulated,
  regionKey,
  region,
  result,
}: MergeRegionResultParams) => {
  const requestKey = buildRegionRequestKey(regionKey, region);

  return {
    nextAccumulated: {
      ...accumulated,
      [requestKey]: [...(accumulated[requestKey] || []), ...(result.data ?? [])],
    },
    nextHasMore: result.hasMore,
  };
};

export const combineRegionMeetings = (
  regions: string[],
  accumulated: Record<string, Array<Meeting>>,
  regionKey: string
) => regions.flatMap((region) => accumulated[buildRegionRequestKey(regionKey, region)] || []);

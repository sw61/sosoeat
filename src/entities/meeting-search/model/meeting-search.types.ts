import { TeamIdMeetingsGetRequest } from '@/shared/types/generated-client/apis/MeetingsApi';

export type MeetingSortBy = NonNullable<TeamIdMeetingsGetRequest['sortBy']>;
export type MeetingSortOrder = NonNullable<TeamIdMeetingsGetRequest['sortOrder']>;
export type MeetingTypeFilter = 'all' | 'groupEat' | 'groupBuy';
export type MeetingSearchOptions = Omit<TeamIdMeetingsGetRequest, 'teamId' | 'region'> & {
  region?: string | string[];
};
export type MeetingSearchRequest = MeetingSearchOptions;

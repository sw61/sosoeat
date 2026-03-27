type MeetingFilterBarProps = {
  label: string;
  sortBy: 'participantCount' | 'dateTime' | 'registrationEnd';
  sortOrder: 'asc' | 'desc';
};

export const options: MeetingFilterBarProps[] = [
  { label: '인기순', sortBy: 'participantCount', sortOrder: 'desc' },
  { label: '모임일 임박순', sortBy: 'dateTime', sortOrder: 'asc' },
  { label: '모집 마감 임박 순', sortBy: 'registrationEnd', sortOrder: 'asc' },
  { label: '모집 마감 먼 순', sortBy: 'registrationEnd', sortOrder: 'desc' },
];

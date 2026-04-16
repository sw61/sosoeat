import type { Meeting, MeetingSortBy, MeetingSortOrder } from '@/entities/meeting';

export const sortMeetings = (
  meetings: Meeting[],
  sortBy?: MeetingSortBy,
  sortOrder?: MeetingSortOrder
) => {
  const sortedMeetings = [...meetings];
  const order = sortOrder === 'asc' ? 1 : -1;

  switch (sortBy) {
    case 'participantCount':
      sortedMeetings.sort((a, b) => (a.participantCount - b.participantCount) * order);
      break;

    case 'dateTime':
      sortedMeetings.sort(
        (a, b) => (new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()) * order
      );
      break;

    case 'registrationEnd':
      sortedMeetings.sort((a, b) => a.registrationEnd.localeCompare(b.registrationEnd) * order);
      break;

    default:
      break;
  }

  return sortedMeetings;
};

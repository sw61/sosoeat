import { format } from 'date-fns';

import type { Meeting } from '@/entities/meeting';

import type { MeetingEditFormData } from './meeting-edit-modal.types';

/**
 * Meeting 상세 데이터를 MeetingEditModal의 defaultValues로 변환합니다.
 */
export const toMeetingEditFormData = (meeting: Meeting): MeetingEditFormData => {
  const dateTime = new Date(meeting.dateTime);
  const registrationEnd = new Date(meeting.registrationEnd);

  return {
    type: meeting.type,
    name: meeting.name,
    region: meeting.region,
    address: meeting.address,
    latitude: meeting.latitude ?? undefined,
    longitude: meeting.longitude ?? undefined,
    image: meeting.image,
    description: meeting.description,
    meetingDate: format(dateTime, 'yyyy-MM-dd'),
    meetingTime: format(dateTime, 'HH:mm'),
    registrationEndDate: format(registrationEnd, 'yyyy-MM-dd'),
    registrationEndTime: format(registrationEnd, 'HH:mm'),
    capacity: meeting.capacity,
  };
};

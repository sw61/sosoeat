import {
  FavoriteList,
  UserMeeting,
  UserMeetingRoleEnum,
  UserMeetingsResponse,
} from '@/shared/types/generated-client';

import { MyPageCardProps } from '../ui/mypage-card/mypage-card.types';

const parseDateTime = (dateTime: Date | string) => {
  const date = new Date(dateTime);
  return {
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  };
};

const isCompleted = (dateTime: Date | string) => new Date(dateTime) < new Date();

const toVariant = (type?: string): 'groupBuy' | 'groupEat' =>
  type === 'groupBuy' ? 'groupBuy' : 'groupEat';

const toImageUrl = (image?: string) => (image?.startsWith('https://') ? image : undefined);

const toMeetingCard = (m: UserMeeting): MyPageCardProps => ({
  meetingId: m.id,
  href: `/meetings/${m.id}`,
  title: m.name,
  currentCount: m.participantCount,
  maxCount: m.capacity,
  location: m.region,
  ...parseDateTime(m.dateTime),
  variant: 'groupEat',
  isCompleted: isCompleted(m.dateTime),
  isHost: m.role === UserMeetingRoleEnum.Host,
  isFavorited: false,
});

export const toUserMeetingCards = (data: UserMeetingsResponse): MyPageCardProps[] =>
  data.data.map(toMeetingCard);

export const toFavoriteMeetingCards = (data: FavoriteList): MyPageCardProps[] =>
  data.data.map((f) => ({
    meetingId: f.meeting.id,
    href: `/meetings/${f.meeting.id}`,
    title: f.meeting.name,
    currentCount: f.meeting.participantCount,
    maxCount: f.meeting.capacity,
    location: f.meeting.region,
    ...parseDateTime(f.meeting.dateTime),
    variant: toVariant(f.meeting.type),
    imageUrl: toImageUrl(f.meeting.image),
    confirmedAt: f.meeting.confirmedAt ?? null,
    isCompleted: isCompleted(f.meeting.dateTime),
    isHost: false,
    isFavorited: true,
  }));

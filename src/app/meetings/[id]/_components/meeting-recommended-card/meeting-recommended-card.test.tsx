import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Meeting } from '@/types/meeting';

import RecommendedMeetingCard from './meeting-recommended-card';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

jest.mock('@/components/common/heart-button', () => ({
  HeartButton: ({ isFavorited }: { isFavorited?: boolean }) => (
    <button aria-label={isFavorited ? '좋아요 취소' : '좋아요'}>heart</button>
  ),
}));

const mockMeeting: Meeting = {
  id: 1,
  name: '강남 맛집 탐방 함께해요!',
  type: 'groupEat',
  region: '서울 강남구',
  address: '서울 강남구 테헤란로 123',
  latitude: 37.5065,
  longitude: 127.0536,
  dateTime: '2024-03-15T09:30:00.000Z',
  registrationEnd: '2027-03-14T23:59:59.000Z',
  participantCount: 3,
  capacity: 6,
  image: '/test-image.jpg',
  description: '',
  hostId: 1,
  createdBy: '1',
  updatedAt: '2024-03-01T00:00:00.000Z',
  host: { id: 1, name: '김소소' },
  isFavorited: false,
};

describe('RecommendedMeetingCard', () => {
  it('모임 이름, 지역, 날짜, 시간이 렌더링된다', () => {
    render(<RecommendedMeetingCard meeting={mockMeeting} />);

    expect(screen.getByText('강남 맛집 탐방 함께해요!')).toBeInTheDocument();
    expect(screen.getByText('서울 강남구')).toBeInTheDocument();
    expect(screen.getByText('3월 15일')).toBeInTheDocument();
    expect(screen.getByText('18:30')).toBeInTheDocument();
  });

  it('카드 클릭 시 onClick이 meeting.id와 함께 호출된다', async () => {
    const onClick = jest.fn();
    render(<RecommendedMeetingCard meeting={mockMeeting} onClick={onClick} />);

    await userEvent.click(screen.getByText('강남 맛집 탐방 함께해요!'));

    expect(onClick).toHaveBeenCalledWith(1);
  });

  it('isFavorited가 false이면 좋아요 버튼이 렌더링된다', () => {
    render(<RecommendedMeetingCard meeting={mockMeeting} />);

    expect(screen.getByRole('button', { name: '좋아요' })).toBeInTheDocument();
  });

  it('isFavorited가 true이면 좋아요 취소 버튼이 렌더링된다', () => {
    render(<RecommendedMeetingCard meeting={{ ...mockMeeting, isFavorited: true }} />);

    expect(screen.getByRole('button', { name: '좋아요 취소' })).toBeInTheDocument();
  });
});

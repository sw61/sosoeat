import { render, screen } from '@testing-library/react';

import type { MeetingWithHost } from '@/shared/types/generated-client';

import { useTimeFormatter } from '../../model/use-time-formater';

import { MainPageCard } from './main-page-card';

jest.mock('../../model/use-detail-router', () => ({
  useDetailRouter: () => ({
    handleCardClick: jest.fn(),
    handleCardKeyDown: jest.fn(),
  }),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    fill: _fill,
    ...rest
  }: {
    src: string;
    alt: string;
    fill?: boolean;
    [key: string]: unknown;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} data-testid="main-page-card-image" {...rest} />
  ),
}));
function createMockMeeting(overrides: Partial<MeetingWithHost> = {}): MeetingWithHost {
  const now = new Date('2025-03-19T10:00:00+09:00');
  const registrationEnd = new Date(now);
  registrationEnd.setDate(registrationEnd.getDate() + 7);

  return {
    id: 1,
    teamId: 'sosoeattest',
    name: '강남역에서 점심 같이 먹어요',
    type: 'groupEat',
    region: '서울 강남구',
    address: '서울특별시 강남구',
    latitude: 37.498,
    longitude: 127.028,
    dateTime: new Date('2025-04-24T18:30:00+09:00'),
    registrationEnd,
    capacity: 6,
    participantCount: 3,
    image:
      'https://plus.unsplash.com/premium_photo-1774002133542-bbef3f2cc3d5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: '',
    canceledAt: now,
    confirmedAt: new Date('2025-03-22T12:00:00+09:00'),
    hostId: 1,
    createdBy: 1,
    createdAt: now,
    updatedAt: now,
    isCompleted: false,
    host: {
      id: 1,
      name: '김소소',
      image:
        'https://plus.unsplash.com/premium_photo-1774002133542-bbef3f2cc3d5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    ...overrides,
  };
}

jest.mock('@/entities/meeting/model/use-time-formater', () => ({
  useTimeFormatter: jest.fn(),
}));

describe('MainPageCard', () => {
  beforeAll(() => {
    jest.useFakeTimers({ now: new Date('2025-03-19T10:00:00+09:00') });
  });
  beforeEach(() => {
    (useTimeFormatter as jest.Mock).mockReturnValue({
      contentText: '모집완료 1일 0시간 남았어요!',
      isEnded: false,
      showCountdown: true,
    });
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  describe('렌더링', () => {
    it('모임 제목이 표시된다', () => {
      const meeting = createMockMeeting({ name: '강남역 점심 모임' });
      render(<MainPageCard meeting={meeting} />);

      expect(screen.getByRole('heading', { name: '강남역 점심 모임' })).toBeInTheDocument();
    });

    it('지역이 표시된다', () => {
      const meeting = createMockMeeting({ region: '서울 건대입구' });
      render(<MainPageCard meeting={meeting} />);

      expect(screen.getByText('서울 건대입구')).toBeInTheDocument();
    });

    it('참여 인원이 표시된다', () => {
      const meeting = createMockMeeting({ participantCount: 4, capacity: 10 });
      render(<MainPageCard meeting={meeting} />);

      expect(screen.getByText('4/10명 참여중')).toBeInTheDocument();
    });

    it('호스트 이름이 표시된다', () => {
      const meeting = createMockMeeting({
        host: { id: 1, name: '홍길동', image: 'https://example.com/avatar.jpg' },
      });
      render(<MainPageCard meeting={meeting} />);

      expect(screen.getByText('홍길동')).toBeInTheDocument();
    });

    it('좋아요 버튼이 렌더링된다', () => {
      const meeting = createMockMeeting();
      render(
        <MainPageCard meeting={meeting} renderFavoriteButton={() => <button>좋아요</button>} />
      );

      expect(screen.getByRole('button', { name: '좋아요' })).toBeInTheDocument();
    });
  });

  describe('type(모임 유형)', () => {
    it('type이 groupEat일 때 함께먹기 배지가 표시된다', () => {
      const meeting = createMockMeeting({ type: 'groupEat' });
      render(<MainPageCard meeting={meeting} />);

      expect(screen.getByText('함께먹기')).toBeInTheDocument();
    });

    it('type이 groupBuy일 때 공동구매 배지가 표시된다', () => {
      const meeting = createMockMeeting({ type: 'groupBuy' });
      render(<MainPageCard meeting={meeting} />);

      expect(screen.getByText('공동구매')).toBeInTheDocument();
    });
  });

  describe('진행률', () => {
    it('progressbar가 렌더링된다', () => {
      const meeting = createMockMeeting({ participantCount: 2, capacity: 4 });
      render(<MainPageCard meeting={meeting} />);

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('참여율에 따라 progress value가 계산된다', () => {
      const meeting = createMockMeeting({ participantCount: 3, capacity: 6 });
      render(<MainPageCard meeting={meeting} />);

      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '50');
    });
  });

  describe('개설 상태', () => {
    it('confirmedAt이 null이면 개설대기가 표시된다', () => {
      const meeting = {
        ...createMockMeeting(),
        confirmedAt: null,
      } as unknown as MeetingWithHost;
      render(<MainPageCard meeting={meeting} />);

      expect(screen.queryByText('개설확정')).not.toBeInTheDocument();
      expect(screen.getByText('개설대기')).toBeInTheDocument();
    });

    it('confirmedAt이 있으면 개설확정이 표시된다', () => {
      const meeting = createMockMeeting({
        confirmedAt: new Date('2025-03-22T12:00:00+09:00'),
      });
      render(<MainPageCard meeting={meeting} />);

      expect(screen.getByText('개설확정')).toBeInTheDocument();
    });
  });

  describe('마감 상태', () => {
    it('마감된 모임일 때 마감 종료가 표시된다', () => {
      (useTimeFormatter as jest.Mock).mockReturnValue({
        contentText: '',
        isEnded: true,
        showCountdown: false,
      });
      const pastDate = new Date('2025-03-19T09:00:00+09:00');
      const meeting = createMockMeeting({ registrationEnd: pastDate });
      render(<MainPageCard meeting={meeting} />);

      expect(screen.getByText('마감 종료')).toBeInTheDocument();
    });

    it('마감 전 모임일 때 남은 시간이 표시된다', async () => {
      const futureDate = new Date('2025-03-26T10:00:00+09:00');
      const meeting = createMockMeeting({ registrationEnd: futureDate });

      (useTimeFormatter as jest.Mock).mockReturnValue({
        contentText: '모집완료 1일 0시간 남았어요!',
        isEnded: false,
        showCountdown: true,
      });
      render(<MainPageCard meeting={meeting} />);

      // 마감 전
      expect(await screen.findByText(/남았어요!/)).toBeInTheDocument();

      // 마감 후
      expect(await screen.findByText(/모집완료/)).toBeInTheDocument();
    });
  });
});

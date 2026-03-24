import { render, screen } from '@testing-library/react';

import { MainPageCard } from '@/components/common/main-page-card/main-page-card';
import type { Meeting } from '@/components/common/main-page-card/main-page-card.types';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    fill,
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

const createMockMeeting = (overrides: Partial<Meeting> = {}): Meeting => {
  const now = new Date('2025-03-19T10:00:00+09:00');
  const registrationEnd = new Date(now);
  registrationEnd.setDate(registrationEnd.getDate() + 7);

  return {
    name: '강남역에서 점심 같이 먹어요',
    type: 'groupEat',
    variant: 'groupEat',
    region: '서울 강남구',
    dateTime: '2025-04-24T18:30:00',
    registrationEnd: registrationEnd.toISOString(),
    capacity: 6,
    participantCount: 3,
    image: 'https://example.com/image.jpg',
    canceledAt: null,
    confirmedAt: null,
    hostId: 1,
    createdBy: 1,
    createdAt: '2025-03-22T00:00:00',
    updatedAt: '2025-03-21T00:00:00',
    host: {
      id: 1,
      name: '김소소',
      image: 'https://example.com/avatar.jpg',
    },
    ...overrides,
  };
};

describe('MainPageCard', () => {
  beforeAll(() => {
    jest.useFakeTimers({ now: new Date('2025-03-19T10:00:00+09:00') });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('렌더링', () => {
    it('모임 제목이 표시된다', () => {
      const meeting = createMockMeeting({ name: '강남역 점심 모임' });
      render(<MainPageCard {...meeting} />);

      expect(screen.getByRole('heading', { name: '강남역 점심 모임' })).toBeInTheDocument();
    });

    it('지역이 표시된다', () => {
      const meeting = createMockMeeting({ region: '서울 건대입구' });
      render(<MainPageCard {...meeting} />);

      expect(screen.getByText('서울 건대입구')).toBeInTheDocument();
    });

    it('참여 인원이 표시된다', () => {
      const meeting = createMockMeeting({ participantCount: 4, capacity: 10 });
      render(<MainPageCard {...meeting} />);

      expect(screen.getByText('4/10명 참여중')).toBeInTheDocument();
    });

    it('호스트 이름이 표시된다', () => {
      const meeting = createMockMeeting({
        host: { id: 1, name: '홍길동', image: 'https://example.com/avatar.jpg' },
      });
      render(<MainPageCard {...meeting} />);

      expect(screen.getByText('홍길동')).toBeInTheDocument();
    });

    it('찜하기 버튼이 렌더링된다', () => {
      const meeting = createMockMeeting();
      render(<MainPageCard {...meeting} />);

      expect(screen.getByRole('button', { name: '찜하기' })).toBeInTheDocument();
    });
  });

  describe('variant', () => {
    it("variant='groupEat'일 때 함께먹기 배지가 표시된다", () => {
      const meeting = createMockMeeting({ variant: 'groupEat' });
      render(<MainPageCard {...meeting} />);

      expect(screen.getByText('함께먹기')).toBeInTheDocument();
    });

    it("variant='groupBuy'일 때 공동구매 배지가 표시된다", () => {
      const meeting = createMockMeeting({ variant: 'groupBuy' });
      render(<MainPageCard {...meeting} />);

      expect(screen.getByText('공동구매')).toBeInTheDocument();
    });
  });

  describe('진행률', () => {
    it('progressbar가 렌더링된다', () => {
      const meeting = createMockMeeting({ participantCount: 2, capacity: 4 });
      render(<MainPageCard {...meeting} />);

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('참여율에 따라 progress value가 계산된다', () => {
      const meeting = createMockMeeting({ participantCount: 3, capacity: 6 });
      render(<MainPageCard {...meeting} />);

      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '50');
    });
  });

  describe('개설 상태', () => {
    it('confirmedAt이 없으면 개설대기가 표시된다', () => {
      const meeting = createMockMeeting({ confirmedAt: null });
      render(<MainPageCard {...meeting} />);

      expect(screen.getByText('개설대기')).toBeInTheDocument();
    });

    it('confirmedAt이 있으면 개설완료가 표시된다', () => {
      const meeting = createMockMeeting({ confirmedAt: '2025-03-22T12:00:00' });
      render(<MainPageCard {...meeting} />);

      expect(screen.getByText('개설완료')).toBeInTheDocument();
    });
  });

  describe('마감 상태', () => {
    it('마감된 모임일 때 마감 종료가 표시된다', () => {
      const pastDate = new Date('2025-03-19T09:00:00+09:00'); // 1시간 전
      const meeting = createMockMeeting({ registrationEnd: pastDate.toISOString() });
      render(<MainPageCard {...meeting} />);

      expect(screen.getByText('마감 종료')).toBeInTheDocument();
    });

    it('마감 전 모임일 때 남은 시간이 표시된다', () => {
      const futureDate = new Date('2025-03-26T10:00:00+09:00'); // 7일 후
      const meeting = createMockMeeting({ registrationEnd: futureDate.toISOString() });
      render(<MainPageCard {...meeting} />);

      expect(screen.getByText(/남았어요|남음/)).toBeInTheDocument();
    });
  });
});

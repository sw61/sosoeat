import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { Meeting } from '@/types/meeting';

import { MeetingDetailCard } from './meeting-detail-card';
import type { MeetingRole, MeetingStatus } from './meeting-detail-card.types';

const mockMeeting: Meeting = {
  id: '1',
  name: '강남 맛집 탐방 함께해요!',
  type: 'groupEat',
  region: '서울 강남구',
  address: '서울 강남구 테헤란로 123',
  latitude: 37.5065,
  longitude: 127.0536,
  dateTime: '2024/03/15(금) 18:30',
  registrationEnd: '2024/03/14T23:59:59.000Z',
  participantCount: 3,
  capacity: 6,
  image: '',
  description: '',
  hostId: 1,
  createdBy: '1',
  updatedAt: '2024/03/01T00:00:00.000Z',
  host: { id: 1, name: '김소소' },
  isFavorited: false,
};

const DEFAULT_PROPS = {
  meeting: mockMeeting,
  role: 'participant' as const,
  status: 'open' as MeetingStatus,
  isJoined: false,
  isLiked: false,
};

describe('MeetingDetailCard', () => {
  it('모임 제목, 날짜, 지역명, 상세주소가 렌더링된다', () => {
    render(<MeetingDetailCard {...DEFAULT_PROPS} />);

    expect(screen.getByText('강남 맛집 탐방 함께해요!')).toBeInTheDocument(); // name
    expect(screen.getByText('2024/03/15(금) 18:30')).toBeInTheDocument(); // dateTime
    expect(screen.getByText('서울 강남구')).toBeInTheDocument(); // region
    expect(screen.getByText('서울 강남구 테헤란로 123')).toBeInTheDocument(); // address
  });

  describe('더보기(...) 버튼', () => {
    it('host 역할이면 더보기 버튼이 노출된다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} role="host" />);

      expect(screen.getByRole('button', { name: '더보기' })).toBeInTheDocument();
    });

    it('guest 역할이면 더보기 버튼이 노출되지 않는다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} role="guest" />);

      expect(screen.queryByRole('button', { name: '더보기' })).not.toBeInTheDocument();
    });

    it('participant 역할이면 더보기 버튼이 노출되지 않는다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} role="participant" />);

      expect(screen.queryByRole('button', { name: '더보기' })).not.toBeInTheDocument();
    });

    it('더보기 버튼 클릭 시 수정하기/삭제하기 메뉴가 열린다', async () => {
      const user = userEvent.setup();
      render(<MeetingDetailCard {...DEFAULT_PROPS} role="host" />);

      await user.click(screen.getByRole('button', { name: '더보기' }));

      expect(screen.getByText('수정하기')).toBeInTheDocument();
      expect(screen.getByText('삭제하기')).toBeInTheDocument();
    });

    it('수정하기 클릭 시 onEdit이 호출된다', async () => {
      const onEdit = jest.fn();
      const user = userEvent.setup();
      render(<MeetingDetailCard {...DEFAULT_PROPS} role="host" onEdit={onEdit} />);

      await user.click(screen.getByRole('button', { name: '더보기' }));
      await user.click(screen.getByText('수정하기'));

      expect(onEdit).toHaveBeenCalledTimes(1);
    });

    it('삭제하기 클릭 시 onDelete가 호출된다', async () => {
      const onDelete = jest.fn();
      const user = userEvent.setup();
      render(<MeetingDetailCard {...DEFAULT_PROPS} role="host" onDelete={onDelete} />);

      await user.click(screen.getByRole('button', { name: '더보기' }));
      await user.click(screen.getByText('삭제하기'));

      expect(onDelete).toHaveBeenCalledTimes(1);
    });
  });

  describe('액션 버튼', () => {
    it('status가 closed이면 "마감된 모임" 버튼이 disabled 상태로 렌더링된다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} status="closed" />);

      expect(screen.getByRole('button', { name: '마감된 모임' })).toBeDisabled();
    });

    it('guest이면 "참여하기" 버튼이 렌더링된다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} role="guest" />);

      expect(screen.getByRole('button', { name: '참여하기' })).toBeInTheDocument();
    });

    it('participant이고 미참여이면 "참여하기" 버튼이 렌더링된다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} role="participant" isJoined={false} />);

      expect(screen.getByRole('button', { name: '참여하기' })).toBeInTheDocument();
    });

    it('participant이고 참여 완료이면 "참여 취소하기" 버튼이 렌더링된다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} role="participant" isJoined={true} />);

      expect(screen.getByRole('button', { name: '참여 취소하기' })).toBeInTheDocument();
    });

    it('host이고 open 상태이면 "모임 확정하기" 버튼이 렌더링된다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} role="host" status="open" />);

      expect(screen.getByRole('button', { name: '모임 확정하기' })).toBeInTheDocument();
    });

    it('host이고 confirmed 상태이면 "공유하기" 버튼이 렌더링된다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} role="host" status="confirmed" />);

      expect(screen.getByRole('button', { name: '공유하기' })).toBeInTheDocument();
    });

    it('"참여하기" 클릭 시 onJoin이 호출된다', async () => {
      const onJoin = jest.fn();
      const user = userEvent.setup();
      render(
        <MeetingDetailCard {...DEFAULT_PROPS} role="participant" isJoined={false} onJoin={onJoin} />
      );

      await user.click(screen.getByRole('button', { name: '참여하기' }));

      expect(onJoin).toHaveBeenCalledTimes(1);
    });

    it('"참여 취소하기" 클릭 시 onCancel이 호출된다', async () => {
      const onCancel = jest.fn();
      const user = userEvent.setup();
      render(
        <MeetingDetailCard
          {...DEFAULT_PROPS}
          role="participant"
          isJoined={true}
          onCancel={onCancel}
        />
      );

      await user.click(screen.getByRole('button', { name: '참여 취소하기' }));

      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('"모임 확정하기" 클릭 시 onConfirm이 호출된다', async () => {
      const onConfirm = jest.fn();
      const user = userEvent.setup();
      render(
        <MeetingDetailCard {...DEFAULT_PROPS} role="host" status="open" onConfirm={onConfirm} />
      );

      await user.click(screen.getByRole('button', { name: '모임 확정하기' }));

      expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('"공유하기" 클릭 시 onShare가 호출된다', async () => {
      const onShare = jest.fn();
      const user = userEvent.setup();
      render(
        <MeetingDetailCard {...DEFAULT_PROPS} role="host" status="confirmed" onShare={onShare} />
      );

      await user.click(screen.getByRole('button', { name: '공유하기' }));

      expect(onShare).toHaveBeenCalledTimes(1);
    });
  });

  describe('아코디언 (모바일 참여 현황 / 호스트)', () => {
    it('초기에는 아코디언이 닫혀 있다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} />);

      expect(screen.getByRole('button', { name: '참여 현황 및 호스트 정보' })).toHaveAttribute(
        'aria-expanded',
        'false'
      );
    });

    it('아코디언 트리거 클릭 시 콘텐츠가 펼쳐진다', async () => {
      const user = userEvent.setup();
      render(<MeetingDetailCard {...DEFAULT_PROPS} />);

      const trigger = screen.getByRole('button', { name: '참여 현황 및 호스트 정보' });
      await user.click(trigger);

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('아코디언을 열면 참여 현황과 호스트 이름이 노출된다', async () => {
      const user = userEvent.setup();
      render(<MeetingDetailCard {...DEFAULT_PROPS} />);

      await user.click(screen.getByRole('button', { name: '참여 현황 및 호스트 정보' }));

      const countElements = screen.getAllByText('3/6 참여중');
      const hostElements = screen.getAllByText('김소소');
      expect(countElements.length).toBeGreaterThanOrEqual(1);
      expect(hostElements.length).toBeGreaterThanOrEqual(1);
    });

    it('아코디언을 열었다가 닫으면 다시 접힌다', async () => {
      const user = userEvent.setup();
      render(<MeetingDetailCard {...DEFAULT_PROPS} />);

      const trigger = screen.getByRole('button', { name: '참여 현황 및 호스트 정보' });
      await user.click(trigger);
      await user.click(trigger);

      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('슬롯 (ReactNode)', () => {
    it('timerBadge 슬롯이 렌더링된다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} timerBadge={<span>D-3</span>} />);

      expect(screen.getByText('D-3')).toBeInTheDocument();
    });

    it('likeButton 슬롯이 렌더링된다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} likeButton={<button>찜하기</button>} />);

      expect(screen.getByRole('button', { name: '찜하기' })).toBeInTheDocument();
    });

    it('likeButton 미제공 시 렌더링되지 않는다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} />);

      expect(screen.queryByRole('button', { name: '찜하기' })).not.toBeInTheDocument();
    });
  });
});

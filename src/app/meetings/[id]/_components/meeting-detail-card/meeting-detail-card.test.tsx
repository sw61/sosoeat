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

    // 제목은 모바일·태블릿 양쪽에 렌더링됨
    expect(screen.getAllByText('강남 맛집 탐방 함께해요!').length).toBeGreaterThanOrEqual(1);
    // 날짜 전체 문자열은 태블릿 섹션에만 표시
    expect(screen.getByText('2024/03/15(금) 18:30')).toBeInTheDocument();
    // 지역명 단독은 태블릿 섹션에만 표시 (모바일은 "서울 강남구 · 같이먹기" 형태)
    expect(screen.getByText('서울 강남구')).toBeInTheDocument();
    expect(screen.getByText('서울 강남구 테헤란로 123')).toBeInTheDocument();
  });

  describe('더보기(...) 버튼', () => {
    it('host 역할이면 더보기 버튼이 노출된다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} role="host" />);

      // 모바일·태블릿 양쪽에 렌더링되므로 getAllByRole 사용
      expect(screen.getAllByRole('button', { name: '더보기' }).length).toBeGreaterThanOrEqual(1);
    });

    it('guest 역할이면 더보기 버튼이 노출되지 않는다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} role="guest" />);

      expect(screen.queryAllByRole('button', { name: '더보기' })).toHaveLength(0);
    });

    it('participant 역할이면 더보기 버튼이 노출되지 않는다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} role="participant" />);

      expect(screen.queryAllByRole('button', { name: '더보기' })).toHaveLength(0);
    });

    it('더보기 버튼 클릭 시 수정하기/삭제하기 메뉴가 열린다', async () => {
      const user = userEvent.setup();
      render(<MeetingDetailCard {...DEFAULT_PROPS} role="host" />);

      await user.click(screen.getAllByRole('button', { name: '더보기' })[0]);

      expect(screen.getByText('수정하기')).toBeInTheDocument();
      expect(screen.getByText('삭제하기')).toBeInTheDocument();
    });

    it('수정하기 클릭 시 onEdit이 호출된다', async () => {
      const onEdit = jest.fn();
      const user = userEvent.setup();
      render(<MeetingDetailCard {...DEFAULT_PROPS} role="host" onEdit={onEdit} />);

      await user.click(screen.getAllByRole('button', { name: '더보기' })[0]);
      await user.click(screen.getByText('수정하기'));

      expect(onEdit).toHaveBeenCalledTimes(1);
    });

    it('삭제하기 클릭 시 onDelete가 호출된다', async () => {
      const onDelete = jest.fn();
      const user = userEvent.setup();
      render(<MeetingDetailCard {...DEFAULT_PROPS} role="host" onDelete={onDelete} />);

      await user.click(screen.getAllByRole('button', { name: '더보기' })[0]);
      await user.click(screen.getByText('삭제하기'));

      expect(onDelete).toHaveBeenCalledTimes(1);
    });
  });

  describe('액션 버튼', () => {
    // 액션 버튼은 모바일·태블릿 양쪽에 렌더링되므로 getAllByRole 사용

    it('status가 closed이면 "마감된 모임" 버튼이 disabled 상태로 렌더링된다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} status="closed" />);

      expect(screen.getAllByRole('button', { name: '마감된 모임' })[0]).toBeDisabled();
    });

    it('guest이면 "참여하기" 버튼이 렌더링된다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} role="guest" />);

      expect(screen.getAllByRole('button', { name: '참여하기' }).length).toBeGreaterThanOrEqual(1);
    });

    it('participant이고 미참여이면 "참여하기" 버튼이 렌더링된다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} role="participant" isJoined={false} />);

      expect(screen.getAllByRole('button', { name: '참여하기' }).length).toBeGreaterThanOrEqual(1);
    });

    it('participant이고 참여 완료이면 "참여 취소하기" 버튼이 렌더링된다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} role="participant" isJoined={true} />);

      expect(
        screen.getAllByRole('button', { name: '참여 취소하기' }).length
      ).toBeGreaterThanOrEqual(1);
    });

    it('host이고 open 상태이면 "모임 확정하기" 버튼이 렌더링된다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} role="host" status="open" />);

      expect(
        screen.getAllByRole('button', { name: '모임 확정하기' }).length
      ).toBeGreaterThanOrEqual(1);
    });

    it('host이고 confirmed 상태이면 "공유하기" 버튼이 렌더링된다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} role="host" status="confirmed" />);

      expect(screen.getAllByRole('button', { name: '공유하기' }).length).toBeGreaterThanOrEqual(1);
    });

    it('"참여하기" 클릭 시 onJoin이 호출된다', async () => {
      const onJoin = jest.fn();
      const user = userEvent.setup();
      render(
        <MeetingDetailCard {...DEFAULT_PROPS} role="participant" isJoined={false} onJoin={onJoin} />
      );

      await user.click(screen.getAllByRole('button', { name: '참여하기' })[0]);

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

      await user.click(screen.getAllByRole('button', { name: '참여 취소하기' })[0]);

      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('"모임 확정하기" 클릭 시 onConfirm이 호출된다', async () => {
      const onConfirm = jest.fn();
      const user = userEvent.setup();
      render(
        <MeetingDetailCard {...DEFAULT_PROPS} role="host" status="open" onConfirm={onConfirm} />
      );

      await user.click(screen.getAllByRole('button', { name: '모임 확정하기' })[0]);

      expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('"공유하기" 클릭 시 onShare가 호출된다', async () => {
      const onShare = jest.fn();
      const user = userEvent.setup();
      render(
        <MeetingDetailCard {...DEFAULT_PROPS} role="host" status="confirmed" onShare={onShare} />
      );

      await user.click(screen.getAllByRole('button', { name: '공유하기' })[0]);

      expect(onShare).toHaveBeenCalledTimes(1);
    });
  });

  describe('chevron 토글 (모바일 참여 현황 / 호스트)', () => {
    it('초기에는 펼치기 버튼이 표시된다', () => {
      render(<MeetingDetailCard {...DEFAULT_PROPS} />);

      expect(screen.getByRole('button', { name: '펼치기' })).toBeInTheDocument();
    });

    it('chevron 클릭 시 접기 버튼으로 바뀐다', async () => {
      const user = userEvent.setup();
      render(<MeetingDetailCard {...DEFAULT_PROPS} />);

      await user.click(screen.getByRole('button', { name: '펼치기' }));

      expect(screen.getByRole('button', { name: '접기' })).toBeInTheDocument();
    });

    it('chevron 클릭 후 다시 클릭하면 접힌다', async () => {
      const user = userEvent.setup();
      render(<MeetingDetailCard {...DEFAULT_PROPS} />);

      await user.click(screen.getByRole('button', { name: '펼치기' }));
      await user.click(screen.getByRole('button', { name: '접기' }));

      expect(screen.getByRole('button', { name: '펼치기' })).toBeInTheDocument();
    });

    it('chevron을 열면 호스트 이름이 노출된다', async () => {
      const user = userEvent.setup();
      render(<MeetingDetailCard {...DEFAULT_PROPS} />);

      await user.click(screen.getByRole('button', { name: '펼치기' }));

      const hostElements = screen.getAllByText('김소소');
      expect(hostElements.length).toBeGreaterThanOrEqual(1);
    });
  });
});

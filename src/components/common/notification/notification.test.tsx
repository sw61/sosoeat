import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { fetchClient } from '@/lib/http/fetch-client';
import type { Notification, NotificationList } from '@/types/generated-client';

import { Notification as Nt } from './notification';

jest.mock('@/lib/http/fetch-client', () => ({
  fetchClient: {
    get: jest.fn(),
  },
}));

const testNotifications: Notification[] = [
  {
    id: 1,
    teamId: 'dallaem',
    userId: 1,
    type: 'MEETING_CONFIRMED',
    message: '',
    data: { meetingName: '테스트' },
    isRead: false,
    createdAt: new Date('2025-01-15T12:00:00Z'),
  },
  {
    id: 2,
    teamId: 'dallaem',
    userId: 1,
    type: 'COMMENT',
    message: '새 댓글이 달렸습니다.',
    data: {},
    isRead: true,
    createdAt: new Date('2025-01-15T10:00:00Z'),
  },
  {
    id: 3,
    teamId: 'dallaem',
    userId: 1,
    type: 'MEETING_CANCELED',
    message: '',
    data: { meetingName: '테스트' },
    isRead: false,
    createdAt: new Date('2025-01-14T12:00:00Z'),
  },
];

const mockGet = fetchClient.get as jest.MockedFunction<typeof fetchClient.get>;
const mockNotifications: NotificationList = {
  data: testNotifications,
  nextCursor: '',
  hasMore: false,
};

const MAX_WIDTH_QUERY = '(max-width: 767px)';

function mockMatchMedia(matchesNarrow: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: query === MAX_WIDTH_QUERY ? matchesNarrow : false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  });
}

describe('Notification', () => {
  beforeEach(() => {
    mockMatchMedia(false);
    jest.clearAllMocks();
    mockGet.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockNotifications),
    } as unknown as Response);
  });

  it('알림 열기 트리거가 표시된다', () => {
    render(<Nt />);
    expect(screen.getByRole('button', { name: '알림 열기' })).toBeInTheDocument();
  });

  it('triggerClassName이 트리거 버튼에 적용된다', () => {
    render(<Nt triggerClassName="trigger-test-class" />);
    expect(screen.getByRole('button', { name: '알림 열기' })).toHaveClass('trigger-test-class');
  });

  it('트리거 클릭 시 알림 내역과 목록이 보인다 (넓은 화면: Popover)', async () => {
    const user = userEvent.setup();
    render(<Nt />);

    await user.click(screen.getByRole('button', { name: '알림 열기' }));

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '알림 내역' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '모두 읽기' })).toBeInTheDocument();
    expect(screen.getByText('모임 확정')).toBeInTheDocument();
  });

  describe('767px 이하 (Dialog)', () => {
    beforeEach(() => {
      mockMatchMedia(true);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('트리거 클릭 시 Dialog에 주입 목록이 보인다', async () => {
      const user = userEvent.setup();
      render(<Nt />);

      await user.click(screen.getByRole('button', { name: '알림 열기' }));

      expect(await screen.findByRole('dialog')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: '알림 내역' })).toBeInTheDocument();
      expect(await screen.findByText('모임 확정')).toBeInTheDocument();
    });
  });
});

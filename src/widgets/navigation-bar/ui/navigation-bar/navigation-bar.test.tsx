import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useAuthStore } from '@/entities/auth';

import { NavigationBar } from './navigation-bar';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('@/features/notifications', () => ({
  Notification: () => <button aria-label="알림 열기">알림</button>,
}));

const mockPush = jest.fn();
const mockUsePathname = usePathname as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;
const mockUseSearchParams = useSearchParams as jest.Mock;

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false }, queries: { retry: false } },
  });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

beforeEach(() => {
  mockUsePathname.mockReturnValue('/');
  mockUseRouter.mockReturnValue({ push: mockPush });
  mockUseSearchParams.mockReturnValue(new URLSearchParams());
  useAuthStore.setState({ user: null });
  mockPush.mockClear();
  global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
});

const MOCK_USER = { id: 1, name: '홍길동', email: 'test@example.com', teamId: 'dallaem' };

describe('NavigationBar', () => {
  describe('공통', () => {
    it('로고가 렌더링된다', () => {
      renderWithClient(<NavigationBar initialUser={null} initialFavoritesCount={0} />);
      expect(screen.getByRole('link', { name: 'sosoeat' })).toBeInTheDocument();
    });

    it('카테고리 메뉴 링크가 렌더링된다', () => {
      renderWithClient(<NavigationBar initialUser={null} initialFavoritesCount={0} />);
      expect(screen.getAllByRole('link', { name: '모임찾기' }).length).toBeGreaterThan(0);
      expect(screen.getAllByRole('button', { name: /찜한 모임/ }).length).toBeGreaterThan(0);
      expect(screen.getAllByRole('link', { name: '소소토크' }).length).toBeGreaterThan(0);
    });
  });

  describe('비로그인 상태', () => {
    it('로그인 버튼이 표시된다', () => {
      renderWithClient(<NavigationBar initialUser={null} initialFavoritesCount={0} />);
      expect(screen.getAllByRole('link', { name: '로그인' }).length).toBeGreaterThan(0);
    });

    it('찜한 모임 메뉴가 표시되며 클릭 시 로그인 요구 모달이 열린다', async () => {
      const user = userEvent.setup();
      renderWithClient(<NavigationBar initialUser={null} initialFavoritesCount={0} />);
      const buttons = screen.getAllByRole('button', { name: /찜한 모임/ });
      await user.click(buttons[0]);
      expect(useAuthStore.getState().isLoginRequired).toBe(true);
    });

    it('찜한 모임 배지가 표시되지 않는다', () => {
      renderWithClient(<NavigationBar initialUser={null} initialFavoritesCount={0} />);
      expect(screen.queryByText('0')).not.toBeInTheDocument();
    });

    it('알림 버튼이 표시되지 않는다', () => {
      renderWithClient(<NavigationBar initialUser={null} initialFavoritesCount={0} />);
      expect(screen.queryByRole('button', { name: '알림' })).not.toBeInTheDocument();
    });

    it('프로필 메뉴가 표시되지 않는다', () => {
      renderWithClient(<NavigationBar initialUser={null} initialFavoritesCount={0} />);
      expect(screen.queryByRole('button', { name: '프로필 메뉴' })).not.toBeInTheDocument();
    });
  });

  describe('로그인 상태', () => {
    it('알림 버튼이 표시된다', async () => {
      renderWithClient(<NavigationBar initialUser={MOCK_USER} initialFavoritesCount={0} />);
      await waitFor(() => {
        expect(screen.getAllByRole('button', { name: '알림 열기' }).length).toBeGreaterThan(0);
      });
    });

    it('프로필 메뉴가 표시된다', () => {
      renderWithClient(<NavigationBar initialUser={MOCK_USER} initialFavoritesCount={0} />);
      expect(screen.getByRole('button', { name: '프로필 메뉴' })).toBeInTheDocument();
    });

    it('로그인 버튼이 표시되지 않는다', () => {
      renderWithClient(<NavigationBar initialUser={MOCK_USER} initialFavoritesCount={0} />);
      expect(screen.queryByRole('link', { name: '로그인' })).not.toBeInTheDocument();
    });

    it('찜한 모임 메뉴와 배지가 표시되며 /mypage?tab=liked로 이동한다', () => {
      renderWithClient(<NavigationBar initialUser={MOCK_USER} initialFavoritesCount={0} />);
      const links = screen.getAllByRole('link', { name: /찜한 모임/ });
      expect(links.length).toBeGreaterThan(0);
      links.forEach((link) => {
        expect(link).toHaveAttribute('href', '/mypage?tab=liked');
      });
      expect(screen.getAllByText('0').length).toBeGreaterThan(0);
    });

    it('모임 만들기 버튼이 표시된다', () => {
      renderWithClient(<NavigationBar initialUser={MOCK_USER} initialFavoritesCount={0} />);
      expect(screen.getByRole('button', { name: /모임 만들기/ })).toBeInTheDocument();
    });

    it('프로필 이미지가 없을 때 이름 첫 글자가 표시된다', () => {
      renderWithClient(<NavigationBar initialUser={MOCK_USER} initialFavoritesCount={0} />);
      expect(screen.getByText(MOCK_USER.name[0])).toBeInTheDocument();
    });
  });

  describe('모바일 메뉴', () => {
    it('비로그인 상태에서 찜한 모임 클릭 시 로그인 요구 모달이 열린다', async () => {
      const user = userEvent.setup();
      renderWithClient(<NavigationBar initialUser={null} initialFavoritesCount={0} />);

      await user.click(screen.getByRole('button', { name: '메뉴 열기' }));
      const buttons = screen.getAllByRole('button', { name: /찜한 모임/ });
      await user.click(buttons[0]);
      expect(useAuthStore.getState().isLoginRequired).toBe(true);
    });

    it('햄버거 버튼 클릭 시 메뉴 패널이 열린다', async () => {
      const user = userEvent.setup();
      renderWithClient(<NavigationBar initialUser={null} initialFavoritesCount={0} />);

      await user.click(screen.getByRole('button', { name: '메뉴 열기' }));
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('닫기 버튼 클릭 시 메뉴 패널이 닫힌다', async () => {
      const user = userEvent.setup();
      renderWithClient(<NavigationBar initialUser={null} initialFavoritesCount={0} />);

      await user.click(screen.getByRole('button', { name: '메뉴 열기' }));
      await user.click(screen.getByRole('button', { name: 'Close' }));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('프로필 드롭다운', () => {
    it('프로필 버튼 클릭 시 드롭다운이 열린다', async () => {
      const user = userEvent.setup();
      renderWithClient(<NavigationBar initialUser={MOCK_USER} initialFavoritesCount={0} />);

      await user.click(screen.getByRole('button', { name: '프로필 메뉴' }));
      expect(screen.getByRole('menuitem', { name: '로그아웃' })).toBeInTheDocument();
    });

    it('로그아웃 클릭 시 user가 null이 되고 홈으로 이동한다', async () => {
      const user = userEvent.setup();
      renderWithClient(<NavigationBar initialUser={MOCK_USER} initialFavoritesCount={0} />);

      await user.click(screen.getByRole('button', { name: '프로필 메뉴' }));
      await user.click(screen.getByRole('menuitem', { name: '로그아웃' }));

      expect(useAuthStore.getState().user).toBeNull();
      expect(mockPush).toHaveBeenCalledWith('/home');
    });
  });

  describe('활성 메뉴', () => {
    it('현재 경로에 해당하는 메뉴에 활성 스타일이 적용된다', () => {
      mockUsePathname.mockReturnValue('/search');
      renderWithClient(<NavigationBar initialUser={null} initialFavoritesCount={0} />);

      const activeLinks = screen.getAllByRole('link', { name: '모임찾기' });
      activeLinks.forEach((link) => {
        expect(link).toHaveClass('text-sosoeat-orange-600');
      });
    });
  });
});

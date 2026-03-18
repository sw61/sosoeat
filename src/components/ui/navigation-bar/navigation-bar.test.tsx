import { usePathname, useRouter } from 'next/navigation';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NavigationBar } from '@/components/ui/navigation-bar/navigation-bar';
import { useAuthStore } from '@/store/authStore';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
const mockUsePathname = usePathname as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;

beforeEach(() => {
  mockUsePathname.mockReturnValue('/');
  mockUseRouter.mockReturnValue({ push: mockPush });
  useAuthStore.setState({ user: null });
  mockPush.mockClear();
});

const MOCK_USER = { id: '1', name: '홍길동' };

describe('NavigationBar', () => {
  describe('공통', () => {
    it('로고가 렌더링된다', () => {
      render(<NavigationBar />);
      expect(screen.getByRole('link', { name: 'sosoeat' })).toBeInTheDocument();
    });

    it('카테고리 메뉴 링크가 렌더링된다', () => {
      render(<NavigationBar />);
      expect(screen.getAllByRole('link', { name: '모임찾기' }).length).toBeGreaterThan(0);
      expect(screen.getAllByRole('link', { name: /찜한 모임/ }).length).toBeGreaterThan(0);
      expect(screen.getAllByRole('link', { name: '소소토크' }).length).toBeGreaterThan(0);
    });

    it('찜한 모임 배지가 항상 표시된다', () => {
      render(<NavigationBar />);
      // 데스크톱 + 모바일 메뉴 두 곳에 렌더링됨
      const badges = screen.getAllByText('0');
      expect(badges.length).toBeGreaterThan(0);
    });
  });

  describe('비로그인 상태', () => {
    it('로그인 버튼이 표시된다', () => {
      render(<NavigationBar />);
      expect(screen.getAllByRole('link', { name: '로그인' }).length).toBeGreaterThan(0);
    });

    it('알림 버튼이 표시되지 않는다', () => {
      render(<NavigationBar />);
      expect(screen.queryByRole('button', { name: '알림' })).not.toBeInTheDocument();
    });

    it('프로필 메뉴가 표시되지 않는다', () => {
      render(<NavigationBar />);
      expect(screen.queryByRole('button', { name: '프로필 메뉴' })).not.toBeInTheDocument();
    });
  });

  describe('로그인 상태', () => {
    beforeEach(() => {
      useAuthStore.setState({ user: MOCK_USER });
    });

    it('알림 버튼이 표시된다', () => {
      render(<NavigationBar />);
      expect(screen.getByRole('button', { name: '알림' })).toBeInTheDocument();
    });

    it('프로필 메뉴가 표시된다', () => {
      render(<NavigationBar />);
      expect(screen.getByRole('button', { name: '프로필 메뉴' })).toBeInTheDocument();
    });

    it('로그인 버튼이 표시되지 않는다', () => {
      render(<NavigationBar />);
      expect(screen.queryByRole('link', { name: '로그인' })).not.toBeInTheDocument();
    });
  });

  describe('모바일 메뉴', () => {
    it('햄버거 버튼 클릭 시 메뉴 패널이 열린다', async () => {
      const user = userEvent.setup();
      render(<NavigationBar />);

      await user.click(screen.getByRole('button', { name: '메뉴 열기' }));
      expect(screen.getByRole('button', { name: '메뉴 닫기' })).toBeInTheDocument();
    });

    it('닫기 버튼 클릭 시 메뉴 패널이 닫힌다', async () => {
      const user = userEvent.setup();
      render(<NavigationBar />);

      await user.click(screen.getByRole('button', { name: '메뉴 열기' }));
      await user.click(screen.getByRole('button', { name: '메뉴 닫기' }));
      expect(screen.queryByRole('button', { name: '메뉴 닫기' })).not.toBeInTheDocument();
    });
  });

  describe('프로필 드롭다운', () => {
    beforeEach(() => {
      useAuthStore.setState({ user: MOCK_USER });
    });

    it('프로필 버튼 클릭 시 드롭다운이 열린다', async () => {
      const user = userEvent.setup();
      render(<NavigationBar />);

      await user.click(screen.getByRole('button', { name: '프로필 메뉴' }));
      expect(screen.getByRole('button', { name: '로그아웃' })).toBeInTheDocument();
    });

    it('로그아웃 클릭 시 user가 null이 되고 홈으로 이동한다', async () => {
      const user = userEvent.setup();
      render(<NavigationBar />);

      await user.click(screen.getByRole('button', { name: '프로필 메뉴' }));
      await user.click(screen.getByRole('button', { name: '로그아웃' }));

      expect(useAuthStore.getState().user).toBeNull();
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  describe('활성 메뉴', () => {
    it('현재 경로에 해당하는 메뉴에 활성 스타일이 적용된다', () => {
      mockUsePathname.mockReturnValue('/meetings');
      render(<NavigationBar />);

      const activeLinks = screen.getAllByRole('link', { name: '모임찾기' });
      activeLinks.forEach((link) => {
        expect(link).toHaveClass('text-sosoeat-orange-600');
      });
    });
  });
});

import { act, renderHook } from '@testing-library/react';

import { useSosoTalkPostDetailPostActions } from './use-sosotalk-post-detail-post-actions';

const mockPush = jest.fn();
const mockSetLoginRequired = jest.fn();
const mockToastSuccess = jest.fn();
const mockCreateLikeMutateAsync = jest.fn();
const mockDeleteLikeMutateAsync = jest.fn();
const mockDeletePostMutateAsync = jest.fn();
const mockWriteClipboardText = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('sonner', () => ({
  toast: {
    success: (...args: unknown[]) => mockToastSuccess(...args),
    error: jest.fn(),
  },
}));

jest.mock('@/entities/auth', () => ({
  useAuthStore: jest.fn(),
}));

jest.mock('@/entities/post', () => ({
  useCreateSosoTalkPostLike: jest.fn(),
  useDeleteSosoTalkPost: jest.fn(),
  useDeleteSosoTalkPostLike: jest.fn(),
}));

jest.mock('@/shared/lib/write-clipboard-text', () => ({
  writeClipboardText: (...args: unknown[]) => mockWriteClipboardText(...args),
}));

const { useAuthStore } = jest.requireMock('@/entities/auth') as {
  useAuthStore: jest.Mock;
};

const { useCreateSosoTalkPostLike, useDeleteSosoTalkPost, useDeleteSosoTalkPostLike } =
  jest.requireMock('@/entities/post') as {
    useCreateSosoTalkPostLike: jest.Mock;
    useDeleteSosoTalkPost: jest.Mock;
    useDeleteSosoTalkPostLike: jest.Mock;
  };

const mockPostDetailResponse = {
  id: 1,
  teamId: 'dallaem',
  title: '마포 고깃집 같이 가실 분?',
  content: '<p>오늘 저녁 같이 식사하실 분 구해요.</p>',
  image: 'https://example.com/post-image.jpg',
  authorId: 10,
  viewCount: 20,
  likeCount: 24,
  createdAt: new Date('2026-03-18T09:00:00.000Z'),
  updatedAt: new Date('2026-03-18T09:00:00.000Z'),
  author: {
    id: 10,
    name: '김민수',
    image: 'https://example.com/author-image.jpg',
    email: 'test@example.com',
  },
  count: {
    comments: 6,
  },
  comments: [],
  isLiked: false,
};

describe('useSosoTalkPostDetailPostActions', () => {
  const originalNavigator = global.navigator;

  beforeEach(() => {
    mockPush.mockReset();
    mockSetLoginRequired.mockReset();
    mockToastSuccess.mockReset();
    mockCreateLikeMutateAsync.mockReset();
    mockDeleteLikeMutateAsync.mockReset();
    mockDeletePostMutateAsync.mockReset();
    mockWriteClipboardText.mockReset();

    useAuthStore.mockImplementation((selector: (state: unknown) => unknown) =>
      selector({
        isAuthenticated: true,
        setLoginRequired: mockSetLoginRequired,
      })
    );

    useCreateSosoTalkPostLike.mockReturnValue({
      mutateAsync: mockCreateLikeMutateAsync,
      isPending: false,
    });

    useDeleteSosoTalkPostLike.mockReturnValue({
      mutateAsync: mockDeleteLikeMutateAsync,
      isPending: false,
    });

    useDeleteSosoTalkPost.mockReturnValue({
      mutateAsync: mockDeletePostMutateAsync,
      isPending: false,
    });

    window.history.pushState({}, '', '/sosotalk/1');
    Object.defineProperty(window.navigator, 'userAgent', {
      configurable: true,
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    });

    Object.defineProperty(global, 'navigator', {
      configurable: true,
      value: {
        ...originalNavigator,
        share: undefined,
      },
    });
  });

  it('로그인 상태에서 좋아요 클릭 시 낙관적 반응과 mutation이 동작한다', async () => {
    mockCreateLikeMutateAsync.mockResolvedValue(undefined);

    const { result } = renderHook(() =>
      useSosoTalkPostDetailPostActions({
        data: mockPostDetailResponse,
        isValidPostId: true,
        postId: 1,
      })
    );

    await act(async () => {
      await result.current.handleLikeClick();
    });

    expect(mockCreateLikeMutateAsync).toHaveBeenCalledWith(1);
    expect(mockSetLoginRequired).not.toHaveBeenCalled();
  });

  it('비로그인 상태에서 좋아요 클릭 시 mutation 없이 로그인 모달만 연다', async () => {
    useAuthStore.mockImplementation((selector: (state: unknown) => unknown) =>
      selector({
        isAuthenticated: false,
        setLoginRequired: mockSetLoginRequired,
      })
    );

    const { result } = renderHook(() =>
      useSosoTalkPostDetailPostActions({
        data: mockPostDetailResponse,
        isValidPostId: true,
        postId: 1,
      })
    );

    await act(async () => {
      await result.current.handleLikeClick();
    });

    expect(mockCreateLikeMutateAsync).not.toHaveBeenCalled();
    expect(mockDeleteLikeMutateAsync).not.toHaveBeenCalled();
    expect(mockSetLoginRequired).toHaveBeenCalledWith(true);
    expect(result.current.isLiked).toBe(false);
    expect(result.current.displayedLikeCount).toBe(24);
  });

  it('데스크톱에서는 공유 클릭 시 커스텀 공유 모달을 연다', async () => {
    const { result } = renderHook(() =>
      useSosoTalkPostDetailPostActions({
        data: mockPostDetailResponse,
        isValidPostId: true,
        postId: 1,
      })
    );

    await act(async () => {
      await result.current.handleShareClick();
    });

    expect(result.current.isShareModalOpen).toBe(true);
  });

  it('모바일에서는 네이티브 공유를 사용한다', async () => {
    const mockShare = jest.fn().mockResolvedValue(undefined);

    window.history.pushState({}, '', '/sosotalk/1');
    Object.defineProperty(window.navigator, 'userAgent', {
      configurable: true,
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
    });

    Object.defineProperty(window.navigator, 'share', {
      configurable: true,
      value: mockShare,
    });

    const { result } = renderHook(() =>
      useSosoTalkPostDetailPostActions({
        data: mockPostDetailResponse,
        isValidPostId: true,
        postId: 1,
      })
    );

    await act(async () => {
      await result.current.handleShareClick();
    });

    expect(mockShare).toHaveBeenCalledWith({
      title: mockPostDetailResponse.title,
      text: `${mockPostDetailResponse.author.name}님의 소소톡 게시글`,
      url: 'http://localhost/sosotalk/1',
    });
    expect(mockToastSuccess).toHaveBeenCalledWith('공유를 완료했어요.');
  });

  it('데스크톱 공유 모달에서 링크 복사를 누르면 링크를 복사하고 모달을 닫는다', async () => {
    mockWriteClipboardText.mockResolvedValue(undefined);

    const { result } = renderHook(() =>
      useSosoTalkPostDetailPostActions({
        data: mockPostDetailResponse,
        isValidPostId: true,
        postId: 1,
      })
    );

    await act(async () => {
      await result.current.handleShareClick();
    });

    await act(async () => {
      await result.current.handleCopyShareLink();
    });

    expect(mockWriteClipboardText).toHaveBeenCalledWith('http://localhost/sosotalk/1');
    expect(mockToastSuccess).toHaveBeenCalledWith('링크를 복사했어요.');
    expect(result.current.isShareModalOpen).toBe(false);
  });
});

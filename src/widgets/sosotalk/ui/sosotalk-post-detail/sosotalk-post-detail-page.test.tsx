import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SosoTalkPostDetailPage } from './sosotalk-post-detail-page';

const mockPush = jest.fn();
const mockToastSuccess = jest.fn();
const mockSetLoginRequired = jest.fn();
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

jest.mock('@/shared/lib/write-clipboard-text', () => ({
  writeClipboardText: (...args: unknown[]) => mockWriteClipboardText(...args),
}));

jest.mock('@/widgets/navigation-bar/ui/navigation-bar/navigation-bar', () => ({
  NavigationBar: () => <div>NavigationBar</div>,
}));

jest.mock('@/widgets/footer/ui/footer/footer', () => ({
  Footer: () => <div>Footer</div>,
}));

jest.mock('@/entities/auth', () => ({
  ...jest.requireActual('@/entities/auth'),
  useAuthStore: jest.fn(),
}));

jest.mock('@/entities/post', () => {
  const actual = jest.requireActual('@/entities/post');

  return {
    ...actual,
    useCreateSosoTalkComment: jest.fn(),
    useCreateSosoTalkCommentLike: jest.fn(),
    useUpdateSosoTalkComment: jest.fn(),
    useDeleteSosoTalkComment: jest.fn(),
    useDeleteSosoTalkCommentLike: jest.fn(),
    useCreateSosoTalkPostLike: jest.fn(),
    useDeleteSosoTalkPost: jest.fn(),
    useDeleteSosoTalkPostLike: jest.fn(),
    useGetSosoTalkPostDetail: jest.fn(),
  };
});

const { useAuthStore } = jest.requireMock('@/entities/auth') as {
  useAuthStore: jest.Mock;
};

const {
  useCreateSosoTalkComment,
  useCreateSosoTalkCommentLike,
  useUpdateSosoTalkComment,
  useDeleteSosoTalkComment,
  useDeleteSosoTalkCommentLike,
  useCreateSosoTalkPostLike,
  useDeleteSosoTalkPost,
  useDeleteSosoTalkPostLike,
  useGetSosoTalkPostDetail,
} = jest.requireMock('@/entities/post') as {
  useCreateSosoTalkComment: jest.Mock;
  useCreateSosoTalkCommentLike: jest.Mock;
  useUpdateSosoTalkComment: jest.Mock;
  useDeleteSosoTalkComment: jest.Mock;
  useDeleteSosoTalkCommentLike: jest.Mock;
  useCreateSosoTalkPostLike: jest.Mock;
  useDeleteSosoTalkPost: jest.Mock;
  useDeleteSosoTalkPostLike: jest.Mock;
  useGetSosoTalkPostDetail: jest.Mock;
};

const mockCreateCommentMutateAsync = jest.fn();
const mockCreateCommentLikeMutateAsync = jest.fn();
const mockUpdateCommentMutateAsync = jest.fn();
const mockDeleteCommentMutateAsync = jest.fn();
const mockDeleteCommentLikeMutateAsync = jest.fn();
const mockCreateLikeMutateAsync = jest.fn();
const mockDeletePostMutateAsync = jest.fn();
const mockDeleteLikeMutateAsync = jest.fn();

const mockPostDetailResponse = {
  id: 1,
  teamId: 'dallaem',
  title: '맛집 같이 갈 사람 구해요',
  content: '<p>오늘 저녁 같이 가실 분 구해요</p>',
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
  },
  count: {
    comments: 6,
  },
  comments: [
    {
      id: 101,
      teamId: 'dallaem',
      postId: 1,
      authorId: 20,
      author: {
        id: 20,
        name: '김유진',
        image: 'https://example.com/comment-author.jpg',
      },
      content: '참여하고 싶어요',
      likeCount: 2,
      isLiked: false,
      createdAt: new Date('2026-03-18T09:05:00.000Z'),
      updatedAt: new Date('2026-03-18T09:05:00.000Z'),
    },
  ],
  isLiked: false,
};

let currentPostDetailResponse = mockPostDetailResponse;

describe('SosoTalkPostDetailPage', () => {
  beforeEach(() => {
    currentPostDetailResponse = {
      ...mockPostDetailResponse,
      author: { ...mockPostDetailResponse.author },
      count: { ...mockPostDetailResponse.count },
      comments: mockPostDetailResponse.comments.map((comment) => ({
        ...comment,
        author: { ...comment.author },
      })),
    };

    window.history.pushState({}, '', '/sosotalk/1');

    Object.defineProperty(window.navigator, 'userAgent', {
      configurable: true,
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    });

    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: undefined,
    });

    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    useAuthStore.mockImplementation(
      (
        selector: (state: {
          isAuthenticated: boolean;
          setLoginRequired: (value: boolean) => void;
          user: {
            id: number;
            name: string;
            image?: string | null;
          } | null;
        }) => unknown
      ) =>
        selector({
          isAuthenticated: true,
          setLoginRequired: mockSetLoginRequired,
          user: {
            id: 20,
            name: '김유진',
            image: 'https://example.com/current-user.jpg',
          },
        })
    );

    useGetSosoTalkPostDetail.mockImplementation(() => ({
      data: currentPostDetailResponse,
      isLoading: false,
      isError: false,
    }));

    useCreateSosoTalkComment.mockReturnValue({
      mutateAsync: mockCreateCommentMutateAsync,
      isPending: false,
    });

    useCreateSosoTalkCommentLike.mockReturnValue({
      mutateAsync: mockCreateCommentLikeMutateAsync,
      isPending: false,
    });

    useUpdateSosoTalkComment.mockReturnValue({
      mutateAsync: mockUpdateCommentMutateAsync,
      isPending: false,
    });

    useDeleteSosoTalkComment.mockReturnValue({
      mutateAsync: mockDeleteCommentMutateAsync,
      isPending: false,
    });

    useDeleteSosoTalkCommentLike.mockReturnValue({
      mutateAsync: mockDeleteCommentLikeMutateAsync,
      isPending: false,
    });

    useCreateSosoTalkPostLike.mockReturnValue({
      mutateAsync: mockCreateLikeMutateAsync,
      isPending: false,
    });

    useDeleteSosoTalkPost.mockReturnValue({
      mutateAsync: mockDeletePostMutateAsync,
      isPending: false,
    });

    useDeleteSosoTalkPostLike.mockReturnValue({
      mutateAsync: mockDeleteLikeMutateAsync,
      isPending: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('opens share modal on desktop', async () => {
    const user = userEvent.setup();

    render(<SosoTalkPostDetailPage postId="1" />);

    await user.click(screen.getByRole('button', { name: '공유' }));

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText('게시글 공유하기')).toBeInTheDocument();
    expect(within(dialog).getByText(currentPostDetailResponse.title)).toBeInTheDocument();
  });

  it('copies share link from modal', async () => {
    const user = userEvent.setup();
    mockWriteClipboardText.mockResolvedValue(undefined);

    render(<SosoTalkPostDetailPage postId="1" />);

    await user.click(screen.getByRole('button', { name: '공유' }));
    await user.click(screen.getByRole('button', { name: '링크 복사' }));

    expect(mockWriteClipboardText).toHaveBeenCalledWith('http://localhost/sosotalk/1');
    expect(mockToastSuccess).toHaveBeenCalledWith('링크를 복사했어요.');
  });

  it('navigates back to list', async () => {
    const user = userEvent.setup();

    render(<SosoTalkPostDetailPage postId="1" />);

    await user.click(screen.getByRole('button', { name: '목록으로' }));

    expect(mockPush).toHaveBeenCalledWith('/sosotalk');
  });

  it('scrolls to comment section', async () => {
    const user = userEvent.setup();

    render(<SosoTalkPostDetailPage postId="1" />);

    await user.click(screen.getByRole('button', { name: '댓글 6개' }));

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('optimistically toggles post like', async () => {
    const user = userEvent.setup();
    let resolveLike: (() => void) | undefined;
    mockCreateLikeMutateAsync.mockReturnValue(
      new Promise<void>((resolve) => {
        resolveLike = resolve;
      })
    );

    const { rerender } = render(<SosoTalkPostDetailPage postId="1" />);

    await user.click(screen.getByRole('button', { name: '좋아요 24개' }));

    expect(mockCreateLikeMutateAsync).toHaveBeenCalledWith(1);
    expect(screen.getByRole('button', { name: '좋아요 25개' })).toBeInTheDocument();

    resolveLike?.();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '좋아요 25개' })).toBeInTheDocument();
    });

    currentPostDetailResponse = {
      ...currentPostDetailResponse,
      likeCount: 25,
      isLiked: true,
    };

    rerender(<SosoTalkPostDetailPage postId="1" />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '좋아요 25개' })).toBeInTheDocument();
    });
  });

  it('opens login prompt instead of liking when logged out', async () => {
    const user = userEvent.setup();

    useAuthStore.mockImplementation(
      (
        selector: (state: {
          isAuthenticated: boolean;
          setLoginRequired: (value: boolean) => void;
          user: null;
        }) => unknown
      ) =>
        selector({
          isAuthenticated: false,
          setLoginRequired: mockSetLoginRequired,
          user: null,
        })
    );

    render(<SosoTalkPostDetailPage postId="1" />);

    await user.click(screen.getByRole('button', { name: '좋아요 24개' }));

    expect(mockCreateLikeMutateAsync).not.toHaveBeenCalled();
    expect(mockDeleteLikeMutateAsync).not.toHaveBeenCalled();
    expect(mockSetLoginRequired).toHaveBeenCalledWith(true);
    expect(screen.getByRole('button', { name: '좋아요 24개' })).toBeInTheDocument();
  });

  it('submits a new comment', async () => {
    const user = userEvent.setup();
    mockCreateCommentMutateAsync.mockResolvedValue(undefined);

    render(<SosoTalkPostDetailPage postId="1" />);

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, '새 댓글입니다');
    await user.click(screen.getByRole('button', { name: '댓글 전송' }));

    expect(mockCreateCommentMutateAsync).toHaveBeenCalledWith({
      postId: 1,
      payload: {
        content: '새 댓글입니다',
      },
    });
    expect(textarea).toHaveValue('');
  });

  it('likes a comment', async () => {
    const user = userEvent.setup();
    mockCreateCommentLikeMutateAsync.mockResolvedValue(undefined);

    render(<SosoTalkPostDetailPage postId="1" />);

    await user.click(screen.getByRole('button', { name: '댓글 좋아요 2개' }));

    expect(mockCreateCommentLikeMutateAsync).toHaveBeenCalledWith({
      postId: 1,
      commentId: 101,
    });
  });
});

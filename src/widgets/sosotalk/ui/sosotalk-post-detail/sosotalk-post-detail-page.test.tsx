import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SosoTalkPostDetailPage } from './sosotalk-post-detail-page';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
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
    useUpdateSosoTalkComment: jest.fn(),
    useDeleteSosoTalkComment: jest.fn(),
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
  useUpdateSosoTalkComment,
  useDeleteSosoTalkComment,
  useCreateSosoTalkPostLike,
  useDeleteSosoTalkPost,
  useDeleteSosoTalkPostLike,
  useGetSosoTalkPostDetail,
} = jest.requireMock('@/entities/post') as {
  useCreateSosoTalkComment: jest.Mock;
  useUpdateSosoTalkComment: jest.Mock;
  useDeleteSosoTalkComment: jest.Mock;
  useCreateSosoTalkPostLike: jest.Mock;
  useDeleteSosoTalkPost: jest.Mock;
  useDeleteSosoTalkPostLike: jest.Mock;
  useGetSosoTalkPostDetail: jest.Mock;
};

const mockCreateCommentMutateAsync = jest.fn();
const mockUpdateCommentMutateAsync = jest.fn();
const mockDeleteCommentMutateAsync = jest.fn();
const mockCreateLikeMutateAsync = jest.fn();
const mockDeletePostMutateAsync = jest.fn();
const mockDeleteLikeMutateAsync = jest.fn();

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
        name: '마루준',
        image: 'https://example.com/comment-author.jpg',
      },
      content: '참여하고 싶어요.',
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

    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: undefined,
    });

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });

    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    useAuthStore.mockImplementation(
      (
        selector: (state: {
          user: {
            id: number;
            name: string;
            image?: string | null;
          } | null;
        }) => unknown
      ) =>
        selector({
          user: {
            id: 20,
            name: '마루준',
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

    useUpdateSosoTalkComment.mockReturnValue({
      mutateAsync: mockUpdateCommentMutateAsync,
      isPending: false,
    });

    useDeleteSosoTalkComment.mockReturnValue({
      mutateAsync: mockDeleteCommentMutateAsync,
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

  it('목록으로 버튼을 누르면 소소톡 목록으로 이동한다', async () => {
    const user = userEvent.setup();

    render(<SosoTalkPostDetailPage postId="1" />);

    await user.click(screen.getByRole('button', { name: '목록으로' }));

    expect(mockPush).toHaveBeenCalledWith('/sosotalk');
  });

  it('댓글 버튼을 누르면 댓글 섹션으로 스크롤한다', async () => {
    const user = userEvent.setup();

    render(<SosoTalkPostDetailPage postId="1" />);

    await user.click(screen.getByRole('button', { name: '댓글 6개' }));

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('좋아요 버튼을 누르면 좋아요 mutation을 호출하고 완료 후 서버 상태를 다시 따른다', async () => {
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

  it('댓글 작성 시 댓글 생성 mutation을 호출하고 입력창을 비운다', async () => {
    const user = userEvent.setup();
    mockCreateCommentMutateAsync.mockResolvedValue(undefined);

    render(<SosoTalkPostDetailPage postId="1" />);

    const textarea = screen.getByPlaceholderText('댓글을 입력해 주세요');
    await user.type(textarea, '새 댓글입니다.');
    await user.click(screen.getByRole('button', { name: '댓글 전송' }));

    expect(mockCreateCommentMutateAsync).toHaveBeenCalledWith({
      postId: 1,
      payload: {
        content: '새 댓글입니다.',
      },
    });
    expect(textarea).toHaveValue('');
  });

  it('댓글 수정 시 댓글 수정 mutation을 호출하고 편집 모드를 닫는다', async () => {
    const user = userEvent.setup();
    mockUpdateCommentMutateAsync.mockResolvedValue(undefined);

    render(<SosoTalkPostDetailPage postId="1" />);

    await user.click(screen.getByRole('button', { name: '댓글 메뉴' }));
    await user.click(screen.getByRole('menuitem', { name: '수정하기' }));

    const [editTextarea] = screen.getAllByRole('textbox');
    await user.clear(editTextarea);
    await user.type(editTextarea, '수정된 댓글입니다.');
    await user.click(screen.getByRole('button', { name: '댓글 수정' }));

    expect(mockUpdateCommentMutateAsync).toHaveBeenCalledWith({
      postId: 1,
      commentId: 101,
      payload: {
        content: '수정된 댓글입니다.',
      },
    });
    expect(screen.queryByRole('button', { name: '취소' })).not.toBeInTheDocument();
  });

  it('댓글 삭제 시 커스텀 모달을 거쳐 댓글 삭제 mutation을 호출한다', async () => {
    const user = userEvent.setup();
    mockDeleteCommentMutateAsync.mockResolvedValue(undefined);

    render(<SosoTalkPostDetailPage postId="1" />);

    await user.click(screen.getByRole('button', { name: '댓글 메뉴' }));
    await user.click(screen.getByRole('menuitem', { name: '삭제하기' }));
    expect(screen.getByText('댓글을 삭제할까요?')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '삭제하기' }));

    expect(mockDeleteCommentMutateAsync).toHaveBeenCalledWith({
      postId: 1,
      commentId: 101,
    });
  });

  it('게시글 삭제 시 커스텀 모달을 거쳐 게시글 삭제 mutation을 호출하고 목록으로 이동한다', async () => {
    const user = userEvent.setup();
    mockDeletePostMutateAsync.mockResolvedValue(undefined);
    useAuthStore.mockImplementation(
      (
        selector: (state: {
          user: {
            id: number;
            name: string;
            image?: string | null;
          } | null;
        }) => unknown
      ) =>
        selector({
          user: {
            id: 10,
            name: '김민수',
            image: 'https://example.com/author-image.jpg',
          },
        })
    );

    render(<SosoTalkPostDetailPage postId="1" />);

    await user.click(screen.getByRole('button', { name: '게시글 메뉴' }));
    await user.click(screen.getByRole('menuitem', { name: '삭제하기' }));
    expect(screen.getByText('게시글을 삭제할까요?')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '삭제하기' }));

    expect(mockDeletePostMutateAsync).toHaveBeenCalledWith({ postId: 1 });
    expect(mockPush).toHaveBeenCalledWith('/sosotalk');
  });

  it('수정하기 클릭 시 기존 작성 페이지의 수정 모드로 이동한다', async () => {
    const user = userEvent.setup();
    useAuthStore.mockImplementation(
      (
        selector: (state: {
          user: {
            id: number;
            name: string;
            image?: string | null;
          } | null;
        }) => unknown
      ) =>
        selector({
          user: {
            id: 10,
            name: '김민수',
            image: 'https://example.com/author-image.jpg',
          },
        })
    );

    render(<SosoTalkPostDetailPage postId="1" />);

    await user.click(screen.getByRole('button', { name: '게시글 메뉴' }));
    await user.click(screen.getByRole('menuitem', { name: '수정하기' }));

    expect(mockPush).toHaveBeenCalledWith('/sosotalk/write?postId=1');
  });

  it('로딩 중에는 로딩 메시지를 보여준다', () => {
    useGetSosoTalkPostDetail.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<SosoTalkPostDetailPage postId="1" />);

    expect(screen.getByText('게시글을 불러오는 중이에요.')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SosoTalkPostDetailPage } from './sosotalk-post-detail-page';

jest.mock('@/components/common/navigation-bar', () => ({
  NavigationBar: () => <div>NavigationBar</div>,
}));

jest.mock('@/components/common/footer', () => ({
  Footer: () => <div>Footer</div>,
}));

jest.mock('@/store/auth-store', () => ({
  useAuthStore: jest.fn(),
}));

jest.mock('@/services/sosotalk', () => {
  const actual = jest.requireActual('@/services/sosotalk');

  return {
    ...actual,
    useGetSosoTalkPostDetail: jest.fn(),
  };
});

const { useAuthStore } = jest.requireMock('@/store/auth-store') as {
  useAuthStore: jest.Mock;
};

const { useGetSosoTalkPostDetail } = jest.requireMock('@/services/sosotalk') as {
  useGetSosoTalkPostDetail: jest.Mock;
};

const mockPostDetailResponse = {
  id: 1,
  teamId: 'dallaem',
  title: '마포 고깃집 같이 가실 분',
  content: '<p>오늘 저녁 같이 식사하실 분 구해요.</p>',
  image: 'https://example.com/post-image.jpg',
  authorId: 10,
  viewCount: 20,
  likeCount: 24,
  createdAt: new Date('2026-03-18T09:00:00.000Z'),
  updatedAt: new Date('2026-03-18T09:00:00.000Z'),
  author: {
    id: 10,
    name: '김미수',
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

describe('SosoTalkPostDetailPage', () => {
  beforeEach(() => {
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

    useGetSosoTalkPostDetail.mockReturnValue({
      data: mockPostDetailResponse,
      isLoading: false,
      isError: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('댓글 버튼을 누르면 댓글 섹션으로 스크롤한다', async () => {
    const user = userEvent.setup();

    render(<SosoTalkPostDetailPage postId="1" />);

    await user.click(screen.getByRole('button', { name: '댓글 6개' }));

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('좋아요 버튼을 누르면 좋아요 수가 증가한다', async () => {
    const user = userEvent.setup();

    render(<SosoTalkPostDetailPage postId="1" />);

    await user.click(screen.getByRole('button', { name: '좋아요 24개' }));

    expect(screen.getByRole('button', { name: '좋아요 25개' })).toBeInTheDocument();
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

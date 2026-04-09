import { render, screen } from '@testing-library/react';

import { SosoTalkMainPage } from './sosotalk-main-page';

const mockUseSosoTalkMainPage = jest.fn();
const mockFilterBar = jest.fn();

jest.mock('./model', () => ({
  useSosoTalkMainPage: () => mockUseSosoTalkMainPage(),
}));

jest.mock('../sosotalk-banner', () => ({
  SosoTalkBanner: (props: Record<string, unknown>) => (
    <div data-testid="sosotalk-banner">{String(props.alt)}</div>
  ),
}));

jest.mock('../sosotalk-card', () => ({
  SosoTalkCard: (props: Record<string, unknown>) => (
    <div data-testid="sosotalk-card">{String(props.title)}</div>
  ),
}));

jest.mock('../sosotalk-filter-bar', () => ({
  SosoTalkFilterBar: (props: Record<string, unknown>) => {
    mockFilterBar(props);

    return <div data-testid="sosotalk-filter-bar">filter</div>;
  },
}));

describe('SosoTalkMainPage', () => {
  beforeEach(() => {
    mockUseSosoTalkMainPage.mockReturnValue({
      activeSort: 'latest',
      activeTab: 'all',
      isError: false,
      isLoading: false,
      posts: [],
      setActiveSort: jest.fn(),
      setActiveTab: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('로딩 중에는 로딩 문구를 보여준다', () => {
    mockUseSosoTalkMainPage.mockReturnValue({
      activeSort: 'latest',
      activeTab: 'all',
      isError: false,
      isLoading: true,
      posts: [],
      setActiveSort: jest.fn(),
      setActiveTab: jest.fn(),
    });

    render(<SosoTalkMainPage />);

    expect(screen.getByText('게시글을 불러오는 중이에요.')).toBeInTheDocument();
  });

  it('조회에 실패하면 에러 문구를 보여준다', () => {
    mockUseSosoTalkMainPage.mockReturnValue({
      activeSort: 'latest',
      activeTab: 'all',
      isError: true,
      isLoading: false,
      posts: [],
      setActiveSort: jest.fn(),
      setActiveTab: jest.fn(),
    });

    render(<SosoTalkMainPage />);

    expect(
      screen.getByText('게시글 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.')
    ).toBeInTheDocument();
  });

  it('게시글이 없으면 빈 상태 문구를 보여준다', () => {
    render(<SosoTalkMainPage />);

    expect(screen.getByText('아직 등록된 게시글이 없어요.')).toBeInTheDocument();
  });

  it('게시글이 있으면 카드 목록과 작성 링크를 보여준다', () => {
    mockUseSosoTalkMainPage.mockReturnValue({
      activeSort: 'likes',
      activeTab: 'popular',
      isError: false,
      isLoading: false,
      posts: [
        { id: 1, title: '첫 번째 글' },
        { id: 2, title: '두 번째 글' },
      ],
      setActiveSort: jest.fn(),
      setActiveTab: jest.fn(),
    });

    render(<SosoTalkMainPage />);

    expect(screen.getAllByTestId('sosotalk-card')).toHaveLength(2);
    expect(screen.getByRole('link', { name: '게시글 작성' })).toHaveAttribute(
      'href',
      '/sosotalk/write'
    );
    expect(mockFilterBar).toHaveBeenCalledWith(
      expect.objectContaining({
        activeSort: 'likes',
        activeTab: 'popular',
      })
    );
  });
});

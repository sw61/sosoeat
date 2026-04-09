import { render, screen } from '@testing-library/react';

import { SosoTalkPostDetailPage } from './sosotalk-post-detail-page';

jest.mock('./model', () => ({
  SOSOTALK_AUTHOR_IMAGE_FALLBACK: '/fallback-profile.png',
  formatSosoTalkRelativeTime: jest.fn(),
  mapCommentToCommentItemData: jest.fn(),
  useSosoTalkPostDetailPage: jest.fn(),
}));

jest.mock('./sosotalk-post-detail/sosotalk-post-detail', () => ({
  SosoTalkPostDetail: () => <div>detail</div>,
}));

const { useSosoTalkPostDetailPage } = jest.requireMock('./model') as {
  useSosoTalkPostDetailPage: jest.Mock;
};

const createBaseState = () => ({
  commentSectionRef: { current: null },
  currentUser: null,
  data: undefined,
  comments: [],
  commentCount: 0,
  commentInput: '',
  editingCommentId: null,
  editingCommentInput: '',
  isEditPending: false,
  displayedLikeCount: 0,
  isError: false,
  isLikePending: false,
  isLiked: false,
  isLoading: false,
  isValidPostId: true,
  setCommentInput: jest.fn(),
  setEditingCommentInput: jest.fn(),
  handleCancelEditComment: jest.fn(),
  handleCommentClick: jest.fn(),
  handleDeleteClick: jest.fn(),
  handleDeleteComment: jest.fn(),
  handleEditClick: jest.fn(),
  handleLikeClick: jest.fn(),
  handleShareClick: jest.fn(),
  handleStartEditComment: jest.fn(),
  handleSubmitComment: jest.fn(),
  handleSubmitEditComment: jest.fn(),
});

describe('SosoTalkPostDetailPage edge cases', () => {
  beforeEach(() => {
    useSosoTalkPostDetailPage.mockReturnValue(createBaseState());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('잘못된 postId면 안내 문구를 보여준다', () => {
    useSosoTalkPostDetailPage.mockReturnValue({
      ...createBaseState(),
      isValidPostId: false,
    });

    render(<SosoTalkPostDetailPage postId="invalid-id" />);

    expect(screen.getByText('올바르지 않은 게시글입니다.')).toBeInTheDocument();
    expect(useSosoTalkPostDetailPage).toHaveBeenCalledWith('invalid-id');
  });

  it('조회에 실패하면 에러 문구를 보여준다', () => {
    useSosoTalkPostDetailPage.mockReturnValue({
      ...createBaseState(),
      isError: true,
      data: undefined,
    });

    render(<SosoTalkPostDetailPage postId="1" />);

    expect(
      screen.getByText('게시글을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.')
    ).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';

import { SosoTalkWritePageClient } from './sosotalk-write-page-client';

jest.mock('../model', () => ({
  useSosoTalkWritePage: () => ({
    data: undefined,
    isEditMode: false,
    isError: false,
    isLoading: false,
    isSubmitting: false,
    handleCreateSubmit: jest.fn(),
    handleEditSubmit: jest.fn(),
  }),
}));

jest.mock('./sosotalk-post-editor', () => ({
  SosoTalkPostEditor: () => <div data-testid="sosotalk-post-editor">editor</div>,
}));

describe('SosoTalkWritePageClient edge cases', () => {
  it('잘못된 postId로 수정 페이지에 들어오면 안내 문구를 보여준다', () => {
    render(<SosoTalkWritePageClient isInvalidEditPostId />);

    expect(screen.getByText('올바르지 않은 게시글입니다.')).toBeInTheDocument();
    expect(screen.queryByTestId('sosotalk-post-editor')).not.toBeInTheDocument();
  });
});

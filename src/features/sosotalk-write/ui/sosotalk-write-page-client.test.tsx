import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SosoTalkWritePageClient } from './sosotalk-write-page-client';

const mockUseSosoTalkWritePage = jest.fn();
const mockEditor = jest.fn();

jest.mock('../model', () => ({
  useSosoTalkWritePage: (params: unknown) => mockUseSosoTalkWritePage(params),
}));

jest.mock('./sosotalk-post-editor', () => ({
  SosoTalkPostEditor: (props: Record<string, unknown>) => {
    mockEditor(props);

    return <div data-testid="sosotalk-post-editor">editor</div>;
  },
}));

describe('SosoTalkWritePageClient', () => {
  beforeEach(() => {
    mockUseSosoTalkWritePage.mockReturnValue({
      data: undefined,
      isEditMode: false,
      isError: false,
      isLoading: false,
      isSubmitting: false,
      handleCreateSubmit: jest.fn(),
      handleEditSubmit: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('작성 모드에서는 생성 전용 editor를 렌더링한다', async () => {
    const user = userEvent.setup();
    const handleCreateSubmit = jest.fn();

    mockUseSosoTalkWritePage.mockReturnValue({
      data: undefined,
      isEditMode: false,
      isError: false,
      isLoading: false,
      isSubmitting: true,
      handleCreateSubmit,
      handleEditSubmit: jest.fn(),
    });

    render(<SosoTalkWritePageClient />);

    expect(screen.getByTestId('sosotalk-post-editor')).toBeInTheDocument();
    expect(mockEditor).toHaveBeenCalledWith(
      expect.objectContaining({
        isSubmitting: true,
        onSubmit: expect.any(Function),
      })
    );

    const submittedPayload = {
      title: '제목',
      contentHtml: '<p>본문</p>',
      contentText: '본문',
      imageFile: null,
      displayImageUrl: '',
    };

    await mockEditor.mock.calls.at(-1)?.[0].onSubmit(submittedPayload);

    expect(handleCreateSubmit).toHaveBeenCalledWith(submittedPayload);
    expect(mockUseSosoTalkWritePage).toHaveBeenCalledWith({ editPostId: undefined });
    expect(user).toBeDefined();
  });

  it('수정 모드 로딩 중에는 로딩 문구를 보여준다', () => {
    mockUseSosoTalkWritePage.mockReturnValue({
      data: undefined,
      isEditMode: true,
      isError: false,
      isLoading: true,
      isSubmitting: false,
      handleCreateSubmit: jest.fn(),
      handleEditSubmit: jest.fn(),
    });

    render(<SosoTalkWritePageClient editPostId={3} />);

    expect(screen.getByText('게시글 정보를 불러오는 중이에요.')).toBeInTheDocument();
    expect(screen.queryByTestId('sosotalk-post-editor')).not.toBeInTheDocument();
  });

  it('수정 모드에서 조회에 실패하면 에러 문구를 보여준다', () => {
    mockUseSosoTalkWritePage.mockReturnValue({
      data: undefined,
      isEditMode: true,
      isError: true,
      isLoading: false,
      isSubmitting: false,
      handleCreateSubmit: jest.fn(),
      handleEditSubmit: jest.fn(),
    });

    render(<SosoTalkWritePageClient editPostId={3} />);

    expect(screen.getByText('수정할 게시글 정보를 불러오지 못했어요.')).toBeInTheDocument();
  });

  it('수정 모드에서는 기존 값을 editor에 전달하고 수정 submit을 연결한다', async () => {
    const handleEditSubmit = jest.fn();
    const data = {
      title: '기존 제목',
      content: '<p>기존 본문</p>',
      image: 'https://example.com/image.jpg',
    };

    mockUseSosoTalkWritePage.mockReturnValue({
      data,
      isEditMode: true,
      isError: false,
      isLoading: false,
      isSubmitting: false,
      handleCreateSubmit: jest.fn(),
      handleEditSubmit,
    });

    render(<SosoTalkWritePageClient editPostId={3} />);

    expect(mockEditor).toHaveBeenCalledWith(
      expect.objectContaining({
        initialTitle: '기존 제목',
        initialContent: '<p>기존 본문</p>',
        initialImageUrl: 'https://example.com/image.jpg',
        submitLabel: '수정',
        onSubmit: expect.any(Function),
      })
    );

    const submittedPayload = {
      title: '수정 제목',
      contentHtml: '<p>수정 본문</p>',
      contentText: '수정 본문',
      imageFile: null,
      displayImageUrl: 'https://example.com/image.jpg',
    };

    await mockEditor.mock.calls.at(-1)?.[0].onSubmit(submittedPayload);

    expect(handleEditSubmit).toHaveBeenCalledWith(submittedPayload);
  });
});

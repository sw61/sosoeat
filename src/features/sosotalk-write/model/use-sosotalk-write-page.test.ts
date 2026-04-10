import { act, renderHook, waitFor } from '@testing-library/react';

import { useSosoTalkWritePage } from './use-sosotalk-write-page';

const mockPush = jest.fn();
const mockToastError = jest.fn();
const mockUploadSosoTalkPostImage = jest.fn();
const mockCreateMutateAsync = jest.fn();
const mockUpdateMutateAsync = jest.fn();
const mockUseGetSosoTalkPostDetail = jest.fn();
const mockUseCreateSosoTalkPost = jest.fn();
const mockUseUpdateSosoTalkPost = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('sonner', () => ({
  toast: {
    error: (...args: unknown[]) => mockToastError(...args),
  },
}));

jest.mock('@/entities/post', () => ({
  uploadSosoTalkPostImage: (...args: unknown[]) => mockUploadSosoTalkPostImage(...args),
  useCreateSosoTalkPost: () => mockUseCreateSosoTalkPost(),
  useGetSosoTalkPostDetail: (...args: unknown[]) => mockUseGetSosoTalkPostDetail(...args),
  useUpdateSosoTalkPost: () => mockUseUpdateSosoTalkPost(),
}));

describe('useSosoTalkWritePage', () => {
  beforeEach(() => {
    mockPush.mockReset();
    mockToastError.mockReset();
    mockUploadSosoTalkPostImage.mockReset();
    mockCreateMutateAsync.mockReset();
    mockUpdateMutateAsync.mockReset();
    mockUseGetSosoTalkPostDetail.mockReset();
    mockUseCreateSosoTalkPost.mockReset();
    mockUseUpdateSosoTalkPost.mockReset();

    mockUseGetSosoTalkPostDetail.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });

    mockUseCreateSosoTalkPost.mockReturnValue({
      mutateAsync: mockCreateMutateAsync,
      isPending: false,
    });

    mockUseUpdateSosoTalkPost.mockReturnValue({
      mutateAsync: mockUpdateMutateAsync,
      isPending: false,
    });
  });

  it('작성 성공 시 이미지를 업로드하고 상세 페이지로 이동한다', async () => {
    const imageFile = new File(['image'], 'meal.png', { type: 'image/png' });
    mockUploadSosoTalkPostImage.mockResolvedValue('https://example.com/uploaded.png');
    mockCreateMutateAsync.mockResolvedValue({ id: 123 });

    const { result } = renderHook(() => useSosoTalkWritePage({}));

    await act(async () => {
      await result.current.handleCreateSubmit({
        title: '점심 메이트 구해요',
        contentHtml: '<p>같이 드실 분?</p>',
        contentText: '같이 드실 분?',
        imageFile,
        displayImageUrl: '',
      });
    });

    expect(mockUploadSosoTalkPostImage).toHaveBeenCalledWith(imageFile);
    expect(mockCreateMutateAsync).toHaveBeenCalledWith({
      payload: {
        title: '점심 메이트 구해요',
        content: '<p>같이 드실 분?</p>',
        image: 'https://example.com/uploaded.png',
      },
    });
    expect(mockPush).toHaveBeenCalledWith('/sosotalk/123');
    expect(result.current.isSubmitting).toBe(false);
  });

  it('작성 실패 시 에러 토스트를 보여주고 submitting 상태를 해제한다', async () => {
    mockCreateMutateAsync.mockRejectedValue(new Error('create failed'));

    const { result } = renderHook(() => useSosoTalkWritePage({}));

    await act(async () => {
      await result.current.handleCreateSubmit({
        title: '저녁 메이트',
        contentHtml: '<p>저녁 같이 드실 분</p>',
        contentText: '저녁 같이 드실 분',
        imageFile: null,
        displayImageUrl: 'https://example.com/fallback.png',
      });
    });

    expect(mockToastError).toHaveBeenCalledWith('게시글 등록에 실패했어요. 다시 시도해 주세요.');
    expect(mockPush).not.toHaveBeenCalled();
    expect(result.current.isSubmitting).toBe(false);
  });

  it('수정 성공 시 기존 이미지 값을 포함해 수정 후 상세 페이지로 이동한다', async () => {
    mockUseGetSosoTalkPostDetail.mockReturnValue({
      data: {
        id: 7,
        title: '기존 제목',
        content: '<p>기존 본문</p>',
        image: 'https://example.com/original.png',
      },
      isLoading: false,
      isError: false,
    });
    mockUpdateMutateAsync.mockResolvedValue(undefined);

    const { result } = renderHook(() => useSosoTalkWritePage({ editPostId: 7 }));

    await act(async () => {
      await result.current.handleEditSubmit({
        title: '수정된 제목',
        contentHtml: '<p>수정된 본문</p>',
        contentText: '수정된 본문',
        imageFile: null,
        displayImageUrl: 'https://example.com/original.png',
      });
    });

    expect(mockUpdateMutateAsync).toHaveBeenCalledWith({
      postId: 7,
      payload: {
        title: '수정된 제목',
        content: '<p>수정된 본문</p>',
        image: 'https://example.com/original.png',
      },
    });
    expect(mockPush).toHaveBeenCalledWith('/sosotalk/7');
  });

  it('수정 실패 시 에러 토스트를 보여준다', async () => {
    mockUseGetSosoTalkPostDetail.mockReturnValue({
      data: {
        id: 9,
        title: '기존 제목',
        content: '<p>기존 본문</p>',
        image: '',
      },
      isLoading: false,
      isError: false,
    });
    mockUpdateMutateAsync.mockRejectedValue(new Error('update failed'));

    const { result } = renderHook(() => useSosoTalkWritePage({ editPostId: 9 }));

    await act(async () => {
      await result.current.handleEditSubmit({
        title: '수정 제목',
        contentHtml: '<p>수정 본문</p>',
        contentText: '수정 본문',
        imageFile: null,
        displayImageUrl: 'https://example.com/original.png',
      });
    });

    expect(mockToastError).toHaveBeenCalledWith('게시글 수정에 실패했어요. 다시 시도해 주세요.');
    expect(mockPush).not.toHaveBeenCalledWith('/sosotalk/9');
    expect(result.current.isSubmitting).toBe(false);
  });

  it('수정 모드에서는 상세 조회 상태를 그대로 노출한다', async () => {
    mockUseGetSosoTalkPostDetail.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    const { result } = renderHook(() => useSosoTalkWritePage({ editPostId: 11 }));

    await waitFor(() => {
      expect(result.current.isEditMode).toBe(true);
      expect(result.current.isLoading).toBe(true);
      expect(mockUseGetSosoTalkPostDetail).toHaveBeenCalledWith(11);
    });
  });
});

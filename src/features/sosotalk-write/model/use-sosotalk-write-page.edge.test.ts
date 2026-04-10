import { act, renderHook } from '@testing-library/react';
import { toast } from 'sonner';

import { useSosoTalkWritePage } from './use-sosotalk-write-page';

const mockPush = jest.fn();
const mockUploadSosoTalkPostImage = jest.fn();
const mockCreateMutateAsync = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock('@/entities/post', () => ({
  uploadSosoTalkPostImage: (...args: unknown[]) => mockUploadSosoTalkPostImage(...args),
  useCreateSosoTalkPost: () => ({
    mutateAsync: mockCreateMutateAsync,
    isPending: false,
  }),
  useGetSosoTalkPostDetail: () => ({
    data: undefined,
    isLoading: false,
    isError: false,
  }),
  useUpdateSosoTalkPost: () => ({
    mutateAsync: jest.fn(),
    isPending: false,
  }),
}));

describe('useSosoTalkWritePage edge cases', () => {
  beforeEach(() => {
    mockPush.mockReset();
    mockUploadSosoTalkPostImage.mockReset();
    mockCreateMutateAsync.mockReset();
  });

  it('이미지를 제거한 뒤 작성하면 image 없이 등록된다', async () => {
    mockCreateMutateAsync.mockResolvedValue({ id: 456 });

    const { result } = renderHook(() => useSosoTalkWritePage({}));

    await act(async () => {
      await result.current.handleCreateSubmit({
        title: '이미지 없이 작성',
        contentHtml: '<p>본문</p>',
        contentText: '본문',
        imageFile: null,
        displayImageUrl: '',
      });
    });

    expect(mockUploadSosoTalkPostImage).not.toHaveBeenCalled();
    expect(mockCreateMutateAsync).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith('이미지는 필수입니다.');
    expect(mockPush).not.toHaveBeenCalled();
  });
});

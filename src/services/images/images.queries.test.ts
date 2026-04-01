import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { imagesApi } from './images.api';
import { useUploadImage } from './images.queries';

const createWrapper = () => {
  const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

jest.mock('./images.api', () => ({
  imagesApi: {
    getPresignedUrl: jest.fn(),
    uploadToS3: jest.fn(),
  },
}));

const mockGetPresignedUrl = imagesApi.getPresignedUrl as jest.Mock;
const mockUploadToS3 = imagesApi.uploadToS3 as jest.Mock;

const mockFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
const mockPresignedUrl = 'https://s3.example.com/presigned';
const mockPublicUrl = 'https://s3.example.com/public/test.jpg';

describe('useUploadImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('업로드 성공 시 publicUrl을 반환한다', async () => {
    mockGetPresignedUrl.mockResolvedValue({
      presignedUrl: mockPresignedUrl,
      publicUrl: mockPublicUrl,
    });
    mockUploadToS3.mockResolvedValue(undefined);

    const { result } = renderHook(() => useUploadImage('meetings'), {
      wrapper: createWrapper(),
    });

    result.current.mutate(mockFile);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBe(mockPublicUrl);
    expect(mockGetPresignedUrl).toHaveBeenCalledWith(mockFile, 'meetings');
    expect(mockUploadToS3).toHaveBeenCalledWith(mockPresignedUrl, mockFile);
  });

  it('getPresignedUrl 실패 시 에러 상태가 된다', async () => {
    mockGetPresignedUrl.mockRejectedValue(new Error('이미지 업로드에 실패했습니다.'));

    const { result } = renderHook(() => useUploadImage('meetings'), {
      wrapper: createWrapper(),
    });

    result.current.mutate(mockFile);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(new Error('이미지 업로드에 실패했습니다.'));
    expect(mockUploadToS3).not.toHaveBeenCalled();
  });

  it('uploadToS3 실패 시 에러 상태가 된다', async () => {
    mockGetPresignedUrl.mockResolvedValue({
      presignedUrl: mockPresignedUrl,
      publicUrl: mockPublicUrl,
    });
    mockUploadToS3.mockRejectedValue(new Error('이미지 업로드에 실패했습니다.'));

    const { result } = renderHook(() => useUploadImage('meetings'), {
      wrapper: createWrapper(),
    });

    result.current.mutate(mockFile);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(new Error('이미지 업로드에 실패했습니다.'));
  });
});

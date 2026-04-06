import { fetchClient } from '@/shared/api/fetch-client';

import { imagesApi } from './images.api';

jest.mock('@/shared/api/fetch-client', () => ({
  fetchClient: {
    post: jest.fn(),
  },
}));

const mockFetchClient = fetchClient.post as jest.Mock;

const mockFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' });

describe('imagesApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPresignedUrl', () => {
    it('presignedUrl과 publicUrl을 반환한다', async () => {
      const mockData = {
        presignedUrl: 'https://s3.example.com/presigned',
        publicUrl: 'https://s3.example.com/public/test.jpg',
      };

      mockFetchClient.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      });

      const result = await imagesApi.getPresignedUrl(mockFile, 'meetings');

      expect(mockFetchClient).toHaveBeenCalledWith('/images', {
        fileName: 'image.jpg',
        contentType: 'image/jpeg',
        folder: 'meetings',
      });
      expect(result).toEqual(mockData);
    });

    it('응답이 ok가 아니면 에러를 throw한다', async () => {
      mockFetchClient.mockResolvedValue({
        ok: false,
        json: jest.fn().mockResolvedValue({ message: '서버 에러' }),
      });

      await expect(imagesApi.getPresignedUrl(mockFile, 'meetings')).rejects.toThrow('서버 에러');
    });

    it('에러 응답에 message가 없으면 기본 메시지로 throw한다', async () => {
      mockFetchClient.mockResolvedValue({
        ok: false,
        json: jest.fn().mockResolvedValue({}),
      });

      await expect(imagesApi.getPresignedUrl(mockFile, 'meetings')).rejects.toThrow(
        '이미지 업로드에 실패했습니다.'
      );
    });
  });

  describe('uploadToS3', () => {
    const presignedUrl = 'https://s3.example.com/presigned';
    let fetchSpy: jest.SpyInstance;
    let originalFetch: typeof global.fetch;

    beforeAll(() => {
      originalFetch = global.fetch;
    });

    beforeEach(() => {
      if (!global.fetch) {
        Object.defineProperty(global, 'fetch', {
          value: jest.fn(),
          writable: true,
          configurable: true,
        });
      }
      fetchSpy = jest.spyOn(global, 'fetch');
    });

    afterEach(() => {
      fetchSpy.mockRestore();
      if (!originalFetch) {
        // @ts-expect-error global.fetch 제거
        delete global.fetch;
      }
    });

    it('presignedUrl로 PUT 요청을 보낸다', async () => {
      fetchSpy.mockResolvedValue({ ok: true } as unknown as Response);

      await imagesApi.uploadToS3(presignedUrl, mockFile);

      expect(fetchSpy).toHaveBeenCalledWith(presignedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'image/jpeg' },
        body: mockFile,
      });
    });

    it('응답이 ok가 아니면 에러를 throw한다', async () => {
      fetchSpy.mockResolvedValue({ ok: false } as unknown as Response);

      await expect(imagesApi.uploadToS3(presignedUrl, mockFile)).rejects.toThrow(
        '이미지 업로드에 실패했습니다.'
      );
    });
  });
});

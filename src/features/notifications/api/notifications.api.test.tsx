import { fetchClient } from '@/shared/api/fetch-client';

import { notificationApi } from './notifications.api';

jest.mock('@/shared/api/fetch-client', () => ({
  fetchClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  },
}));

describe('notificationApi', () => {
  it('markAsRead를 호출할 때 올바른 읽음 처리 URL로 요청합니다.', async () => {
    const notificationId = 1;

    (fetchClient.put as jest.Mock).mockResolvedValue({ ok: true });

    await notificationApi.markAsRead(notificationId);

    expect(fetchClient.put).toHaveBeenCalledWith(`/notifications/${notificationId}/read`);
  });
});

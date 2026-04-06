import { fetchClient } from '@/shared/api/fetch-client';

import { notificationApi } from './notification.api';

jest.mock('@/shared/api/fetch-client', () => ({
  fetchClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  },
}));

describe('Notification API', () => {
  it('readNotification을 할때 URL이 `/notifications/${notificationId}/read` 가 됩니다.', async () => {
    const notificationId = 1;

    (fetchClient.put as jest.Mock).mockResolvedValue({ ok: true });

    await notificationApi.readNotification({
      notificationId,
    });

    expect(fetchClient.put).toHaveBeenCalledWith(`/notifications/${notificationId}/read`);
  });
});

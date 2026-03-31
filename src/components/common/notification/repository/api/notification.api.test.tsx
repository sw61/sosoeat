import { fetchClient } from '@/lib/http/fetch-client';

import { notificationApi } from './notification.api';

jest.mock('@/lib/http/fetch-client', () => ({
  fetchClient: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

describe('Notification API', () => {
  it('readNotification을 할때 URL이 `/notifications/${notificationId}/read` 가 됩니다.', async () => {
    const notificationId = 1;

    (fetchClient.get as jest.Mock).mockResolvedValue({ ok: true });

    await notificationApi.readNotification({
      notificationId,
    });

    expect(fetchClient.get).toHaveBeenCalledWith(`/notifications/${notificationId}/read`);
  });
});

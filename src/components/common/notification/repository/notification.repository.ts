import { notificationApi } from './api';

export const notificationRepository = {
  readNotification: notificationApi.readNotification,
  fetchLatestPostComment: notificationApi.fetchLatestPostComment,
  fetchLatestNotifications: notificationApi.fetchLatestNotifications,
};

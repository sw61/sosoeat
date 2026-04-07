import type { ReactNode } from 'react';

import type { NotificationThumbnailKey } from '../../../../model';

import { ApprovedIcon, CommentIcon, MeetingIcon, UserIcon } from './_components/icons';

export const getNotificationThumbnail = (thumbnailKey: NotificationThumbnailKey): ReactNode => {
  switch (thumbnailKey) {
    case 'user':
      return <UserIcon />;
    case 'meeting':
      return <MeetingIcon />;
    case 'comment':
      return <CommentIcon />;
    default:
      return <ApprovedIcon />;
  }
};

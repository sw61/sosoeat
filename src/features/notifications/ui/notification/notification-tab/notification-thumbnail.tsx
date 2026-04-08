import type { ReactNode } from 'react';

import type { NotificationThumbnailKey } from '../../../lib/notification-view.utils';
import { ApprovedIcon } from '../icons/approved-icon/approved-icon';
import { CommentIcon } from '../icons/comment-icon/comment-icon';
import { MeetingIcon } from '../icons/meeting-icon/meeting-icon';
import { UserIcon } from '../icons/user-icon/user-icon';

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

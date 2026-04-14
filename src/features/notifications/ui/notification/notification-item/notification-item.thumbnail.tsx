import type { ReactNode } from 'react';

import Image from 'next/image';

import type { NotificationThumbnailKey } from '../../../lib/notification-view.utils';

import { ApprovedIcon, CommentIcon, MeetingIcon, UserIcon } from './notification-item.icons';

const getFallbackIcon = (thumbnailKey: NotificationThumbnailKey): ReactNode => {
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

interface NotificationItemThumbnailProps {
  thumbnailKey: NotificationThumbnailKey;
  image?: string;
}

export const NotificationItemThumbnail = ({
  thumbnailKey,
  image,
}: NotificationItemThumbnailProps) => {
  if (image) {
    return (
      <div className="size-[40px] shrink-0 overflow-hidden rounded-[8px]">
        <Image src={image} alt="" width={80} height={80} className="size-full object-cover" />
      </div>
    );
  }

  return getFallbackIcon(thumbnailKey);
};

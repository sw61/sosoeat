import { Suspense } from 'react';

import { format } from 'date-fns';

import { CountCard } from './_components/count-card';
import { MeetingTabs } from './_components/meeting-tabs';
import { UserCard } from './_components/user-card';
import {
  fetchFavoriteCountServer,
  fetchMeetingCountServer,
  fetchMeServer,
} from './repositories/mypage.repository.server';

export default async function MyPage() {
  const [user, meetingCount, favoriteCount] = await Promise.all([
    fetchMeServer(),
    fetchMeetingCountServer(),
    fetchFavoriteCountServer(),
  ]);

  return (
    <div className="bg-sosoeat-gray-100 min-h-screen">
      <div className="relative flex justify-center">
        <UserCard
          name={user?.name ?? ''}
          joinedAt={user ? format(user.createdAt, 'yyyy.MM.dd') : undefined}
          email={user?.email}
          imageUrl={user?.image}
          className="lg:max-w-276"
        />
      </div>

      <div className="flex flex-row justify-center gap-5 md:p-5">
        <CountCard variant="meeting" count={meetingCount} />
        <CountCard variant="favorite" count={favoriteCount} />
        <CountCard variant="post" count={5} />
      </div>

      <Suspense>
        <MeetingTabs />
      </Suspense>
    </div>
  );
}

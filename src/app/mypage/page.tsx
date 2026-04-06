import { Suspense } from 'react';

import { format } from 'date-fns';

import {
  fetchFavoriteCountServer,
  fetchMeetingCountServer,
  fetchMeServer,
  fetchPostCountServer,
} from '@/widgets/mypage/model/mypage.repository.server';
import { CountCard } from '@/widgets/mypage/ui/count-card';
import { MeetingTabs } from '@/widgets/mypage/ui/meeting-tabs';
import { UserCard } from '@/widgets/mypage/ui/user-card';

export default async function MyPage() {
  const user = await fetchMeServer();
  const [meetingCount, favoriteCount, postCount] = await Promise.all([
    fetchMeetingCountServer(),
    fetchFavoriteCountServer(),
    user ? fetchPostCountServer(user.id) : Promise.resolve(0),
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
        <CountCard variant="post" count={postCount} />
      </div>

      <Suspense>
        <MeetingTabs />
      </Suspense>
    </div>
  );
}

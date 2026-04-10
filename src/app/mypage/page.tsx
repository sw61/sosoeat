import { Suspense } from 'react';

import { format } from 'date-fns';

import {
  CountCard,
  FavoriteCountCard,
  fetchFavoriteCountServer,
  fetchMeetingCountServer,
  fetchMeServer,
  fetchPostCountServer,
  MeetingCountCard,
  MeetingTabs,
  UserCard,
} from '@/widgets/mypage';

export default async function MyPage() {
  const user = await fetchMeServer();
  const [meetingCount, favoriteCount, postCount] = await Promise.all([
    fetchMeetingCountServer(),
    fetchFavoriteCountServer(),
    fetchPostCountServer(),
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
        <MeetingCountCard initialCount={meetingCount} />
        <FavoriteCountCard initialCount={favoriteCount} />
        <CountCard variant="post" count={postCount} />
      </div>

      <Suspense>
        <MeetingTabs />
      </Suspense>
    </div>
  );
}

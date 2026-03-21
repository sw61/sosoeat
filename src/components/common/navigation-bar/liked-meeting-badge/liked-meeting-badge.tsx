'use client';

import { useQuery } from '@tanstack/react-query';

// TODO: API 연동 시 백엔드 주소 및 teamId env 변수로 교체 예정
const API_BASE_URL = `api/{teamId}/favorites/count`;

async function getLikedMeetingCount(): Promise<number> {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch');
  const data = await res.json();
  return data.count;
}

export function LikedMeetingBadge() {
  // 찜 버튼 컴포넌트에서 찜 액션 성공 후 아래 key로 invalidateQueries 호출 필요
  const { data: count = 0, isLoading } = useQuery({
    queryKey: ['likedMeetingCount'],
    queryFn: getLikedMeetingCount,
  });

  if (isLoading) return null;

  return (
    <span className="bg-sosoeat-orange-600 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white">
      {count}
    </span>
  );
}

'use client';

import { MainPageCard, type Meeting } from '@/entities/meeting';
import { HeartButton } from '@/features/favorites';

import { EmptyPage } from '../empty-page';
import SearchSkeleton from '../search-screen/search-skeleton';

import { LoadingDots } from './loading-dots';

type SearchResultsProps = {
  meetingData: Meeting[];
  isLoading: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  resultsRef: (node?: Element | null) => void;
};

export function SearchResults({
  meetingData,
  isLoading,
  isError,
  isFetchingNextPage,
  hasNextPage,
  resultsRef,
}: SearchResultsProps) {
  if (isLoading) {
    return <SearchSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex min-h-80 w-full items-center justify-center rounded-2xl border border-[#F3F4F6] bg-white px-6 py-12 text-center">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sosoeat-gray-900 text-lg font-semibold">
            모임 목록을 불러오지 못했어요.
          </p>
          <p className="text-sosoeat-gray-600 text-sm">
            잠시 후 다시 시도해 주세요. 문제가 계속되면 필터를 변경하거나 페이지를 새로고침해
            주세요.
          </p>
        </div>
      </div>
    );
  }

  if (meetingData.length === 0) {
    return <EmptyPage />;
  }

  return (
    <>
      <div className="grid grid-cols-1 justify-center justify-items-center gap-4 min-[768px]:grid-cols-2 min-[768px]:gap-5 min-[1140px]:grid-cols-3 min-[1140px]:gap-6.75">
        {meetingData.map((meeting) => (
          <MainPageCard
            key={meeting.id}
            meeting={meeting}
            renderFavoriteButton={(id, isFavorited) => (
              <HeartButton meetingId={id} isFavorited={isFavorited} size="md" />
            )}
          />
        ))}
        <div ref={resultsRef} className="col-span-full flex h-1 items-center justify-center" />
      </div>
      {isFetchingNextPage ? (
        <LoadingDots />
      ) : (
        !hasNextPage && (
          <span className="text-sosoeat-gray-600 col-span-full flex justify-center">
            더 이상 모임이 없습니다.
          </span>
        )
      )}
    </>
  );
}

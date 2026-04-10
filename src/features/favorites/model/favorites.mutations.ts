'use client';

import { useEffect, useRef } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthStore } from '@/entities/auth';
import { favoriteKeys, favoritesApi } from '@/entities/favorites';

const DEBOUNCE_MS = 700;

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ meetingId, isFavorited }: { meetingId: number; isFavorited: boolean }) =>
      isFavorited ? favoritesApi.favoritePost(meetingId) : favoritesApi.favoriteDelete(meetingId),
    onMutate: async ({ meetingId, isFavorited }) => {
      await queryClient.cancelQueries({ queryKey: favoriteKeys.count() });
      await queryClient.cancelQueries({ queryKey: favoriteKeys.status(meetingId) });
      const previousCount = queryClient.getQueryData<number>(favoriteKeys.count());
      const previousStatus = queryClient.getQueryData<boolean>(favoriteKeys.status(meetingId));
      queryClient.setQueryData(favoriteKeys.count(), (prev: number = 0) =>
        isFavorited ? prev + 1 : Math.max(0, prev - 1)
      );
      return { previousCount, previousStatus, meetingId };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(favoriteKeys.status(context!.meetingId), context?.previousStatus);
      queryClient.setQueryData(favoriteKeys.count(), context?.previousCount);
    },
    onSuccess: (_data, { meetingId, isFavorited }) => {
      queryClient.invalidateQueries({ queryKey: favoriteKeys.count() });
      queryClient.setQueryData(favoriteKeys.status(meetingId), isFavorited);
    },
  });
};

// 하트 버튼 debounce + 낙관적 UI 업데이트
export const useFavoriteMeeting = (initialIsFavorited: boolean, meetingId: number) => {
  const { data: isFavorited = initialIsFavorited } = useQuery({
    queryKey: favoriteKeys.status(meetingId),
    queryFn: () => initialIsFavorited,
    initialData: initialIsFavorited,
    staleTime: 0,
    enabled: meetingId !== -1,
  });

  const { mutate: toggleMutate } = useToggleFavorite();
  const queryClient = useQueryClient();
  const { isAuthenticated, setLoginRequired } = useAuthStore();

  // 서버에 마지막으로 커밋된 상태
  const committedRef = useRef(initialIsFavorited);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleFavorite = () => {
    if (!isAuthenticated) {
      setLoginRequired(true);
      return;
    }

    // 로컬 UI만 즉시 토글
    const nextLocalState = !queryClient.getQueryData<boolean>(favoriteKeys.status(meetingId));
    queryClient.setQueryData(favoriteKeys.status(meetingId), nextLocalState);

    // 기존 타이머 취소 후 재설정
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      // 최종 상태가 커밋 상태와 다를 때만 API 호출
      const finalState =
        queryClient.getQueryData<boolean>(favoriteKeys.status(meetingId)) ?? committedRef.current;
      if (finalState !== committedRef.current) {
        toggleMutate(
          { meetingId, isFavorited: finalState },
          {
            onSuccess: () => {
              committedRef.current = finalState;
            },
            onError: () => {
              queryClient.setQueryData(favoriteKeys.status(meetingId), committedRef.current);
            },
          }
        );
      }
    }, DEBOUNCE_MS);
  };

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { isFavorited, toggleFavorite };
};

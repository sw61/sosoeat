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
      const previousCount = queryClient.getQueryData<number>(favoriteKeys.count());
      queryClient.setQueryData(favoriteKeys.count(), (prev: number = 0) =>
        isFavorited ? prev + 1 : Math.max(0, prev - 1)
      );
      return { previousCount, meetingId };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(favoriteKeys.count(), context?.previousCount);
    },
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: favoriteKeys.count() }),
        queryClient.invalidateQueries({ queryKey: favoriteKeys.list() }),
      ]);
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

  const committedRef = useRef(initialIsFavorited);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPendingRef = useRef(false);
  const hasUserInteractedRef = useRef(false);

  // meetingId가 변경되면 상호작용 상태를 초기화 (컴포넌트 재사용 대응)
  useEffect(() => {
    hasUserInteractedRef.current = false;
    committedRef.current = initialIsFavorited;
  }, [meetingId]);

  // 사용자가 아직 상호작용하지 않은 상태에서 initialIsFavorited가 변경되면 캐시를 동기화
  useEffect(() => {
    if (!hasUserInteractedRef.current) {
      queryClient.setQueryData(favoriteKeys.status(meetingId), initialIsFavorited);
      committedRef.current = initialIsFavorited;
    }
  }, [initialIsFavorited, meetingId, queryClient]);

  const sendRequest = (targetState: boolean) => {
    isPendingRef.current = true;
    toggleMutate(
      { meetingId, isFavorited: targetState },
      {
        onSuccess: () => {
          committedRef.current = targetState;
          isPendingRef.current = false;
          const currentUI =
            queryClient.getQueryData<boolean>(favoriteKeys.status(meetingId)) ??
            committedRef.current;
          if (currentUI !== committedRef.current) {
            sendRequest(currentUI);
          }
        },
        onError: () => {
          isPendingRef.current = false;
          queryClient.setQueryData(favoriteKeys.status(meetingId), committedRef.current);
        },
      }
    );
  };

  const toggleFavorite = () => {
    if (!isAuthenticated) {
      setLoginRequired(true);
      return;
    }

    hasUserInteractedRef.current = true;
    const nextLocalState = !queryClient.getQueryData<boolean>(favoriteKeys.status(meetingId));
    queryClient.setQueryData(favoriteKeys.status(meetingId), nextLocalState);

    if (isPendingRef.current) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const finalState =
        queryClient.getQueryData<boolean>(favoriteKeys.status(meetingId)) ?? committedRef.current;
      if (finalState !== committedRef.current) {
        sendRequest(finalState);
      }
    }, DEBOUNCE_MS);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { isFavorited, toggleFavorite };
};

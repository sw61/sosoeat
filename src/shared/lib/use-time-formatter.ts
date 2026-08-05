'use client';
import { useEffect, useState } from 'react';
import { TZDate } from 'react-day-picker';

export const useTimeFormatter = (registrationEnd: Date | null, referenceNow?: string) => {
  const [now, setNow] = useState(() => new Date(referenceNow ?? Date.now()));
  const [showCountdown, setShowCountdown] = useState(false);

  const startDate = new TZDate(now, 'Asia/Seoul');
  const endDate = registrationEnd === null ? null : new TZDate(registrationEnd, 'Asia/Seoul');

  const diffMs = endDate === null ? -1 : endDate.getTime() - startDate.getTime();
  const oneDayMs = 24 * 60 * 60 * 1000;
  const oneHourMs = 60 * 60 * 1000;
  const isEnded: boolean = diffMs <= 0;
  /** 마감까지 24시간 초과 */
  const isMoreThanOneDayLeft: boolean = diffMs > oneDayMs;

  const totalMinutesLeft: number = Math.max(0, Math.floor(diffMs / 60000));
  const hoursLeft: number = Math.floor(totalMinutesLeft / 60);
  const minutesLeft: number = totalMinutesLeft % 60;

  /** 24시간 이하: 시·분 / 24시간 초과: 일·시간 */
  const countdownText = () => {
    if (isEnded) return '';
    if (isMoreThanOneDayLeft) {
      const days: number = Math.floor(diffMs / oneDayMs);
      const hours: number = Math.floor((diffMs % oneDayMs) / oneHourMs);
      return `모집완료 ${days}일 ${hours}시간 남았어요!`;
    }
    if (hoursLeft === 0) return `${minutesLeft}분 남았어요!`;
    return `모집완료 ${hoursLeft}시간 ${minutesLeft}분 남았어요!`;
  };

  const expectedDateText = () => {
    if (!endDate) return '';

    const month: number = endDate.getMonth() + 1;
    const date: number = endDate.getDate();
    const hours: string = endDate.getHours().toString().padStart(2, '0');
    const minutes: string = endDate.getMinutes().toString().padStart(2, '0');
    return `${month}월 ${date}일 ${hours}:${minutes} 모집 마감!`;
  };

  useEffect(() => {
    if (registrationEnd === null || isEnded) return;
    const id = setInterval(() => {
      setNow(new Date());
      setShowCountdown((prev) => !prev);
    }, 3000);
    return () => clearInterval(id);
  }, [registrationEnd, isEnded]);

  if (registrationEnd === null) {
    return null;
  }

  const contentText: string = showCountdown ? countdownText() : expectedDateText();

  return { contentText, isEnded, showCountdown };
};

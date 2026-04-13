'use client';

import { useRouter } from 'next/navigation';

import { trackEvent } from '@/shared/lib/amplitude';

export const useDetailRouter = ({ id }: { id: number }) => {
  const router = useRouter();

  const handleCardClick = () => {
    trackEvent('click_meeting_card', { meetingId: id });
    console.log(`Meeting card clicked: ${id}`);
    router.push(`/meetings/${id}`);
  };
  const handleCardKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
    }
  };

  return {
    handleCardClick,
    handleCardKeyDown,
  };
};

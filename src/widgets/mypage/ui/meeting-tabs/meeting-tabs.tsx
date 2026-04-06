'use client';

import { useCallback } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useMeetingTabs } from '@/widgets/mypage/model/use-meeting-tabs';
import { MyPageCard } from '@/widgets/mypage/ui/mypage-card/mypage-card';

import { Tabs, TabsContent } from './tabs/tabs';
import { MYPAGE_TABS, TabValue } from './meeting-tabs.types';
import { MeetingTabsEmpty } from './meeting-tabs-empty';
import { MeetingTabsList } from './meeting-tabs-list';

const TAB_PARAM_MAP: Record<string, TabValue> = {
  liked: 'favorite',
  favorite: 'favorite',
  created: 'created',
  all: 'all',
};

export function MeetingTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get('tab') ?? 'all';
  const activeTab: TabValue = TAB_PARAM_MAP[tabParam] ?? 'all';

  const setActiveTab = useCallback(
    (value: TabValue) => {
      router.push(`/mypage?tab=${value}`);
    },
    [router]
  );

  const { cards: fetchedCards, isLoading } = useMeetingTabs(activeTab);

  const MOCK_CARDS = [
    {
      meetingId: 1,
      title: '힐링 오피스 스트레칭',
      currentCount: 5,
      maxCount: 10,
      location: '강남구',
      month: 4,
      day: 30,
      hour: 18,
      minute: 0,
      variant: 'groupEat' as const,
      confirmedAt: new Date(),
      isCompleted: false,
    },
    {
      meetingId: 2,
      title: '점심 같이 먹어요',
      currentCount: 3,
      maxCount: 5,
      location: '마포구',
      month: 3,
      day: 15,
      hour: 12,
      minute: 30,
      variant: 'groupBuy' as const,
      confirmedAt: null,
      isCompleted: true,
    },
  ];

  const cards = fetchedCards.length > 0 ? fetchedCards : MOCK_CARDS;

  return (
    <Tabs
      className="mx-auto w-full max-w-285 p-6"
      value={activeTab}
      onValueChange={(v) => setActiveTab(v as TabValue)}
    >
      <MeetingTabsList />

      {MYPAGE_TABS.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="w-full items-center justify-center"
        >
          {isLoading ? (
            <div className="py-40 text-center text-sm text-gray-400">불러오는 중...</div>
          ) : cards.length === 0 ? (
            <MeetingTabsEmpty />
          ) : (
            <div className="flex flex-col items-center gap-4 py-4 lg:flex-row lg:flex-wrap lg:justify-center">
              {cards.map((card) => (
                <MyPageCard key={card.meetingId} {...card} />
              ))}
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}

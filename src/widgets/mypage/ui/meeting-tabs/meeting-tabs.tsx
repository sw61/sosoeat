'use client';

import { useCallback } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useMeetingTabs } from '../../model/use-meeting-tabs';
import { MyPageCard } from '../mypage-card';

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
  const tabParam = searchParams?.get('tab') ?? 'all';
  const activeTab: TabValue = TAB_PARAM_MAP[tabParam] ?? 'all';

  const setActiveTab = useCallback(
    (value: TabValue) => {
      router.push(`/mypage?tab=${value}`);
    },
    [router]
  );

  const { cards: fetchedCards, isLoading } = useMeetingTabs(activeTab);

  const cards = fetchedCards ?? [];

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
            <div className="grid grid-cols-1 justify-items-center gap-4 py-4 lg:grid-cols-2 lg:justify-items-start">
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

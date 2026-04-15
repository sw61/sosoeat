'use client';

import { useEffect, useState, useTransition } from 'react';

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
  const [isPending, startTransition] = useTransition();
  const tabParam = searchParams?.get('tab') ?? 'all';
  const urlTab: TabValue = TAB_PARAM_MAP[tabParam] ?? 'all';
  const [optimisticTab, setOptimisticTab] = useState<TabValue>(urlTab);
  const activeTab = isPending ? optimisticTab : urlTab;

  useEffect(() => {
    setOptimisticTab(urlTab);
  }, [urlTab]);

  const setActiveTab = (value: TabValue) => {
    setOptimisticTab(value);
    startTransition(() => {
      router.replace(`/mypage?tab=${value}`);
    });
  };

  const { cards: fetchedCards, isLoading } = useMeetingTabs(activeTab);

  const cards = fetchedCards ?? [];

  return (
    <Tabs
      className="mx-auto flex w-full max-w-285 flex-1 flex-col p-6"
      value={activeTab}
      onValueChange={(v) => setActiveTab(v as TabValue)}
    >
      <MeetingTabsList />

      {MYPAGE_TABS.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="flex w-full flex-1 flex-col">
          {isLoading ? (
            <div className="py-40 text-center text-sm text-gray-400">불러오는 중...</div>
          ) : cards.length === 0 ? (
            <MeetingTabsEmpty />
          ) : (
            <div className="grid grid-cols-1 justify-items-center gap-4 py-4 lg:grid-cols-2 lg:justify-items-start">
              {cards.map((card) => (
                <MyPageCard key={card.meetingId} {...card} href={`/meetings/${card.meetingId}`} />
              ))}
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}

'use client';

import { useState } from 'react';

import { Tabs, TabsContent } from './tabs/tabs';
import { MYPAGE_TABS, TabValue } from './meeting-tabs.types';
import { MeetingTabsEmpty } from './meeting-tabs-empty';
import { MeetingTabsList } from './meeting-tabs-list';

export function MeetingTabs() {
  const [activeTab, setActiveTab] = useState<TabValue>('all');
  // 추후 실제 데이터로 교체
  const isEmpty = true;

  return (
    <Tabs
      className="max-w-[1108px] p-6 px-2 max-sm:flex max-sm:w-full max-sm:flex-col"
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
          {isEmpty ? (
            <MeetingTabsEmpty />
          ) : (
            // 추후 MeetingTabsListContent으로 교체
            <div>모임 목록</div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}

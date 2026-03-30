import { TabsList, TabsTrigger } from './tabs/tabs';
import { MYPAGE_TABS, TabValue } from './meeting-tabs.types';

export function MeetingTabsList() {
  return (
    <TabsList className="border-sosoeat-gray-200 relative flex h-auto w-full justify-start rounded-none border-b-2 bg-transparent p-0 max-sm:items-center max-sm:justify-center max-sm:border-b">
      {MYPAGE_TABS.map((tab) => (
        <TabsTrigger key={tab.value} value={tab.value}>
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}

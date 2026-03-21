import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { RegionSelectModal } from '@/app/meetings/_components/region-select-modal';
import { Button } from '@/components/ui/button/button';
import regionData from '@/data/korea-regions-districts.json';

const meta = {
  title: 'app/meetings/region-select-modal',
  component: RegionSelectModal,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RegionSelectModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본 (텍스트 트리거)',
  args: {
    trigger: '지역 선택',
    title: '지역 선택',
    description: '들어갈 내용',
  },
};

export const WithButtonTrigger: Story = {
  name: '버튼 트리거',
  args: {
    trigger: <Button variant="outline">지역 선택</Button>,
    title: '지역 선택',
    description: '원하는 시·구를 선택하세요.',
  },
};

export const WithBody: Story = {
  name: '본문 슬롯',
  args: {
    trigger: <Button>자세히 보기</Button>,
    title: '안내',
    description: '아래 내용을 확인해 주세요.',
    children: (
      <p className="text-muted-foreground text-sm">
        드롭다운·필터 등 자식 컴포넌트를 여기에 둘 수 있습니다.
      </p>
    ),
  },
};

export const WithDropdownSubConfirm: Story = {
  name: 'DropdownSub · 확인 시 반영',
  args: {
    trigger: <Button variant="outline">지역 선택</Button>,
    title: '지역 선택',
    description: '구를 고른 뒤 확인을 누르면 아래 값이 갱신됩니다. 취소·X는 반영하지 않습니다.',
  },
  render: (args) => {
    const [committed, setCommitted] = useState<Record<string, string>>({});
    const first = regionData.regions[0];

    return (
      <div className="flex flex-col items-center gap-4">
        <RegionSelectModal
          {...args}
          dropdownSub={{
            data: { label: first.name, options: first.districts },
            value: committed,
            onChange: setCommitted,
          }}
        />
        <pre className="text-muted-foreground max-w-md text-xs wrap-break-word">
          {JSON.stringify(committed, null, 2)}
        </pre>
      </div>
    );
  },
};

export const WithExternalDraft: Story = {
  name: 'draft 외부 주입',
  args: {
    trigger: <Button variant="outline">지역 선택</Button>,
    title: '지역 선택',
    description:
      'draft는 아래 첫 번째 JSON에 실시간 반영되고, 확인 시에만 두 번째(확정)가 바뀝니다.',
  },
  render: (args) => {
    const [committed, setCommitted] = useState<Record<string, string>>({});
    const [draft, setDraft] = useState<Record<string, string>>({});
    const first = regionData.regions[0];

    return (
      <div className="flex max-w-md flex-col items-stretch gap-4">
        <RegionSelectModal
          {...args}
          draftValue={draft}
          onDraftChange={setDraft}
          dropdownSub={{
            data: { label: first.name, options: first.districts },
            value: committed,
            onChange: setCommitted,
          }}
        />
        <div className="text-muted-foreground grid gap-2 text-xs">
          <div>
            <span className="text-foreground font-medium">draft (외부 state)</span>
            <pre className="bg-muted/50 mt-1 rounded-md p-2 wrap-break-word">
              {JSON.stringify(draft, null, 2)}
            </pre>
          </div>
          <div>
            <span className="text-foreground font-medium">committed (확인 후)</span>
            <pre className="bg-muted/50 mt-1 rounded-md p-2 wrap-break-word">
              {JSON.stringify(committed, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  },
};

// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import regionDataRaw from '../../data/korea-regions-districts.json';
import type { Region } from '../../data/korea-regions-districts.types';

import { DropdownSub } from './dropdown-sub';

const regionData = regionDataRaw as { regions: Region[] };

const meta = {
  component: DropdownSub,
} satisfies Meta<typeof DropdownSub>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    data: {
      label: regionData.regions[0].name,
      options: regionData.regions[0].districts,
    },
    value: {},
    onChange: () => {},
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const [value, setValue] = useState<Record<string, string>>({});
    return <DropdownSub {...args} value={value} onChange={setValue} />;
  },
};

export const Customized: Story = {
  args: {
    data: {
      label: regionData.regions[0].name,
      options: regionData.regions[0].districts,
    },
    value: {},
    onChange: () => {},
    triggerClassName:
      'rounded-xl border-2 border-emerald-500 bg-emerald-50 px-4 py-2 font-semibold text-emerald-900 hover:bg-emerald-100',
    contentClassName: 'min-w-56 rounded-xl shadow-lg border border-emerald-200',
    itemClassName:
      'hover:bg-emerald-100 data-[state=checked]:bg-emerald-200 data-[state=checked]:text-emerald-900',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const [value, setValue] = useState<Record<string, string>>({});
    return <DropdownSub {...args} value={value} onChange={setValue} />;
  },
};

const multipleRegionsRegions = regionData.regions.slice(0, 4); // 서울, 부산, 대구, 인천

const customizedClassName = {
  triggerClassName:
    'rounded-xl border-2 border-emerald-500 bg-emerald-50 px-4 py-2 font-semibold text-emerald-900 hover:bg-emerald-100',
  contentClassName: 'min-w-56 rounded-xl shadow-lg border border-emerald-200',
  itemClassName:
    'hover:bg-emerald-100 data-[state=checked]:bg-emerald-200 data-[state=checked]:text-emerald-900',
};

export const MultipleRegions: Story = {
  args: {
    data: {
      label: regionData.regions[0].name,
      options: regionData.regions[0].districts,
    },
    value: {},
    onChange: () => {},
  },
  render: () => {
    const [value, setValue] = useState<Record<string, string>>({});

    return (
      <div className="flex flex-wrap gap-3">
        {multipleRegionsRegions.map((region: Region) => (
          <DropdownSub
            key={region.id}
            data={{ label: region.name, options: region.districts }}
            value={value}
            onChange={setValue}
          />
        ))}
      </div>
    );
  },
};

export const MultipleRegionsCustomized: Story = {
  args: {
    data: {
      label: regionData.regions[0].name,
      options: regionData.regions[0].districts,
    },
    value: {},
    onChange: () => {},
    ...customizedClassName,
  },
  render: () => {
    const [value, setValue] = useState<Record<string, string>>({});

    return (
      <div className="flex w-100 flex-col flex-wrap gap-3">
        {multipleRegionsRegions.map((region: Region) => (
          <DropdownSub
            key={region.id}
            data={{ label: region.name, options: region.districts }}
            value={value}
            onChange={setValue}
            {...customizedClassName}
          />
        ))}
      </div>
    );
  },
};

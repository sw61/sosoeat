import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { TimeInput } from './time-input';
import { TimePicker } from './time-picker';

const meta = {
  title: 'components/ui/time-picker',
  component: TimeInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: '입력항목 레이블' },
    errorMessage: { control: 'text', description: '에러 발생 시 표시할 메시지' },
    value: { control: 'text', description: '시간 값 (HH:mm 형식)' },
  },
} satisfies Meta<typeof TimeInput>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * 기본 TimeInput 형태입니다. (Form 연동용)
 * 클릭 시 팝업이 열리며 시간을 즉시 선택할 수 있습니다.
 */
export const Default: Story = {
  args: {
    label: '모임 시간',
    value: '14:30',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    useEffect(() => {
      setValue(args.value);
    }, [args.value]);

    return (
      <div className="w-[300px] space-y-4">
        <TimeInput
          {...args}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            args.onChange?.(e);
          }}
        />
        <p className="text-sosoeat-gray-600 mt-4 text-center text-sm">선택된 값: {value}</p>
      </div>
    );
  },
};

/**
 * 에러 상태의 TimeInput입니다.
 */
export const WithError: Story = {
  args: {
    label: '마감 시간',
    value: '09:00',
    errorMessage: '시간을 다시 확인해 주세요.',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    useEffect(() => {
      setValue(args.value);
    }, [args.value]);

    return (
      <div className="w-[300px]">
        <TimeInput
          {...args}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            args.onChange?.(e);
          }}
        />
      </div>
    );
  },
};

/**
 * TimePicker 단독 컴포넌트입니다. (직접 내장할 때 사용)
 */
export const PickerOnly: StoryObj<typeof TimePicker> = {
  args: {
    value: '12:00',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || '12:00');

    useEffect(() => {
      setValue(args.value || '12:00');
    }, [args.value]);

    return (
      <div className="flex flex-col items-center gap-4">
        <TimePicker
          {...args}
          value={value}
          onChange={(nextTime) => {
            setValue(nextTime);
            args.onChange?.(nextTime, 'hour'); // simple mock for Storybook actions
          }}
        />
        <p className="text-sosoeat-gray-900 text-sm font-medium">현재 선택: {value}</p>
      </div>
    );
  },
};

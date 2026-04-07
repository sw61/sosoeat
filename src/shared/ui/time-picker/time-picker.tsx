'use client';

import * as React from 'react';

import { cn } from '../../lib/utils';

export interface TimePickerProps {
  value?: string; // HH:mm
  onChange?: (value: string, type: 'hour' | 'minute') => void;
  className?: string;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const MINUTES = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

export const TimePicker = ({ value = '00:00', onChange, className }: TimePickerProps) => {
  const parts = (value || '00:00').split(':');
  const [hour, minute] = [parts[0] || '00', parts[1] || '00'];

  const hourRef = React.useRef<HTMLDivElement>(null);
  const minuteRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const scrollSelected = (container: HTMLDivElement | null) => {
      if (!container) return;
      const selectedItem = container.querySelector('[data-selected="true"]');
      if (selectedItem) {
        selectedItem.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    };

    setTimeout(() => {
      scrollSelected(hourRef.current);
      scrollSelected(minuteRef.current);
    }, 100);
  }, [hour, minute]);

  const handleHourSelect = (h: string) => {
    onChange?.(`${h}:${minute}`, 'hour');
  };

  const handleMinuteSelect = (m: string) => {
    onChange?.(`${hour}:${m}`, 'minute');
  };

  return (
    <div
      className={cn(
        'border-sosoeat-gray-100 flex h-[266px] w-[160px] overflow-hidden rounded-xl border bg-white p-3 font-sans',
        className
      )}
    >
      {/* Hours Column */}
      <div
        ref={hourRef}
        onWheelCapture={(e) => e.stopPropagation()}
        className="[&::-webkit-scrollbar-thumb]:bg-sosoeat-gray-200 h-full min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        <div className="flex flex-col items-center gap-1.5">
          {HOURS.map((h) => {
            const isSelected = h === hour;
            return (
              <button
                key={h}
                type="button"
                data-selected={isSelected}
                onClick={() => handleHourSelect(h)}
                className={cn(
                  'flex h-[33px] w-[42px] shrink-0 items-center justify-center rounded-lg text-sm transition-colors',
                  isSelected
                    ? 'bg-sosoeat-orange-50 text-sosoeat-orange-600 font-bold'
                    : 'text-sosoeat-gray-900 hover:bg-sosoeat-gray-50'
                )}
              >
                {h}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-sosoeat-gray-100 my-2 w-px shrink-0" />

      {/* Minutes Column */}
      <div
        ref={minuteRef}
        onWheelCapture={(e) => e.stopPropagation()}
        className="[&::-webkit-scrollbar-thumb]:bg-sosoeat-gray-200 h-full min-h-0 flex-1 overflow-y-auto overscroll-contain pl-1 [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        <div className="flex flex-col items-center gap-1.5">
          {MINUTES.map((m) => {
            const isSelected = m === minute;
            return (
              <button
                key={m}
                type="button"
                data-selected={isSelected}
                onClick={() => handleMinuteSelect(m)}
                className={cn(
                  'flex h-[33px] w-[42px] shrink-0 items-center justify-center rounded-lg text-sm transition-colors',
                  isSelected
                    ? 'bg-sosoeat-orange-50 text-sosoeat-orange-600 font-bold'
                    : 'text-sosoeat-gray-900 hover:bg-sosoeat-gray-50'
                )}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

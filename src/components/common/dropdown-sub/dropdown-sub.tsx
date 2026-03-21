import { ChevronDownIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown/index';
import { cn } from '@/lib/utils';

import type { DropdownSubProp } from './dropdown-sub.type';

export function DropdownSub({
  data,
  value,
  onChange,
  triggerClassName,
  contentClassName,
  itemClassName,
}: DropdownSubProp) {
  const selectedOption = value[data.label];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'focus-visible:ring-sosoeat-orange-600/35 inline-flex w-full min-w-0 items-center justify-between gap-2 text-left outline-none focus-visible:ring-2',
          triggerClassName
        )}
      >
        <span className="min-w-0 flex-1 truncate">{data.label}</span>
        <ChevronDownIcon
          className="text-sosoeat-gray-800 pointer-events-none size-6 shrink-0"
          aria-hidden
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={contentClassName}>
        <DropdownMenuGroup>
          {data.options.map((district) => (
            <DropdownMenuCheckboxItem
              key={district}
              checked={selectedOption === district}
              onSelect={(e) => e.preventDefault()}
              onCheckedChange={(checked) => {
                onChange(
                  checked
                    ? { ...value, [data.label]: district }
                    : (() => {
                        const next = { ...value };
                        if (next[data.label] === district) {
                          delete next[data.label];
                        }
                        return next;
                      })()
                );
              }}
              className={itemClassName}
            >
              {district}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { cn } from '@/shared/lib/utils';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown';

import type { DropdownSimpleProp } from './dropdown-simple.types';

export function DropdownSimple({
  options,
  placeholder = '선택',
  value,
  onChange,
  triggerClassName = ' ',
  itemClassName = ' ',
  contentClassName = ' ',
}: DropdownSimpleProp) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={triggerClassName}>{placeholder}</DropdownMenuTrigger>
      <DropdownMenuContent className={cn(contentClassName)}>
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={value === option}
            onCheckedChange={() => {
              onChange(option);
            }}
            className={itemClassName}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

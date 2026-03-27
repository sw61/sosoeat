import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown/index';

import type { DropdownSimpleProp } from './dropdown-simple.type';

export function DropdownSimple({
  options,
  placeholder = '선택',
  value,
  onChange,
  triggerClassName = ' ',
  itemClassName = ' ',
}: DropdownSimpleProp) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={triggerClassName}>{placeholder}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={value === option}
            onSelect={(e) => e.preventDefault()}
            onCheckedChange={(checked) => {
              onChange(checked ? option : null);
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

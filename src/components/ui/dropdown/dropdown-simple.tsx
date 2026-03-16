import type { DropdownSimpleProp } from '@/components/ui/dropdown';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown';

export function DropdownSimple({
  options,
  placeholder = '선택',
  value,
  onChange,
}: DropdownSimpleProp) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{placeholder}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={value === option}
            onSelect={(e) => e.preventDefault()}
            onCheckedChange={(checked) => {
              onChange(checked ? option : null);
            }}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

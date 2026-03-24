import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown/index';

import type { DropdownSubProp } from './dropdown-sub.types';

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
      <DropdownMenuTrigger className={triggerClassName}>{data.label}</DropdownMenuTrigger>
      <DropdownMenuContent className={contentClassName}>
        <DropdownMenuGroup>
          {data.options.map((district) => (
            <DropdownMenuCheckboxItem
              key={district}
              checked={selectedOption === district}
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

import { useState } from 'react';

import type { LocalDroupDownProp } from '@/components/ui/dropdown';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown';

export function LocalDropDownSub({ data, value, onChange }: LocalDroupDownProp) {
  const selectedOption = value[data.label];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{data.label}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {data.options.map((district) => {
            return (
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
              >
                {district}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

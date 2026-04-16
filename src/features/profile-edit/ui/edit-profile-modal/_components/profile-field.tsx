'use client';

import { Field, FieldContent, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import type { ProfileFieldProps } from '../edit-profile-modal.types';

const inputClassName =
  'bg-sosoeat-gray-100 h-12 w-full rounded-[14px] px-4 text-sm transition-all duration-300 md:text-base placeholder:text-sosoeat-gray-500 font-normal outline-none focus:border-sosoeat-orange-600 border border-transparent focus:ring-0 focus-visible:ring-0 aria-invalid:ring-0';
const fieldLabelClassName = 'text-sm font-semibold';

export function ProfileField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  maxLength,
  error,
}: ProfileFieldProps) {
  return (
    <Field orientation="vertical" className="gap-2">
      <FieldLabel htmlFor={id} className={fieldLabelClassName}>
        {label}
      </FieldLabel>
      <FieldContent>
        <Input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className={inputClassName}
          maxLength={maxLength}
        />
        {error && <p className="text-destructive mt-1 ml-1 text-xs">{error}</p>}
      </FieldContent>
    </Field>
  );
}

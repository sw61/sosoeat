'use client';

import { Field, FieldContent, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import type { ProfileFieldProps } from '../edit-profile-modal.types';

const inputClassName =
  'focus:border-sosoeat-gray-700 border border-transparent focus:ring-0 focus:outline-none';
const fieldLabelClassName = 'text-sm font-semibold';

export function ProfileField({ id, label, type = 'text', value, onChange }: ProfileFieldProps) {
  return (
    <Field orientation="vertical" className="gap-2">
      <FieldLabel htmlFor={id} className={fieldLabelClassName}>
        {label}
      </FieldLabel>
      <FieldContent>
        <Input id={id} type={type} value={value} onChange={onChange} className={inputClassName} />
      </FieldContent>
    </Field>
  );
}

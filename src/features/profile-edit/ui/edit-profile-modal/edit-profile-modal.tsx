'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';

import { Loader2, Pencil, PencilLine, XIcon } from 'lucide-react';

import { useUploadImage } from '@/entities/image';
import { PresignedUrlRequestFolderEnum } from '@/shared/types/generated-client';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Field, FieldContent, FieldGroup, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import type {
  EditProfileModalProps,
  ProfileFieldProps,
  ProfileImageEditorProps,
} from './edit-profile-modal.types';

const styles = {
  input: 'focus:border-sosoeat-gray-700 border border-transparent focus:ring-0 focus:outline-none',
  fieldLabel: 'text-sm font-semibold',
  actionButton:
    'w-fill h-12 md:h-15 flex-1 md:rounded-2xl rounded-xl py-3 text-base md:text-xl font-semibold',
} as const;

function ProfileImageEditor({ imageUrl, onChange }: ProfileImageEditorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync, isPending } = useUploadImage(PresignedUrlRequestFolderEnum.Users);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const publicUrl = await mutateAsync(file);
    if (publicUrl) onChange(publicUrl);
  };

  return (
    <div className="flex justify-center">
      <div className="relative">
        <Image
          src={imageUrl || '/default-profile.png'}
          alt="프로필 이미지"
          width={116}
          height={116}
          className="ring-sosoeat-gray-300 rounded-full object-cover ring-1"
        />
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          type="button"
          disabled={isPending}
          onClick={() => inputRef.current?.click()}
          className="ring-sosoeat-gray-300 absolute right-1 bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 ring-1 md:right-1 md:bottom-7"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Pencil className="h-6 w-6" />
          )}
        </Button>
      </div>
    </div>
  );
}

function ProfileField({ id, label, type = 'text', value, onChange }: ProfileFieldProps) {
  return (
    <Field orientation="vertical" className="gap-2">
      <FieldLabel htmlFor={id} className={styles.fieldLabel}>
        {label}
      </FieldLabel>
      <FieldContent>
        <Input id={id} type={type} value={value} onChange={onChange} className={styles.input} />
      </FieldContent>
    </Field>
  );
}

export function EditProfileModal({
  initialName = '',
  initialEmail = '',
  initialImageUrl = '',
  onSubmit,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: EditProfileModalProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [internalOpen, setInternalOpen] = useState(false);

  const open = externalOpen ?? internalOpen;
  const setOpen = externalOnOpenChange ?? setInternalOpen;

  const handleSubmit = () => {
    onSubmit?.({ name, email, imageUrl });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-sosoeat-gray-200 text-sosoeat-gray-700 ring-sosoeat-gray-300 hidden h-[34.45px] w-[104.04px] flex-row items-center justify-center gap-1 rounded-xl text-xs font-bold ring-1 md:flex">
          <PencilLine className="h-[12.99px] w-[12.99px]" />
          프로필 수정
        </button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="h-124.75 w-85.75 max-w-none rounded-4xl bg-white p-9 shadow-xl sm:max-w-none md:h-156.75 md:w-136"
      >
        <DialogHeader className="flex w-full flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold text-gray-900">프로필 수정하기</DialogTitle>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="size-8 shrink-0 text-[#737373] hover:bg-transparent hover:text-[#737373]"
              aria-label="닫기"
            >
              <XIcon className="size-6" strokeWidth={1.8} />
            </Button>
          </DialogClose>
        </DialogHeader>

        <ProfileImageEditor imageUrl={imageUrl} onChange={setImageUrl} />

        <FieldGroup className="gap-4">
          <ProfileField
            id="name"
            label="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <ProfileField
            id="email"
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FieldGroup>

        <DialogFooter className="flex flex-row gap-3 border-0 bg-white">
          <DialogClose asChild>
            <Button
              className={`${styles.actionButton} border-sosoeat-gray-300 border bg-white text-gray-700 hover:bg-gray-50`}
            >
              취소
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            className={`${styles.actionButton} bg-sosoeat-orange-600 text-white`}
          >
            수정하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

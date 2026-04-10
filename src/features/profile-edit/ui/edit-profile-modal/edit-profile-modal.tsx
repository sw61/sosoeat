'use client';

import { useState } from 'react';

import { PencilLine, XIcon } from 'lucide-react';

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
import { FieldGroup } from '@/shared/ui/field';

import { useUpdateProfile } from '../../model/profile-edit.mutations';

import { ProfileField } from './_components/profile-field';
import { ProfileImageEditor } from './_components/profile-image-editor';
import type { EditProfileModalProps } from './edit-profile-modal.types';

const actionButtonClassName =
  'w-fill h-12 md:h-15 flex-1 md:rounded-2xl rounded-xl py-3 text-base md:text-xl font-semibold';

export function EditProfileModal({
  initialName = '',
  initialImageUrl = '',
  onSuccess,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: EditProfileModalProps) {
  const [name, setName] = useState(initialName);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [internalOpen, setInternalOpen] = useState(false);

  const open = externalOpen ?? internalOpen;
  const setOpen = externalOnOpenChange ?? setInternalOpen;

  const { mutate, isPending } = useUpdateProfile(onSuccess);

  const handleSubmit = () => {
    mutate({ name, image: imageUrl || undefined }, { onSuccess: () => setOpen(false) });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-sosoeat-gray-200 text-sosoeat-gray-700 ring-sosoeat-gray-500 hidden h-[34.45px] w-[104.04px] cursor-pointer flex-row items-center justify-center gap-1 rounded-xl text-xs font-bold ring-1 md:flex">
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
              className="size-8 shrink-0 cursor-pointer text-[#737373] hover:bg-transparent hover:text-[#737373]"
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
        </FieldGroup>

        <DialogFooter className="flex flex-row gap-3 border-0 bg-white">
          <DialogClose asChild>
            <Button
              className={`${actionButtonClassName} border-sosoeat-gray-300 hover:bg-sosoeat-gray-100 cursor-pointer border bg-white text-gray-700`}
            >
              취소
            </Button>
          </DialogClose>
          <Button
            disabled={isPending}
            onClick={handleSubmit}
            className={`${actionButtonClassName} bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 cursor-pointer text-white`}
          >
            수정하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

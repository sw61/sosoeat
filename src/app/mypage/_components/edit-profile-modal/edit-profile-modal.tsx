'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Pencil, PencilLine, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldContent, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

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

function ProfileImageEditor({ imageUrl }: ProfileImageEditorProps) {
  // 실제 프롭스로 넘어온 이미지가 있으면 그걸 쓰고, 없으면 public 폴더의 기본 이미지를 씁니다.
  const imageSrc = imageUrl || '/default-profile.png';

  return (
    <div className="flex justify-center">
      <div className="relative">
        <Image
          src={imageSrc} // ✅ 2. "/" 대신 imageSrc 변수를 넣습니다.
          alt="프로필 이미지"
          width={116}
          height={116}
          className="ring-sosoeat-gray-300 rounded-full object-cover ring-1"
        />
        <Button className="ring-sosoeat-gray-300 absolute right-1 bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 ring-1 md:right-1 md:bottom-7">
          <Pencil className="h-6 w-6" />
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
}: EditProfileModalProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [open, setOpen] = useState(false);
  const handleSubmit = () => {
    onSubmit?.({ name, email });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-sosoeat-gray-200 text-sosoeat-gray-700 ring-sosoeat-gray-300 flex h-[34.45px] w-[104.04px] flex-row items-center justify-center gap-1 rounded-xl text-xs font-bold ring-1">
          <PencilLine className="h-[12.99px] w-[12.99px]" />
          프로필 수정
        </button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="h-[499px] w-[343px] max-w-none rounded-4xl bg-white p-9 shadow-xl sm:max-w-none md:h-[627px] md:w-[544px]"
      >
        {/* Title + shadcn 기본 X버튼 */}
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

        {/* 프로필 이미지 */}
        <ProfileImageEditor imageUrl={initialImageUrl} />

        {/* 이름, 이메일 필드 */}
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

        {/* 취소, 수정하기 버튼 */}
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

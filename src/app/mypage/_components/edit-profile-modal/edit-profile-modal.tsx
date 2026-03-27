'use client';

import { useState } from 'react';

import { PencilIcon, UserIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';

import type { EditProfileModalProps } from './edit-profile-modal.types';

export function EditProfileModal({
  isOpen,
  onClose,
  initialName = '',
  initialEmail = '',
  onSubmit,
}: EditProfileModalProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-background relative flex h-[627px] w-[544px] flex-col rounded-2xl p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <h2 className="text-sosoeat-gray-900 text-xl font-semibold">프로필 수정하기</h2>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="text-sosoeat-gray-600 hover:text-sosoeat-gray-900 transition-colors"
          >
            <XIcon className="size-6" />
          </button>
        </div>

        {/* 프로필 이미지 영역 */}
        <div className="mt-8 flex justify-center">
          <div className="relative">
            <div className="bg-sosoeat-gray-200 flex size-[120px] items-center justify-center rounded-full">
              <UserIcon className="text-sosoeat-gray-400 size-16" />
            </div>
            <button
              type="button"
              aria-label="프로필 이미지 변경"
              className="bg-background border-sosoeat-gray-300 absolute right-0 bottom-0 flex size-9 items-center justify-center rounded-full border shadow-sm"
            >
              <PencilIcon className="text-sosoeat-gray-600 size-4" />
            </button>
          </div>
        </div>

        {/* 입력 폼 */}
        <div className="mt-8 flex flex-col gap-5">
          {/* 이름 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="edit-profile-name"
              className="text-sosoeat-gray-800 text-sm font-medium"
            >
              이름
            </label>
            <Input
              id="edit-profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-sosoeat-gray-300 bg-sosoeat-gray-100 focus-visible:border-sosoeat-gray-700 h-[52px] rounded-xl px-4 text-base focus-visible:ring-0"
            />
          </div>

          {/* 이메일 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="edit-profile-email"
              className="text-sosoeat-gray-800 text-sm font-medium"
            >
              이메일
            </label>
            <Input
              id="edit-profile-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-sosoeat-gray-300 bg-sosoeat-gray-100 focus-visible:border-sosoeat-gray-700 h-[52px] rounded-xl px-4 text-base focus-visible:ring-0"
            />
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="mt-auto flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-[60px] flex-1 rounded-2xl text-base font-medium"
          >
            취소
          </Button>
          <Button
            type="button"
            onClick={() => onSubmit?.(name, email)}
            className="bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 h-[60px] flex-1 rounded-2xl text-base font-medium text-white"
          >
            수정하기
          </Button>
        </div>
      </div>
    </div>
  );
}

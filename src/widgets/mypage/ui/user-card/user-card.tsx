'use client';

import { useState } from 'react';

import { Calendar, Mail, Pencil } from 'lucide-react';

import { EditProfileModal } from '@/features/profile-edit';
import { useModal } from '@/shared/lib/use-modal';
import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarImage } from '@/shared/ui/avatar';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

import { mypageRepository } from '../../model/mypage.repository';

import { UserCardProps } from './user-card.types';

export function UserCard({ name, joinedAt, email, imageUrl, className }: UserCardProps) {
  const { isOpen, open, close } = useModal();
  const [localName, setLocalName] = useState(name);
  const [localEmail, setLocalEmail] = useState(email);
  const [localImageUrl, setLocalImageUrl] = useState(imageUrl);

  const handleProfileUpdate = async (data: { name: string; email: string; imageUrl?: string }) => {
    const updated = await mypageRepository.patchMe({
      name: data.name,
      email: data.email,
      image: data.imageUrl,
    });
    if (updated) {
      setLocalName(updated.name);
      setLocalEmail(updated.email);
      setLocalImageUrl(updated.image);
    }
  };

  return (
    <div className={cn('relative w-full p-4', className)}>
      <Card
        className={cn(
          'bg-sosoeat-orange-100 ring-0',
          'md:bg-sosoeat-gray-100',
          'h-28.75 w-full md:h-full md:w-full'
        )}
      >
        <CardHeader>
          <div className="flex items-center gap-6 md:hidden">
            <Avatar className="h-[83px] w-[83px] shrink-0 border-2 border-white">
              <AvatarImage src={localImageUrl || '/images/basic-profile.svg'} />
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="flex items-center py-1">
                <CardTitle className={cn('px-2 text-base font-bold')}>{localName}</CardTitle>
                <button
                  type="button"
                  aria-label="프로필 수정"
                  onClick={open}
                  className="cursor-pointer"
                >
                  <Pencil className="text-sosoeat-gray-600 size-3 shrink-0" />
                </button>
              </div>
              {joinedAt && (
                <span className="bg-sosoeat-orange-200 text-sosoeat-gray-600 flex items-center gap-1 rounded-2xl px-4 py-2 text-xs ring-0">
                  <Calendar className={cn('size-3')} /> {joinedAt} 가입
                </span>
              )}
            </div>
          </div>

          <div className="hidden items-center gap-6 md:flex">
            <Avatar className="h-42.25 w-42.25 shrink-0">
              <AvatarImage src={localImageUrl || '/images/basic-profile.svg'} />
            </Avatar>
            <div className="flex flex-col gap-1">
              <CardTitle className="w-full text-[28px] font-bold">{localName}</CardTitle>
              <CardDescription className="text-sosoeat-gray-600 flex flex-col text-sm">
                {joinedAt && (
                  <span className="flex items-center gap-1 py-3">
                    <Calendar className={cn('size-3')} /> {joinedAt} 가입
                  </span>
                )}
                {localEmail && (
                  <span className="flex items-center gap-1">
                    <Mail className={cn('size-3')} /> {localEmail}
                  </span>
                )}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="absolute top-4 right-0 p-5">
        <EditProfileModal
          open={isOpen}
          onOpenChange={(val) => (val ? open() : close())}
          initialEmail={localEmail}
          initialName={localName}
          initialImageUrl={localImageUrl}
          onSubmit={handleProfileUpdate}
        />
      </div>
    </div>
  );
}

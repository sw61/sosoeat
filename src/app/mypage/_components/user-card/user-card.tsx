import { Calendar, MapPin, Pencil } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { UserCardProps } from './user-card.types';

export function UserCard({ name, location, joinedAt, bio, className }: UserCardProps) {
  return (
    <Card
      className={cn(
        'bg-sosoeat-orange-100 gap-2 ring-0',
        'md:bg-sosoeat-gray-100',
        'h-28.75 w-120 md:h-full md:w-full'
      )}
    >
      <CardHeader>
        <div className="flex items-center gap-2 md:hidden">
          <Avatar className="size-20 shrink-0">
            <AvatarImage />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <CardTitle className={cn('text-base font-bold')}>{name}</CardTitle>
              <Pencil className="text-sosoeat-gray-600 size-3 shrink-0" />
            </div>
            {joinedAt && (
              <span className="bg-sosoeat-orange-200 text-sosoeat-gray-600 flex items-center gap-1 rounded-2xl px-4 py-1.5 text-xs ring-0">
                <Calendar className={cn('size-3')} /> {joinedAt} 가입
              </span>
            )}
          </div>
        </div>

        <div className="hidden md:block">
          <CardTitle className="w-full text-base font-bold">{name}</CardTitle>
          <CardDescription>
            <span className="text-sosoeat-gray-600 flex gap-x-3 gap-y-1 text-xs">
              {location && (
                <span className="flex items-center gap-1">
                  <MapPin className={cn('size-3')} /> {location}
                </span>
              )}
              {joinedAt && (
                <span className="bg-sosoeat-gray-100 flex items-center gap-1 rounded-2xl px-1 py-1.5 ring-0">
                  <Calendar className={cn('size-3')} /> {joinedAt} 가입
                </span>
              )}
            </span>
          </CardDescription>
        </div>
      </CardHeader>

      {bio && (
        <CardContent className="hidden md:block">
          <p className="text-sosoeat-gray-700 text-xs">{bio}</p>
        </CardContent>
      )}
    </Card>
  );
}

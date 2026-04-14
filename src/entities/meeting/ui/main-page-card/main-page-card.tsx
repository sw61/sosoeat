'use client';

import Image from 'next/image';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { LazyMotion } from 'framer-motion';
import * as m from 'framer-motion/m';
import { MapPin, Users } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Card, CardAction, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';
import { Progress, type ProgressProps } from '@/shared/ui/progress-bar';

import { useDetailRouter } from '../../model/use-detail-router';
import { DeadlineBadge } from '../deadline-badge';
import { EstablishmentStatusBadge } from '../establishment-status-badge';

import {
  MAIN_PAGE_CARD_BADGES_ROW_CLASS,
  MAIN_PAGE_CARD_CLASS,
  MAIN_PAGE_CARD_CONTENT_CLASS,
  MAIN_PAGE_CARD_FOOTER_CLASS,
  MAIN_PAGE_CARD_HEADER_CLASS,
  MAIN_PAGE_CARD_HOST_IMAGE_CLASS,
  MAIN_PAGE_CARD_HOST_NAME_CLASS,
  MAIN_PAGE_CARD_IMAGE_GRADIENT_CLASS,
  MAIN_PAGE_CARD_IMAGE_WRAPPER_CLASS,
  MAIN_PAGE_CARD_META_LIST_CLASS,
  MAIN_PAGE_CARD_META_ROW_CLASS,
  MAIN_PAGE_CARD_PROGRESS_BAR_CLASS,
  MAIN_PAGE_CARD_PROGRESS_LABEL_ROW_CLASS,
  MAIN_PAGE_CARD_PROGRESS_SECTION_CLASS,
  MAIN_PAGE_CARD_PROGRESS_TEXT_CLASS,
  MAIN_PAGE_CARD_TITLE_CLASS,
  MAIN_PAGE_CARD_VARIANT_BADGE_CLASS,
} from './main-page-card.constants';
import type { MainPageCardProps } from './main-page-card.types';

const loadFeatures = () => import('framer-motion').then((m) => m.domAnimation);
const VARIANT_LABEL = {
  groupBuy: '공동구매',
  groupEat: '함께먹기',
} as const;

const variantImageBadgeStyles = {
  groupBuy: 'bg-sosoeat-blue-600/90 text-white',
  groupEat: 'bg-sosoeat-orange-600/90 text-white',
};

const variantImageBadgeIcon = {
  groupEat: '/icons/main-page-fork.svg',
  groupBuy: '/icons/main-page-buy.svg',
} as const;

const getProgressVariant = (meetingType: string): ProgressProps['variant'] =>
  meetingType === 'groupEat' ? 'groupEat' : 'groupBuy';

export const MainPageCard = ({ meeting, renderFavoriteButton }: MainPageCardProps) => {
  const variant = getProgressVariant(meeting.type);
  const formatted = format(meeting.dateTime, 'M/d(E) HH:mm', { locale: ko });
  const progress =
    (meeting.participantCount / (meeting.capacity <= 0 ? 1 : meeting.capacity)) * 100;

  const hostImage = meeting.host?.image || '/icons/human-basic.svg';

  const { handleCardClick, handleCardKeyDown } = useDetailRouter({ id: meeting.id });

  return (
    <LazyMotion features={loadFeatures}>
      <m.div
        whileHover={{
          y: -2,
        }}
      >
        <Card
          className={cn(MAIN_PAGE_CARD_CLASS)}
          onClick={handleCardClick}
          onKeyDown={handleCardKeyDown}
        >
          <div className={MAIN_PAGE_CARD_IMAGE_WRAPPER_CLASS}>
            <Image
              src={meeting.image}
              fill
              sizes="360px"
              alt="main-page-card-image"
              className="object-cover"
            />
            <div
              className={MAIN_PAGE_CARD_IMAGE_GRADIENT_CLASS}
              style={{
                background:
                  'linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.3) 100%)',
              }}
            />
            <span
              className={cn(MAIN_PAGE_CARD_VARIANT_BADGE_CLASS, variantImageBadgeStyles[variant])}
            >
              <Image
                src={variantImageBadgeIcon[variant]}
                alt=""
                width={11}
                height={11}
                className="shrink-0"
              />

              {VARIANT_LABEL[variant]}
            </span>
          </div>

          <CardHeader className={MAIN_PAGE_CARD_HEADER_CLASS}>
            <h3 data-slot="card-title" className={MAIN_PAGE_CARD_TITLE_CLASS}>
              {meeting.name}
            </h3>
            <CardAction
              className="absolute top-4 right-4 z-10 cursor-default"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              {renderFavoriteButton?.(meeting.id, meeting.isFavorited ?? false)}
            </CardAction>
          </CardHeader>

          <CardContent className={MAIN_PAGE_CARD_CONTENT_CLASS}>
            <div className={MAIN_PAGE_CARD_META_LIST_CLASS}>
              <span className={MAIN_PAGE_CARD_META_ROW_CLASS}>
                <MapPin className="size-4 shrink-0 stroke-[#8E8E8E]" strokeWidth={1} />
                {meeting.region}
              </span>
              <span className={MAIN_PAGE_CARD_META_ROW_CLASS}>
                <Image
                  src="/icons/deadline-calendar.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="size-4 shrink-0"
                />
                {formatted}
              </span>
            </div>
            <div className={MAIN_PAGE_CARD_BADGES_ROW_CLASS}>
              <DeadlineBadge
                registrationEnd={meeting.registrationEnd}
                variant={variant}
                className="mt-0 min-w-0 flex-1"
              />
              <div className="hidden md:block">
                <EstablishmentStatusBadge confirmedAt={meeting.confirmedAt} variant={variant} />
              </div>
            </div>

            <div className={MAIN_PAGE_CARD_PROGRESS_SECTION_CLASS}>
              <div className={MAIN_PAGE_CARD_PROGRESS_LABEL_ROW_CLASS}>
                <Users className="size-3 shrink-0 stroke-[#6B7280]" strokeWidth={1} />
                <span className={MAIN_PAGE_CARD_PROGRESS_TEXT_CLASS}>
                  {meeting.participantCount}/{meeting.capacity}명 참여중
                </span>
              </div>
              <Progress
                value={progress}
                variant={variant}
                className={MAIN_PAGE_CARD_PROGRESS_BAR_CLASS}
              />
            </div>
          </CardContent>

          <CardFooter className={MAIN_PAGE_CARD_FOOTER_CLASS}>
            <Image
              src={hostImage}
              alt={meeting.host.name}
              width={32}
              height={32}
              className={MAIN_PAGE_CARD_HOST_IMAGE_CLASS}
            />
            <span className={MAIN_PAGE_CARD_HOST_NAME_CLASS}>{meeting.host.name}</span>
          </CardFooter>
        </Card>
      </m.div>
    </LazyMotion>
  );
};

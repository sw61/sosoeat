'use client';

import * as React from 'react';

import { XIcon } from 'lucide-react';

import type { RegionSelectModalProps } from '@/app/meetings/_components/region-select-modal/region-select-modal.type';
import { DropdownSub } from '@/components/common/dropdown-sub';
import { Button } from '@/components/ui/button/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

/** 피그마 Region Select — shell 544×724, p 48, section gap 48, radius 40, shadow-xl */
const dialogContentClass =
  'flex h-[min(724px,90vh)] w-full max-w-[min(544px,calc(100%-2rem))] flex-col items-stretch gap-12 ' +
  'overflow-hidden p-12 isolate rounded-[40px] border-0 bg-white ' +
  'shadow-[0_0_50px_rgba(0,0,0,0.08)] ring-0 sm:h-[724px] sm:max-w-[544px]';

const titleClass =
  'm-0 max-w-md font-sans text-2xl leading-8 font-semibold tracking-[-0.02em] text-sosoeat-gray-900';

/** 피그마 Input 행 — h 48, p 12, 배경·본문은 sosoeat gray 토큰 */
const regionSelectDropdownTriggerClass =
  'h-12 max-w-md rounded-xl bg-sosoeat-gray-100 px-3 py-3 text-base font-normal tracking-[-0.02em] text-sosoeat-gray-800';

const scrollAreaClass =
  'flex min-h-0 min-w-0 w-full flex-1 flex-col gap-4 overflow-y-auto pr-1 [scrollbar-color:var(--color-sosoeat-gray-400)_transparent] [scrollbar-width:thin] ' +
  '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent ' +
  '[&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-sosoeat-gray-400';

const footerClass =
  'mt-0 mb-0 w-full flex-row! flex-wrap gap-4! border-0 bg-transparent p-0 shadow-none sm:justify-between!';

const cancelButtonClass =
  'h-[60px] flex-1 rounded-2xl border border-[#DDDDDD] bg-white px-[30px] py-4 text-xl font-semibold ' +
  'tracking-[-0.02em] text-[#737373] shadow-none hover:bg-neutral-50';

const confirmButtonClass =
  'h-[60px] flex-1 rounded-2xl border-0 bg-[#FF6600] px-[30px] py-4 text-xl font-semibold ' +
  'tracking-[-0.02em] text-white shadow-none hover:bg-[#e65c00]';

export function RegionSelectModal({
  trigger,
  title,
  description,
  dropdownSub,
  draftValue: draftValueProp,
  onDraftChange,
  children,
  contentClassName,
}: RegionSelectModalProps) {
  const triggerAsChild = React.isValidElement(trigger);

  const draftControlled = draftValueProp !== undefined && onDraftChange !== undefined;

  const [open, setOpen] = React.useState(false);
  const [internalDraft, setInternalDraft] = React.useState<Record<string, string>>({});

  const draftValue = draftControlled ? draftValueProp : internalDraft;

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      setOpen(next);
      if (!next) return;
      if (dropdownSub != null) {
        const seed = { ...dropdownSub.value };
        if (draftControlled) {
          onDraftChange(seed);
        } else {
          setInternalDraft(seed);
        }
      } else if (draftControlled) {
        onDraftChange({});
      } else {
        setInternalDraft({});
      }
    },
    [dropdownSub, draftControlled, onDraftChange]
  );

  const handleConfirm = React.useCallback(() => {
    if (dropdownSub != null) {
      dropdownSub.onChange(draftValue);
    }
    setOpen(false);
  }, [dropdownSub, draftValue]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild={triggerAsChild}>{trigger}</DialogTrigger>
      <DialogContent showCloseButton={false} className={cn(dialogContentClass, contentClassName)}>
        {/* Frame 2611146: 헤더 영역 gap 24 */}
        <div className="flex w-full max-w-md min-w-0 flex-col gap-6 self-start">
          <div className="flex w-full min-w-0 flex-row items-center justify-between gap-3">
            <DialogTitle className={titleClass}>{title}</DialogTitle>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="text-sosoeat-gray-600 hover:text-sosoeat-gray-600 size-8 shrink-0"
                aria-label="닫기"
              >
                <XIcon className="size-6" strokeWidth={1.8} />
              </Button>
            </DialogClose>
          </div>
          {description != null ? (
            <DialogDescription className="text-sosoeat-gray-800 max-w-md text-base tracking-[-0.02em]">
              {description}
            </DialogDescription>
          ) : null}
        </div>

        {/* Frame 2610642: 본문↔푸터 gap 56 */}
        <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col gap-14">
          <div className={scrollAreaClass}>
            {dropdownSub != null ? (
              <DropdownSub
                {...dropdownSub}
                value={draftValue}
                onChange={draftControlled ? onDraftChange : setInternalDraft}
                triggerClassName={cn(
                  regionSelectDropdownTriggerClass,
                  dropdownSub.triggerClassName
                )}
              />
            ) : null}
            {children}
          </div>
          <DialogFooter className={cn(footerClass, dropdownSub != null && '[&>button]:min-w-0')}>
            {dropdownSub != null ? (
              <>
                <DialogClose asChild>
                  <Button type="button" variant="outline" className={cancelButtonClass}>
                    취소
                  </Button>
                </DialogClose>
                <Button type="button" className={confirmButtonClass} onClick={handleConfirm}>
                  확인
                </Button>
              </>
            ) : (
              <DialogClose asChild>
                <Button type="button" variant="outline" className={cancelButtonClass}>
                  닫기
                </Button>
              </DialogClose>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

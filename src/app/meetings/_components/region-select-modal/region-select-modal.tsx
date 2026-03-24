'use client';

import * as React from 'react';

import { XIcon } from 'lucide-react';

import { DropdownSub, type DropdownSubProp } from '@/components/common/dropdown-sub';
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

import { RegionCascadeSelect } from './region-cascade-select';
import type {
  RegionModalDropdownSub,
  RegionSelection,
  RegionSelectModalProps,
} from './region-select-modal.type';

function selectionToRecord(s: RegionSelection): Record<string, string> {
  if (s == null) return {};
  return { [s.province]: s.district };
}

function recordToSelection(r: Record<string, string>): RegionSelection {
  const keys = Object.keys(r).sort();
  if (keys.length === 0) return null;
  return { province: keys[0], district: r[keys[0]]! };
}

function omitRegionModalValueOnChange(
  sub: RegionModalDropdownSub
): Omit<DropdownSubProp, 'value' | 'onChange'> {
  const { value: _v, onChange: _o, ...rest } = sub;
  return rest;
}

/**
 * 피그마 Region Select modal — shell 544×724, padding 48, gap 48, radius 40,
 * shadow 0 0 50px rgba(0,0,0,0.08), 콘텐츠 폭 448 (= 544 − 48×2)
 */
const dialogContentClass =
  'flex h-[min(724px,90vh)] w-full max-w-[min(544px,calc(100%-2rem))] flex-col items-start gap-12 ' +
  'overflow-hidden bg-[#FFFFFF] p-12 isolate rounded-[40px] border-0 ' +
  'shadow-[0_0_50px_rgba(0,0,0,0.08)] ring-0 sm:h-[724px] sm:max-w-[544px]';

/** pretendard/text-2xl/semibold — gray/900 #111827 */
const titleClass =
  'm-0 w-full max-w-md font-sans text-2xl leading-8 font-semibold tracking-[-0.02em] text-[#111827]';

/** 피그마 Input — h 48, p 12, gray/50 #F9FAFB, radius 12 */
const regionSelectDropdownTriggerClass =
  'h-12 max-w-md rounded-xl bg-[#F9FAFB] px-3 py-3 text-base font-normal tracking-[-0.02em] text-[#333333]';

/** 스크롤 영역 — 스크롤바 ≈ w-1.5, thumb slate/300 느낌 */
const scrollAreaClass =
  'flex min-h-0 min-w-0 w-full max-w-md flex-1 flex-col gap-4 overflow-y-auto pr-1 [scrollbar-color:#CCCCCC_transparent] [scrollbar-width:thin] ' +
  '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent ' +
  '[&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-[#CCCCCC]';

/** 푸터 행 — gap 16, 버튼 각 216@448 콘텐츠 폭 */
const footerClass =
  'mt-0 mb-0 w-full max-w-md flex-row! flex-wrap gap-4! border-0 bg-transparent p-0 shadow-none sm:justify-between!';

/** slate/200 border #DDDDDD, padding 16×30, text slate/600 */
const cancelButtonClass =
  'h-[60px] min-w-0 flex-1 rounded-2xl border border-[#DDDDDD] bg-white px-[30px] py-4 text-xl font-semibold ' +
  'tracking-[-0.02em] text-[#737373] shadow-none hover:bg-neutral-50';

const confirmButtonClass =
  'h-[60px] min-w-0 flex-1 rounded-2xl border-0 bg-[#FF6600] px-[30px] py-4 text-xl font-semibold ' +
  'tracking-[-0.02em] text-white shadow-none hover:bg-[#e65c00]';

export const RegionSelectModal = ({
  trigger,
  title,
  description,
  dropdownSub,
  regionCascade,
  draftValue: draftValueProp,
  onDraftChange,
  children,
  contentClassName,
}: RegionSelectModalProps) => {
  const triggerAsChild = React.isValidElement(trigger);

  const draftControlled = draftValueProp !== undefined && onDraftChange !== undefined;

  const [open, setOpen] = React.useState(false);
  const [internalDraft, setInternalDraft] = React.useState<RegionSelection>(null);

  const draftValue = draftControlled ? draftValueProp : internalDraft;

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      setOpen(next);
      if (!next) return;
      if (dropdownSub != null) {
        const v = dropdownSub.value;
        const seed = v == null ? null : { province: v.province, district: v.district };
        if (draftControlled) {
          onDraftChange(seed);
        } else {
          setInternalDraft(seed);
        }
      } else if (draftControlled) {
        onDraftChange(null);
      } else {
        setInternalDraft(null);
      }
    },
    [dropdownSub, draftControlled, onDraftChange]
  );

  const showCascade = regionCascade != null && dropdownSub != null;

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
        {/* Frame 2611146: 헤더 gap 24 (title↔description) */}
        <div className="flex w-full max-w-md min-w-0 flex-col gap-6 self-start">
          <div className="flex min-h-8 w-full min-w-0 flex-row items-center justify-between gap-3">
            <DialogTitle className={titleClass}>{title}</DialogTitle>
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
          </div>
          {description != null ? (
            <DialogDescription className="max-w-md text-base leading-6 font-normal tracking-[-0.02em] text-[#333333]">
              {description}
            </DialogDescription>
          ) : null}
        </div>

        {/* Frame 2610642: 본문 영역 ↔ 푸터 gap 56 */}
        <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col gap-14">
          <div className={scrollAreaClass}>
            {showCascade && regionCascade != null ? (
              <RegionCascadeSelect
                regions={regionCascade.regions}
                value={draftValue}
                onChange={draftControlled ? onDraftChange : setInternalDraft}
              />
            ) : null}
            {!showCascade && dropdownSub != null ? (
              <DropdownSub
                {...omitRegionModalValueOnChange(dropdownSub)}
                value={selectionToRecord(draftValue)}
                onChange={(rec) => {
                  const next = recordToSelection(rec);
                  if (draftControlled) {
                    onDraftChange(next);
                  } else {
                    setInternalDraft(next);
                  }
                }}
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
};

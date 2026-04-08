'use client';

import { cn } from '../../lib/utils';
import { Button } from '../button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '../dialog';

import { ALERT_MODAL_BTN_BASE_CLASS, ALERT_MODAL_CONTENT_CLASS } from './alert-modal.constants';
import type { AlertModalProps } from './alert-modal.types';

/**
 * 특정 상황을 사용자에게 알리고 취소/확인(또는 다른 이름의 액션)을 받을 때
 * 범용적으로 사용할 수 있는 모달 팝업.
 *
 * @example
 * <AlertModal
 *   open={isModalOpen}
 *   title="삭제하시겠습니까?"
 *   description="삭제 후에는 복구할 수 없습니다."
 *   cancelText="닫기"
 *   confirmText="삭제하기"
 *   onCancel={() => setIsModalOpen(false)}
 *   onConfirm={() => handleDelete()}
 * />
 */
export const AlertModal = ({
  open,
  title,
  description,
  cancelText = '취소',
  confirmText = '확인',
  onCancel,
  onConfirm,
  dismissible = true,
}: AlertModalProps) => {
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen && dismissible) {
      onCancel();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton aria-modal="true" className={ALERT_MODAL_CONTENT_CLASS}>
        <DialogTitle className="text-center text-lg font-semibold md:text-2xl">{title}</DialogTitle>

        <DialogDescription
          className={cn(
            'text-sosoeat-gray-700 mt-0.5 text-center text-sm break-keep whitespace-pre-wrap md:mt-2 md:text-lg',
            !description && 'sr-only'
          )}
        >
          {description ?? title}
        </DialogDescription>

        <DialogFooter className="mt-8 flex-row gap-3 border-none bg-transparent p-0 md:mt-14 md:gap-4">
          <Button
            variant="outline"
            onClick={() => onCancel()}
            id="alert-modal-cancel-btn"
            className={cn(
              ALERT_MODAL_BTN_BASE_CLASS,
              'border-sosoeat-gray-500 text-sosoeat-gray-700'
            )}
          >
            {cancelText}
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              onCancel();
            }}
            id="alert-modal-confirm-btn"
            className={cn(
              ALERT_MODAL_BTN_BASE_CLASS,
              'bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 text-white'
            )}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

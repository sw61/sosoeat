import { useCallback, useState } from 'react';

interface UseModalReturn {
  /** 현재 모달 열림 상태 */
  isOpen: boolean;
  /** 모달을 여는 함수 */
  open: () => void;
  /** 모달을 닫는 함수 */
  close: () => void;
}

/**
 * 모달/다이얼로그의 열기·닫기 상태를 관리하는 범용 훅.
 *
 * @example
 * // AlertModal
 * const { isOpen, open, close } = useModal();
 *
 * <button onClick={open}>삭제</button>
 * <AlertModal
 *   open={isOpen}
 *   title="삭제하시겠습니까?"
 *   onCancel={close}
 *   onConfirm={handleDelete}
 * />
 *
 * @example
 * // 다른 모달에도 동일하게 사용 가능
 * const { isOpen, open, close } = useModal();
 */
export const useModal = (): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close };
};

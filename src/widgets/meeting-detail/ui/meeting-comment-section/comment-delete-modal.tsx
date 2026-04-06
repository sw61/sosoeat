// comment-delete-modal.tsx
import { AlertModal } from '@/components/common/alert-modal/alert-modal';

interface CommentDeleteModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function CommentDeleteModal({ open, onCancel, onConfirm }: CommentDeleteModalProps) {
  return (
    <AlertModal
      open={open}
      title="댓글을 삭제하시겠습니까?"
      description="삭제된 댓글은 복구할 수 없습니다."
      confirmText="삭제하기"
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
}

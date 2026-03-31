'use client';

import { type ReactNode, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

import {
  useCreateSosoTalkComment,
  useCreateSosoTalkPostLike,
  useDeleteSosoTalkComment,
  useDeleteSosoTalkPost,
  useDeleteSosoTalkPostLike,
  useGetSosoTalkPostDetail,
  useUpdateSosoTalkComment,
} from '@/app/sosotalk/_services';
import type { CommentItemData } from '@/components/common/comment-item';
import { Footer } from '@/components/common/footer';
import { useAuthStore } from '@/store/auth-store';
import type { Comment } from '@/types/generated-client/models/Comment';

import { SosoTalkPostDetail } from './sosotalk-post-detail';

interface SosoTalkPostDetailPageProps {
  postId: string;
}

const SOSOTALK_AUTHOR_IMAGE_FALLBACK =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop';

export function SosoTalkPostDetailPage({ postId }: SosoTalkPostDetailPageProps) {
  const router = useRouter();
  const [commentInput, setCommentInput] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentInput, setEditingCommentInput] = useState('');
  const [optimisticIsLiked, setOptimisticIsLiked] = useState<boolean | null>(null);
  const commentSectionRef = useRef<HTMLDivElement>(null);
  const currentUser = useAuthStore((state) => state.user);
  const numericPostId = Number(postId);
  const isValidPostId = Number.isInteger(numericPostId) && numericPostId > 0;
  const createCommentMutation = useCreateSosoTalkComment();
  const updateCommentMutation = useUpdateSosoTalkComment();
  const deleteCommentMutation = useDeleteSosoTalkComment();
  const createLikeMutation = useCreateSosoTalkPostLike();
  const deletePostMutation = useDeleteSosoTalkPost();
  const deleteLikeMutation = useDeleteSosoTalkPostLike();
  const { data, isLoading, isError } = useGetSosoTalkPostDetail(
    isValidPostId ? numericPostId : undefined
  );

  const commentCount = data?.count?.comments ?? data?.comments?.length ?? 0;
  const comments = data?.comments ?? [];
  const isLiked = optimisticIsLiked ?? data?.isLiked ?? false;
  const displayedLikeCount = (data?.likeCount ?? 0) + (isLiked ? 1 : 0) - (data?.isLiked ? 1 : 0);
  const isEditingCommentMissing =
    editingCommentId != null && !comments.some((comment) => comment.id === editingCommentId);

  const handleCommentClick = () => {
    commentSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handleLikeClick = async () => {
    if (!isValidPostId || createLikeMutation.isPending || deleteLikeMutation.isPending || !data) {
      return;
    }

    const nextIsLiked = !isLiked;
    setOptimisticIsLiked(nextIsLiked);

    try {
      if (nextIsLiked) {
        await createLikeMutation.mutateAsync(numericPostId);
      } else {
        await deleteLikeMutation.mutateAsync(numericPostId);
      }
    } catch {
      setOptimisticIsLiked(data.isLiked);
    }
  };

  const handleSubmitComment = async () => {
    const trimmedComment = commentInput.trim();

    if (!isValidPostId || !trimmedComment || createCommentMutation.isPending) {
      return;
    }

    try {
      await createCommentMutation.mutateAsync({
        postId: numericPostId,
        payload: {
          content: trimmedComment,
        },
      });
      setCommentInput('');
    } catch {
      // 댓글 입력값을 유지해서 다시 시도할 수 있도록 둡니다.
    }
  };

  const handleStartEditComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentInput(comment.content);
  };

  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setEditingCommentInput('');
  };

  const handleSubmitEditComment = async () => {
    const trimmedComment = editingCommentInput.trim();

    if (
      !isValidPostId ||
      editingCommentId == null ||
      !trimmedComment ||
      updateCommentMutation.isPending ||
      isEditingCommentMissing
    ) {
      return;
    }

    try {
      await updateCommentMutation.mutateAsync({
        postId: numericPostId,
        commentId: editingCommentId,
        payload: {
          content: trimmedComment,
        },
      });
      handleCancelEditComment();
    } catch {
      // 수정 실패 시 입력값을 유지해서 다시 시도할 수 있도록 둡니다.
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!isValidPostId || deleteCommentMutation.isPending || typeof window === 'undefined') {
      return;
    }

    const shouldDelete = window.confirm('댓글을 삭제할까요?');
    if (!shouldDelete) {
      return;
    }

    try {
      await deleteCommentMutation.mutateAsync({
        postId: numericPostId,
        commentId,
      });

      if (editingCommentId === commentId) {
        handleCancelEditComment();
      }
    } catch {
      // 삭제 실패 시 현재 화면을 유지합니다.
    }
  };

  const handleShareClick = async () => {
    if (!data || typeof window === 'undefined') {
      return;
    }

    try {
      const shareData = {
        title: data.title,
        text: `${data.author.name}님의 소소톡 게시글`,
        url: window.location.href,
      };

      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
    }
  };

  const handleDeleteClick = async () => {
    if (!isValidPostId || deletePostMutation.isPending || typeof window === 'undefined') {
      return;
    }

    const shouldDelete = window.confirm('게시글을 삭제할까요?');
    if (!shouldDelete) {
      return;
    }

    try {
      await deletePostMutation.mutateAsync({ postId: numericPostId });
      router.push('/sosotalk');
    } catch {
      // 삭제 실패 시 현재 화면을 유지합니다.
    }
  };

  const handleEditClick = () => {
    if (!isValidPostId) {
      return;
    }

    router.push(`/sosotalk/write?postId=${numericPostId}`);
  };

  if (!isValidPostId) {
    return (
      <SosoTalkPostDetailPageLayout>
        <StatusMessage message="올바르지 않은 게시글입니다." />
      </SosoTalkPostDetailPageLayout>
    );
  }

  if (isLoading) {
    return (
      <SosoTalkPostDetailPageLayout>
        <StatusMessage message="게시글을 불러오는 중이에요." />
      </SosoTalkPostDetailPageLayout>
    );
  }

  if (isError || !data) {
    return (
      <SosoTalkPostDetailPageLayout>
        <StatusMessage message="게시글을 불러오지 못했어요. 잠시 후 다시 시도해 주세요." />
      </SosoTalkPostDetailPageLayout>
    );
  }

  return (
    <SosoTalkPostDetailPageLayout>
      <div className="flex flex-col gap-5 md:gap-6">
        <SosoTalkPostDetail
          title={data.title}
          contentHtml={data.content}
          imageUrl={data.image || undefined}
          authorName={data.author.name}
          authorImageUrl={data.author.image || SOSOTALK_AUTHOR_IMAGE_FALLBACK}
          likeCount={displayedLikeCount}
          commentCount={commentCount}
          createdAt={formatSosoTalkRelativeTime(data.createdAt)}
          createdAtDateTime={data.createdAt.toISOString()}
          createdDateLabel={format(data.createdAt, 'MM월 dd일', { locale: ko })}
          viewCount={data.viewCount}
          isAuthor={currentUser?.id === data.author.id}
          isLiked={isLiked}
          onEditClick={handleEditClick}
          onDeleteClick={() => void handleDeleteClick()}
          onLikeClick={() => void handleLikeClick()}
          onCommentClick={handleCommentClick}
          onShareClick={handleShareClick}
          comments={comments.map((comment) =>
            mapCommentToCommentItemData(comment, {
              currentUserId: currentUser?.id,
              editingCommentId,
              editingCommentInput,
              isEditPending: updateCommentMutation.isPending,
              onEditClick: () => handleStartEditComment(comment),
              onDeleteClick: () => void handleDeleteComment(comment.id),
              onEditValueChange: setEditingCommentInput,
              onEditSubmit: () => void handleSubmitEditComment(),
              onEditCancel: handleCancelEditComment,
            })
          )}
          inputValue={commentInput}
          inputPlaceholder="댓글을 입력해 주세요."
          onChangeInput={setCommentInput}
          onSubmitComment={() => void handleSubmitComment()}
          currentUserName={currentUser?.name}
          currentUserImageUrl={currentUser?.image ?? undefined}
        />

        <div ref={commentSectionRef} className="h-0" aria-hidden />
      </div>
    </SosoTalkPostDetailPageLayout>
  );
}

function SosoTalkPostDetailPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-sosoeat-gray-100 flex min-h-screen flex-col">
      <main className="flex-1 px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="mx-auto w-full max-w-[860px] xl:max-w-[960px]">{children}</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function StatusMessage({ message }: { message: string }) {
  return (
    <div className="flex min-h-[320px] items-center justify-center rounded-[32px] border border-white/60 bg-white px-6 text-center shadow-[0_2px_14px_rgba(30,30,30,0.04)]">
      <p className="text-sosoeat-gray-500 text-sm md:text-base">{message}</p>
    </div>
  );
}

interface MapCommentToCommentItemDataOptions {
  currentUserId?: number;
  editingCommentId: number | null;
  editingCommentInput: string;
  isEditPending: boolean;
  onEditClick: () => void;
  onDeleteClick: () => void;
  onEditValueChange: (value: string) => void;
  onEditSubmit: () => void;
  onEditCancel: () => void;
}

function mapCommentToCommentItemData(
  comment: Comment,
  {
    currentUserId,
    editingCommentId,
    editingCommentInput,
    isEditPending,
    onEditClick,
    onDeleteClick,
    onEditValueChange,
    onEditSubmit,
    onEditCancel,
  }: MapCommentToCommentItemDataOptions
): CommentItemData {
  return {
    id: String(comment.id),
    authorName: comment.author.name,
    authorImageUrl: comment.author.image || SOSOTALK_AUTHOR_IMAGE_FALLBACK,
    createdAt: format(comment.createdAt, 'M월 d일 HH:mm', { locale: ko }),
    relativeTime: formatSosoTalkRelativeTime(comment.createdAt),
    content: comment.content,
    isAuthorComment: currentUserId === comment.author.id,
    isEditing: editingCommentId === comment.id,
    editValue: editingCommentId === comment.id ? editingCommentInput : comment.content,
    isEditPending,
    onEditClick,
    onDeleteClick,
    onEditValueChange,
    onEditSubmit,
    onEditCancel,
  };
}

function formatSosoTalkRelativeTime(createdAt: Date, now: Date = new Date()): string {
  const diffMs = now.getTime() - createdAt.getTime();

  if (diffMs < 60_000) {
    return '방금 전';
  }

  const diffMinutes = Math.floor(diffMs / 60_000);
  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }

  const diffHours = Math.floor(diffMs / 3_600_000);
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }

  const diffDays = Math.floor(diffMs / 86_400_000);
  return `${diffDays}일 전`;
}

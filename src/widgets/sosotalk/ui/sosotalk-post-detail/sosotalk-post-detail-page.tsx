'use client';

import { type ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

import { AlertModal } from '@/shared/ui/alert-modal/alert-modal';

import { SosoTalkPostDetail } from './sosotalk-post-detail/sosotalk-post-detail';
import {
  formatSosoTalkRelativeTime,
  mapCommentToCommentItemData,
  SOSOTALK_AUTHOR_IMAGE_FALLBACK,
  useSosoTalkPostDetailPage,
} from './model';

interface SosoTalkPostDetailPageProps {
  postId: string;
}

export function SosoTalkPostDetailPage({ postId }: SosoTalkPostDetailPageProps) {
  const router = useRouter();
  const {
    commentSectionRef,
    currentUser,
    data,
    comments,
    commentCount,
    commentInput,
    editingCommentId,
    editingCommentInput,
    isEditPending,
    isDeleteModalOpen,
    displayedLikeCount,
    isError,
    isLikePending,
    isLiked,
    isLoading,
    isValidPostId,
    setCommentInput,
    setEditingCommentInput,
    handleCancelEditComment,
    handleCancelDelete,
    handleCancelDeleteComment,
    handleCommentClick,
    handleConfirmDelete,
    handleConfirmDeleteComment,
    handleDeleteClick,
    handleDeleteComment,
    handleEditClick,
    handleLikeClick,
    handleShareClick,
    handleStartEditComment,
    handleSubmitComment,
    handleSubmitEditComment,
    pendingDeleteCommentId,
  } = useSosoTalkPostDetailPage(postId);

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
      <div className="flex w-full flex-col gap-5 md:gap-6">
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
          isLikePending={isLikePending}
          onBackClick={() => router.push('/sosotalk')}
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
              isEditPending,
              onEditClick: () => handleStartEditComment(comment),
              onDeleteClick: () => void handleDeleteComment(comment.id),
              onEditValueChange: setEditingCommentInput,
              onEditSubmit: () => void handleSubmitEditComment(),
              onEditCancel: handleCancelEditComment,
            })
          )}
          inputValue={commentInput}
          inputPlaceholder="댓글을 입력해 주세요"
          onChangeInput={setCommentInput}
          onSubmitComment={() => void handleSubmitComment()}
          currentUserName={currentUser?.name}
          currentUserImageUrl={currentUser?.image ?? undefined}
        />

        <div ref={commentSectionRef} className="h-0" aria-hidden />
      </div>

      <AlertModal
        open={isDeleteModalOpen}
        title="게시글을 삭제할까요?"
        description="삭제 후에는 게시글을 다시 복구할 수 없어요."
        cancelText="취소"
        confirmText="삭제하기"
        onCancel={handleCancelDelete}
        onConfirm={() => void handleConfirmDelete()}
      />

      <AlertModal
        open={pendingDeleteCommentId != null}
        title="댓글을 삭제할까요?"
        description="삭제 후에는 댓글을 다시 복구할 수 없어요."
        cancelText="취소"
        confirmText="삭제하기"
        onCancel={handleCancelDeleteComment}
        onConfirm={() => void handleConfirmDeleteComment()}
      />
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

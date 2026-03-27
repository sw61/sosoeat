'use client';

import { useRef, useState } from 'react';

import type { CommentItemData } from '@/components/common/comment-item';
import { Footer } from '@/components/common/footer';
import { NavigationBar } from '@/components/common/navigation-bar';

import { SosoTalkPostDetail } from './sosotalk-post-detail';

const mockComments: CommentItemData[] = [
  {
    id: '1',
    authorName: '마민준',
    authorImageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=120&auto=format&fit=crop',
    createdAt: '03월 18일 18:42',
    relativeTime: '12분 전',
    content: '혹시 1명 더 신청 가능할까요? 퇴근하고 바로 가면 시간 맞을 것 같아요.',
  },
  {
    id: '2',
    authorName: '김민수',
    authorImageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
    createdAt: '03월 18일 18:50',
    relativeTime: '방금 전',
    content: '가능해요. 오시기 전에 댓글 한 번만 더 남겨주시면 자리 잡아둘게요.',
    isAuthorComment: true,
  },
  {
    id: '3',
    authorName: '박지연',
    authorImageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    createdAt: '03월 18일 18:54',
    relativeTime: '방금 전',
    content: '저도 관심 있습니다. 인원 마감되면 알려주세요.',
  },
];

const mockPost = {
  title: '마포 고기집 같이 가실 분?',
  contentHtml:
    '<p>저녁 7시에 마포 고기집에서 <strong>삼겹살</strong> 먹을 분 구합니다. 1인당 2만원 예상됩니다.</p><p><br></p><p><em>편하게 식사하고 이야기 나누실 분</em>이면 좋겠어요. 시간 맞는 분은 댓글로 남겨주세요.</p>',
  imageUrl:
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200',
  authorName: '김민수',
  authorImageUrl:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
  likeCount: 24,
  commentCount: 6,
  createdAt: '6시간 전',
  createdAtDateTime: '2026-03-18',
  contentCharacterCount: 75,
  isAuthor: true,
};

export function SosoTalkPostDetailPage() {
  const [commentInput, setCommentInput] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const commentSectionRef = useRef<HTMLDivElement>(null);

  const handleCommentClick = () => {
    commentSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handleShareClick = async () => {
    try {
      if (typeof window === 'undefined') {
        return;
      }

      const shareData = {
        title: mockPost.title,
        text: `${mockPost.authorName}님의 소소톡 게시글`,
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

  return (
    <div className="bg-sosoeat-gray-100 flex min-h-screen flex-col">
      <NavigationBar />

      <main className="flex-1 px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="mx-auto w-full max-w-[860px] xl:max-w-[960px]">
            <div className="flex flex-col gap-5 md:gap-6">
              <SosoTalkPostDetail
                {...mockPost}
                isLiked={isLiked}
                likeCount={mockPost.likeCount + (isLiked ? 1 : 0)}
                onLikeClick={() => setIsLiked((prev) => !prev)}
                onCommentClick={handleCommentClick}
                onShareClick={handleShareClick}
                comments={mockComments}
                inputValue={commentInput}
                inputPlaceholder="댓글을 입력하세요."
                onChangeInput={setCommentInput}
                onSubmitComment={() => setCommentInput('')}
                currentUserName="마민준"
                currentUserImageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=120&auto=format&fit=crop"
              />

              <div ref={commentSectionRef} className="h-0" aria-hidden />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

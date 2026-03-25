import { SosoTalkPostDetail } from './_components/sosotalk-post-detail';

const mockPost = {
  categoryLabel: '함께 먹기',
  statusLabel: '모집중',
  title: '마포 고기집 같이 가실 분!',
  content:
    '저녁 7시에 마포 고기집에서 삼겹살 먹을 분 구합니다. 1인당 2만원 예상됩니다.\n\n편하게 식사하고 이야기 나누실 분이면 좋겠어요. 시간 맞는 분은 댓글로 남겨주세요.',
  imageUrl:
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200',
  authorName: '김민수',
  authorImageUrl:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
  likeCount: 24,
  commentCount: 6,
  createdAt: '6일 전',
  createdAtDateTime: '2026-03-18',
  contentCharacterCount: 75,
};

export default function SosoTalkPostDetailPage() {
  return (
    <main className="bg-sosoeat-gray-100 min-h-screen px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-[1280px] md:max-w-[685px] lg:max-w-[1280px]">
        <SosoTalkPostDetail {...mockPost} />
      </div>
    </main>
  );
}

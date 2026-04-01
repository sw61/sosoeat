import type { Meeting } from '@/types/meeting';

import type { MeetingComment } from './_components/meeting-comment-section';
import { MeetingCommentSection } from './_components/meeting-comment-section';
import { MeetingHeroSection } from './_components/meeting-hero-section';
import { MeetingLocationSection } from './_components/meeting-location-section';
import { MeetingRecommendedSection } from './_components/meeting-recommended-section';

// ─── Mock Data ───────────────────────────────────────────────

const mockMeeting: Meeting = {
  id: 1,
  name: '하루 10분 글쓰기 습관',
  type: 'groupEat',
  region: '강남구',
  address: '서울특별시 중구 청계전로 100 시그니처타워 동관',
  latitude: 37.5697,
  longitude: 126.9822,
  dateTime: '2026-04-10T09:30:00.000Z',
  registrationEnd: '2026-04-09T23:59:59.000Z',
  participantCount: 3,
  capacity: 6,
  image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
  description:
    '작은 독서 습관을 만들기위해서 같이 열심히 하실 분을 구합니다~\n궁금한 점 있으시면 https://open.kakao.com/o/abcdefg12345 참여에서 질문주세요~',
  hostId: 1,
  createdBy: '1',
  updatedAt: '',
  host: { id: 1, name: '김민준' },
  isFavorited: false,
};

const mockComments: MeetingComment[] = [
  {
    id: 1,
    parentId: null,
    author: { nickname: '마민준', profileUrl: null },
    content: '안녕하세요! 혼자 참여하는데 괜찮을까요? 음식 알레르기는 없고 적극적으로 참여할게요!!',
    isDeleted: false,
    createdAt: '03월 12일',
    likeCount: 3,
    isLiked: false,
    isHostComment: false,
    isMine: false,
  },
  {
    id: 2,
    parentId: 1,
    author: { nickname: '마민준', profileUrl: null },
    content: '안녕하세요! 혼자 참여하는데 괜찮을까요? 음식 알레르기는 없고 적극적으로 참여할게요!!',
    isDeleted: false,
    createdAt: '03월 12일',
    likeCount: 3,
    isLiked: false,
    isHostComment: false,
    isMine: false,
  },
  {
    id: 3,
    parentId: 1,
    author: { nickname: '마민준', profileUrl: null },
    content: '안녕하세요! 혼자 참여하는데 괜찮을까요? 음식 알레르기는 없고 적극적으로 참여할게요!!',
    isDeleted: false,
    createdAt: '03월 12일',
    likeCount: 3,
    isLiked: false,
    isHostComment: false,
    isMine: false,
  },
  {
    id: 4,
    parentId: null,
    author: { nickname: '마민준', profileUrl: null },
    content: '안녕하세요! 혼자 참여하는데 괜찮을까요? 음식 알레르기는 없고 적극적으로 참여할게요!!',
    isDeleted: false,
    createdAt: '03월 12일',
    likeCount: 3,
    isLiked: false,
    isHostComment: false,
    isMine: false,
  },
];

const mockRecommendedMeetings: Meeting[] = [
  {
    id: 1,
    name: '하루 10분 글쓰기 습관',
    type: 'groupEat',
    region: '강남구',
    address: '',
    latitude: 0,
    longitude: 0,
    dateTime: '2025-01-07T17:30:00.000Z',
    registrationEnd: '2025-01-06T23:59:59.000Z',
    participantCount: 0,
    capacity: 6,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300',
    description: '',
    hostId: 1,
    createdBy: '1',
    updatedAt: '',
    host: { id: 1, name: '김소소' },
    isFavorited: false,
  },
  {
    id: 2,
    name: '카페 투어 멤버 모집',
    type: 'groupEat',
    region: '강남구 · 하이/아이',
    address: '',
    latitude: 0,
    longitude: 0,
    dateTime: '2025-01-07T17:30:00.000Z',
    registrationEnd: '2025-01-06T23:59:59.000Z',
    participantCount: 0,
    capacity: 6,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300',
    description: '',
    hostId: 1,
    createdBy: '1',
    updatedAt: '',
    host: { id: 1, name: '김소소' },
    isFavorited: false,
  },
  {
    id: 3,
    name: '퇴근 후 책으로 여행하기',
    type: 'groupEat',
    region: '강남구 · 하이/아이',
    address: '',
    latitude: 0,
    longitude: 0,
    dateTime: '2025-01-07T17:30:00.000Z',
    registrationEnd: '2025-01-06T23:59:59.000Z',
    participantCount: 0,
    capacity: 6,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300',
    description: '',
    hostId: 1,
    createdBy: '1',
    updatedAt: '',
    host: { id: 1, name: '김소소' },
    isFavorited: false,
  },
  {
    id: 4,
    name: '영화로 만나는 짧은 대화',
    type: 'groupEat',
    region: '강남구 · 하이/아이',
    address: '',
    latitude: 0,
    longitude: 0,
    dateTime: '2025-01-07T17:30:00.000Z',
    registrationEnd: '2025-01-06T23:59:59.000Z',
    participantCount: 0,
    capacity: 6,
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300',
    description: '',
    hostId: 1,
    createdBy: '1',
    updatedAt: '',
    host: { id: 1, name: '김소소' },
    isFavorited: false,
  },
];

// ─── Page ────────────────────────────────────────────────────

export default function MeetingDetailPage() {
  return (
    <main className="space-y-[30px] py-10">
      <MeetingHeroSection meeting={mockMeeting} />

      <section>
        <h2 className="text-sosoeat-gray-900 mb-3 text-2xl font-semibold">모임 설명</h2>
        <div className="border-sosoeat-gray-200 mt-5 rounded-[16px] border bg-white px-12 py-10">
          <p className="text-sosoeat-gray-800 text-lg font-normal whitespace-pre-line">
            {mockMeeting.description}
          </p>
        </div>
      </section>

      <MeetingLocationSection address={mockMeeting.address} />
      <MeetingCommentSection comments={mockComments} />
      <MeetingRecommendedSection meetings={mockRecommendedMeetings} />
    </main>
  );
}

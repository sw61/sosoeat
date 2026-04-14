import Image from 'next/image';
import Link from 'next/link';

import { mapPostToSosoTalkCardItem, type SosoTalkPostCardItem } from '@/entities/post';
import { getSosoTalkPosts } from '@/entities/post/index.server';

import { BestSosotalkCarousel } from './best-sosotalk-carousel';

export async function BestSosotalkSection() {
  let posts: SosoTalkPostCardItem[];

  try {
    const { data } = await getSosoTalkPosts({
      size: 6,
      sortBy: 'viewCount',
      sortOrder: 'desc',
    });
    posts = data.map(mapPostToSosoTalkCardItem);
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to load best sosotalk posts.', error);
    }
    posts = [];
  }

  if (posts.length === 0) return null;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between px-4">
        <h2 className="flex items-center gap-3 text-lg font-bold md:text-xl lg:text-2xl">
          <Image src="icons/main-page-twinkle.svg" alt="twinkle" width={18} height={18} />
          지금 뜨는 베스트 소소토크 🔥
        </h2>
        <Link href="/sosotalk" className="text-sm font-medium text-gray-500 hover:text-gray-800">
          소소토크 보러가기 →
        </Link>
      </div>
      <BestSosotalkCarousel posts={posts} />
    </section>
  );
}

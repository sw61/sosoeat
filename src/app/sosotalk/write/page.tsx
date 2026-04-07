import { SosoTalkWritePageClient } from '@/features/sosotalk-write';

interface SosoTalkWritePageProps {
  searchParams?: Promise<{
    postId?: string;
  }>;
}

export default async function SosoTalkWritePage({ searchParams }: SosoTalkWritePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const editPostIdParam = resolvedSearchParams?.postId;
  const parsedEditPostId =
    editPostIdParam && /^\d+$/.test(editPostIdParam) ? Number(editPostIdParam) : undefined;
  const editPostId =
    parsedEditPostId != null && Number.isInteger(parsedEditPostId) && parsedEditPostId > 0
      ? parsedEditPostId
      : undefined;

  return (
    <main className="min-h-screen bg-[#f9f9f9] px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="mx-auto w-full max-w-[860px]">
          <SosoTalkWritePageClient editPostId={editPostId} />
        </div>
      </div>
    </main>
  );
}

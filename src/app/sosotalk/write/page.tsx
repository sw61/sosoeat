import { SosoTalkWritePageClient } from '@/features/sosotalk-write';

interface SosoTalkWritePageProps {
  searchParams?: Promise<{
    postId?: string;
  }>;
}

export default async function SosoTalkWritePage({ searchParams }: SosoTalkWritePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const editPostIdParam = resolvedSearchParams?.postId;
  const hasEditPostIdParam = editPostIdParam != null;
  const parsedEditPostId =
    editPostIdParam && /^\d+$/.test(editPostIdParam) ? Number(editPostIdParam) : undefined;
  const editPostId =
    parsedEditPostId != null && parsedEditPostId > 0 ? parsedEditPostId : undefined;
  const isInvalidEditPostId = hasEditPostIdParam && editPostId == null;

  return (
    <main className="min-h-screen bg-[#f9f9f9] px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="mx-auto w-full max-w-[860px]">
          <SosoTalkWritePageClient
            editPostId={editPostId}
            isInvalidEditPostId={isInvalidEditPostId}
          />
        </div>
      </div>
    </main>
  );
}

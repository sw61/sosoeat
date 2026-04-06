import { SosoTalkPostDetailPage } from '@/widgets/sosotalk/ui/sosotalk-post-detail/sosotalk-post-detail-page';

interface PageProps {
  params: Promise<{
    postId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { postId } = await params;

  return <SosoTalkPostDetailPage postId={postId} />;
}

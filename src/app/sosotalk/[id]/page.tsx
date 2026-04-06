import { SosoTalkPostDetailPage } from '@/widgets/sosotalk/ui/sosotalk-post-detail/sosotalk-post-detail-page';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <SosoTalkPostDetailPage postId={id} />;
}

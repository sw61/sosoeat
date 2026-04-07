import { SosoTalkPostDetailPage } from '@/widgets/sosotalk';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <SosoTalkPostDetailPage postId={id} />;
}

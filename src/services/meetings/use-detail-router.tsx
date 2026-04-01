import { useRouter } from 'next/navigation';

export const useDetailRouter = ({ id }: { id: number }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/meetings/${id}`);
  };
  const handleCardKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
    }
  };

  return {
    handleCardClick,
    handleCardKeyDown,
  };
};

'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import { useAuthStore } from '@/entities/auth';
import { meetingsQueryOptions } from '@/entities/meeting';
import { toMeetingEditFormData } from '@/features/meeting-edit';
import { useModal } from '@/shared/lib/use-modal';

import {
  useConfirmMeeting,
  useDeleteMeeting,
  useJoinMeeting,
  useLeaveMeeting,
  useMeetingDetail,
} from '../../model/meeting-detail.queries';
import { MeetingDetailCard } from '../meeting-detail-card';
import { useMeetingShare } from '../meeting-detail-card/hooks/use-meeting-share';

import { useMeetingRole } from './hooks/use-meeting-role';

const MeetingEditModal = dynamic(() =>
  import('@/features/meeting-edit').then((m) => m.MeetingEditModal)
);

const MeetingShareModal = dynamic(
  () =>
    import('../meeting-detail-card/_components/meeting-share-modal').then(
      (m) => m.MeetingShareModal
    ),
  { ssr: false }
);

interface MeetingHeroSectionProps {
  meetingId: number;
  referenceNow: string;
}

export function MeetingHeroSection({ meetingId, referenceNow }: MeetingHeroSectionProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: meeting } = useMeetingDetail(meetingId);
  const { isAuthenticated, setLoginRequired } = useAuthStore();

  const { role, status } = useMeetingRole(meeting, referenceNow);
  const { isOpen: isEditOpen, open: openEdit, close: closeEdit } = useModal();
  const {
    isShareModalOpen,
    shareUrl,
    shareTitle,
    shareImageUrl,
    handleShareClick,
    handleCancelShare,
    handleCopyShareLink,
  } = useMeetingShare({ title: meeting.name, imageUrl: meeting.image });

  const refreshPageAndMeetingCache = () => {
    void queryClient.invalidateQueries({
      queryKey: meetingsQueryOptions.meetingDetail(meeting.id).queryKey,
    });
    router.refresh();
  };

  const joinMutation = useJoinMeeting(meeting.id);
  const leaveMutation = useLeaveMeeting(meeting.id);
  const confirmMutation = useConfirmMeeting(meeting.id);
  const deleteMutation = useDeleteMeeting(meeting.id);

  const isActionPending =
    joinMutation.isPending || leaveMutation.isPending || confirmMutation.isPending;
  const isDeletePending = deleteMutation.isPending;

  const handleJoin = () => {
    if (!isAuthenticated) {
      setLoginRequired(true);
      return;
    }

    joinMutation.mutate();
  };

  const cardProps =
    role === 'host'
      ? {
          role: 'host' as const,
          onConfirm: () => confirmMutation.mutate(),
          onShare: handleShareClick,
          onEdit: openEdit,
          onDelete: () => deleteMutation.mutate(),
          isActionPending,
          isDeletePending,
        }
      : role === 'participant'
        ? {
            role: 'participant' as const,
            isJoined: true,
            onJoin: handleJoin,
            onCancel: () => leaveMutation.mutate(),
            isActionPending,
          }
        : {
            role: 'guest' as const,
            onJoin: handleJoin,
            isActionPending,
          };

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        <div className="relative w-full overflow-hidden rounded-[24px] max-md:aspect-[3/2] md:min-w-0 md:flex-1">
          <Image
            src={meeting.image}
            alt={meeting.name}
            fill
            priority
            sizes="(max-width: 767px) calc(100vw - 32px), calc(50vw - 40px)"
            draggable={false}
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <MeetingDetailCard
            meeting={meeting}
            status={status}
            referenceNow={referenceNow}
            {...cardProps}
          />
        </div>
      </div>

      {role === 'host' && (
        <MeetingEditModal
          open={isEditOpen}
          onClose={closeEdit}
          meetingId={meeting.id}
          defaultValues={toMeetingEditFormData(meeting)}
          onSuccess={refreshPageAndMeetingCache}
        />
      )}

      <MeetingShareModal
        open={isShareModalOpen}
        title={shareTitle}
        url={shareUrl}
        imageUrl={shareImageUrl}
        onClose={handleCancelShare}
        onCopy={handleCopyShareLink}
      />
    </>
  );
}

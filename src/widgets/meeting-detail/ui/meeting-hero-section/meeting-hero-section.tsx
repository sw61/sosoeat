'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';

import { useAuthStore } from '@/entities/auth';
import type { Meeting } from '@/entities/meeting';
import { toMeetingEditFormData } from '@/features/meeting-edit';
import { useModal } from '@/shared/lib/use-modal';

import {
  meetingDetailKeys,
  useConfirmMeeting,
  useDeleteMeeting,
  useJoinMeeting,
  useLeaveMeeting,
  useMeetingDetail,
} from '../../model/meeting-detail.queries';
import { MeetingDetailCard } from '../meeting-detail-card';

import { useMeetingRole } from './hooks/use-meeting-role';

const MeetingEditModal = dynamic(() =>
  import('@/features/meeting-edit').then((m) => m.MeetingEditModal)
);

interface MeetingHeroSectionProps {
  meeting: Meeting;
}

export function MeetingHeroSection({ meeting: initialMeeting }: MeetingHeroSectionProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: meetingData } = useMeetingDetail(initialMeeting.id, initialMeeting);
  const meeting = meetingData ?? initialMeeting;
  const { isAuthenticated, setLoginRequired } = useAuthStore();

  const { role, status } = useMeetingRole(meeting);
  const { isOpen: isEditOpen, open: openEdit, close: closeEdit } = useModal();

  const refreshPageAndMeetingCache = () => {
    void queryClient.invalidateQueries({ queryKey: meetingDetailKeys.detail(meeting.id) });
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
          onShare: () => {
            navigator.clipboard.writeText(window.location.href);
          },
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
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="relative h-[241px] w-full overflow-hidden rounded-[24px] md:h-auto md:min-w-0 md:flex-1">
          <Image
            src={meeting.image}
            alt={meeting.name}
            fill
            priority
            sizes="(max-width: 768px) 670px, 654px"
            draggable={false}
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <MeetingDetailCard meeting={meeting} status={status} {...cardProps} />
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
    </>
  );
}

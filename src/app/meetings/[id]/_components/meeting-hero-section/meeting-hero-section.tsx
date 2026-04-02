'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { MeetingEditModal, toMeetingEditFormData } from '@/components/common/meeting-edit-modal';
import { useModal } from '@/hooks/use-modal';
import type { Meeting } from '@/types/meeting';

import {
  useConfirmMeeting,
  useDeleteMeeting,
  useJoinMeeting,
  useLeaveMeeting,
} from '../../services/meeting-detail.queries';
import { MeetingDetailCard } from '../meeting-detail-card';

import { useMeetingRole } from './hooks/use-meeting-role';

interface MeetingHeroSectionProps {
  meeting: Meeting;
}

export function MeetingHeroSection({ meeting }: MeetingHeroSectionProps) {
  const router = useRouter();
  const { role, status } = useMeetingRole(meeting);
  const { isOpen: isEditOpen, open: openEdit, close: closeEdit } = useModal();

  const refresh = () => router.refresh();

  const joinMutation = useJoinMeeting(meeting.id, refresh);
  const leaveMutation = useLeaveMeeting(meeting.id, refresh);
  const confirmMutation = useConfirmMeeting(meeting.id, refresh);
  const deleteMutation = useDeleteMeeting(meeting.id);

  const isActionPending =
    joinMutation.isPending || leaveMutation.isPending || confirmMutation.isPending;
  const isDeletePending = deleteMutation.isPending;

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
            onJoin: () => joinMutation.mutate(),
            onCancel: () => leaveMutation.mutate(),
            isActionPending,
          }
        : {
            role: 'guest' as const,
            onJoin: () => joinMutation.mutate(),
            isActionPending,
          };

  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="relative h-[241px] w-full overflow-hidden rounded-[24px] md:h-auto md:min-w-0 md:flex-1">
          <Image src={meeting.image} alt={meeting.name} fill className="object-cover" />
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
          onSuccess={refresh}
        />
      )}
    </>
  );
}

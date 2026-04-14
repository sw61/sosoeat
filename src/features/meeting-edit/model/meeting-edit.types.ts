import type { MeetingEditFormData } from './meeting-edit.schema';

export type { MeetingEditFormData };

export type MeetingEditTab = 'basicInfo' | 'schedule';

export interface MeetingEditModalProps {
  open: boolean;
  onClose: () => void;
  meetingId: number;
  defaultValues: MeetingEditFormData;
  onSuccess?: () => void;
}

import { isBefore, parseISO } from 'date-fns';
import { z } from 'zod';

export const meetingEditFormSchema = z
  .object({
    type: z.string().min(1, '모임 종류를 선택해 주세요.'),
    name: z.string().min(1, '모임 이름을 입력해 주세요.').max(30, '30자 이내로 입력해 주세요.'),
    region: z.string().min(1, '지역을 입력해 주세요.'),
    addressBase: z.string().min(1, '장소를 검색해 주세요.'),
    address: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    image: z.string().min(1, '이미지를 업로드해 주세요.'),
    description: z
      .string()
      .min(1, '모임 설명을 입력해 주세요.')
      .max(500, '500자 이내로 입력해 주세요.'),
    meetingDate: z.string().min(1, '모임 날짜를 선택해 주세요.'),
    meetingTime: z.string().min(1, '모임 시간을 선택해 주세요.'),
    registrationEndDate: z.string().min(1, '마감 날짜를 선택해 주세요.'),
    registrationEndTime: z.string().min(1, '마감 시간을 선택해 주세요.'),
    capacity: z
      .number()
      .min(2, '최소 2명 이상이어야 합니다.')
      .max(100, '최대 100명까지 가능합니다.'),
  })
  .refine(
    (data) => {
      if (
        !data.meetingDate ||
        !data.meetingTime ||
        !data.registrationEndDate ||
        !data.registrationEndTime
      )
        return true;
      const meetingDateTime = parseISO(`${data.meetingDate}T${data.meetingTime}`);
      const registrationEnd = parseISO(`${data.registrationEndDate}T${data.registrationEndTime}`);
      return isBefore(registrationEnd, meetingDateTime);
    },
    {
      message: '모집 마감은 모임 일정보다 이전이어야 합니다.',
      path: ['registrationEndDate'],
    }
  );

export type MeetingEditFormData = z.input<typeof meetingEditFormSchema>;

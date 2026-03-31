import { isBefore, parseISO } from 'date-fns';
import { z } from 'zod';

/** Step 1: 카테고리 선택 */
const categorySchema = z.object({
  type: z.string().min(1, '카테고리를 선택해 주세요.'),
});

/** Step 2: 기본 정보 */
const basicInfoSchema = z.object({
  name: z.string().min(1, '모임 이름을 입력해 주세요.').max(30, '30자 이내로 입력해 주세요.'),
  region: z.string().min(1, '지역을 입력해 주세요.'),
  address: z.string().min(1, '주소를 입력해 주세요.'),
  image: z.string().min(1, '이미지를 업로드해 주세요.'),
});

/** Step 3: 설명 */
const descriptionSchema = z.object({
  description: z
    .string()
    .min(1, '모임 설명을 입력해 주세요.')
    .max(500, '500자 이내로 입력해 주세요.'),
});

/** Step 4: 일정/정원 */
const scheduleSchema = z.object({
  meetingDate: z.string().min(1, '모임 날짜를 선택해 주세요.'),
  meetingTime: z.string().min(1, '모임 시간을 선택해 주세요.'),
  registrationEndDate: z.string().min(1, '마감 날짜를 선택해 주세요.'),
  registrationEndTime: z.string().min(1, '마감 시간을 선택해 주세요.'),
  capacity: z.coerce
    .number()
    .min(1, '최소 1명 이상이어야 합니다.')
    .max(100, '최대 100명까지 가능합니다.'),
});

/** 전체 폼 스키마 (모든 단계 합침) */
export const meetingFormSchema = categorySchema
  .merge(basicInfoSchema)
  .merge(descriptionSchema)
  .merge(scheduleSchema)
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

/** 각 단계별 필수 필드 목록 — 다음 버튼 활성화 판단에 사용 */
export const STEP_REQUIRED_FIELDS = {
  category: ['type'],
  basicInfo: ['name', 'region', 'address', 'image'],
  description: ['description'],
  schedule: [
    'meetingDate',
    'meetingTime',
    'registrationEndDate',
    'registrationEndTime',
    'capacity',
  ],
} as const;

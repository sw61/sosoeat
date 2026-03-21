import { z } from 'zod';

export type SignupStep = 'email' | 'password' | 'nickname';

export const emailSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
});

/**
 * [비밀번호 단계 스키마]
 * 1. 최소 8자 이상 제한 (min: 8)
 * 2. 공백 포함 불가
 * 3. 비밀번호와 비밀번호 확인 값이 일치하는지 교차 검증
 */
export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, '비밀번호가 8자 이상이 되도록 해 주세요.')
      .regex(/^[^\s]*$/, '비밀번호에 공백을 포함할 수 없습니다.'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

/**
 * [닉네임 단계 스키마]
 * 1. 정규식(Regex)을 사용하여 완전한 영문자, 완전한 한글, 혹은 숫자로만 입력 제한
 */
export const nicknameSchema = z.object({
  nickname: z
    .string()
    .regex(/^[가-힣a-zA-Z0-9]+$/, '특수문자, 공백, 자음/모음 단일 사용은 불가합니다.'),
});

// 스키마로부터 타입 추론 (Single Source of Truth)
export type EmailValues = z.infer<typeof emailSchema>;
export type PasswordValues = z.infer<typeof passwordSchema>;
export type NicknameValues = z.infer<typeof nicknameSchema>;

/**
 * 전체 회원가입 폼 데이터 타입
 */
export interface SignupFormValues extends EmailValues, PasswordValues, NicknameValues {}

/**
 * 공통 스텝 Props 인터페이스
 */
export interface StepProps<T> {
  onNext: (data: T) => void;
  onPrev?: () => void;
  isLoading?: boolean;
  defaultValues?: Partial<T>;
}

/**
 * 첫 번째 단계용 Props (이전 버튼 없음)
 */
export type FirstStepProps<T> = Omit<StepProps<T>, 'onPrev'>;

/**
 * 중간/마지막 단계용 Props (이전 버튼 필수)
 */
export interface MiddleStepProps<T> extends StepProps<T> {
  onPrev: () => void;
}

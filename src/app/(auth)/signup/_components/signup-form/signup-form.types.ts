import { z } from 'zod';

export type SignupStep = 'email' | 'password' | 'nickname';

export interface SignupFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

export const emailSchema = z.object({
  email: z.string().min(1, { message: '' }).email('올바른 이메일 형식이 아닙니다.'),
});

export interface EmailValues {
  email: string;
}

/**
 * [비밀번호 단계 스키마]
 * 1. 최소 8자 이상 제한 (min: 8)
 * 2. 비밀번호와 비밀번호 확인 값이 일치하는지 교차 검증 (refine 함수 활용)
 */
export const passwordSchema = z
  .object({
    password: z.string().min(1, { message: '' }).min(8, '비밀번호가 8자 이상이 되도록 해 주세요.'),
    passwordConfirm: z.string().min(1, { message: '' }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'], // 에러를 어디 필드에 표시할 지 지정
  });

export interface PasswordValues {
  password: string;
  passwordConfirm: string;
}

/**
 * [닉네임 단계 스키마]
 * 1. 글자 길이 엄격 제한: 2자 이상, 10자 이하
 * 2. 정규식(Regex)을 사용하여 완전한 영문자, 완전한 한글, 혹은 숫자로만 입력 제한
 *    (특수기호, 공백, ㄱ/ㄴ/ㅏ/ㅓ 등 단일 자음/모음 사용을 방어)
 */
export const nicknameSchema = z.object({
  nickname: z
    .string()
    .min(1, { message: '' }) // 터치 유무 파악을 위한 초기 값 제어용
    .min(2, '닉네임은 2자 이상이어야 합니다.')
    .max(10, '닉네임은 10자 이하이어야 합니다.')
    .regex(/^[가-힣a-zA-Z0-9]+$/, '특수문자, 공백, 자음/모음 단일 사용은 불가합니다.'),
});

export interface NicknameValues {
  nickname: string;
}

export interface StepProps<T> {
  onNext: (data: T) => void;
  onPrev?: () => void;
  isLoading?: boolean;
  defaultValues?: Partial<T>;
}

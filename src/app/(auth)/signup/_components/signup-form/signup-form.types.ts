import { SignupRequest } from '@/types/generated-client/models';

export type SignupStep = 'email' | 'password' | 'name';

export type EmailValues = {
  email: string;
};

export type PasswordValues = {
  password: string;
  passwordConfirm: string;
};

export type NameValues = {
  name: string;
};

/**
 * 전체 회원가입 폼 데이터 타입 (클라이언트 전용 필드 포함)
 */
export interface SignupFormValues extends EmailValues, PasswordValues, NameValues {}

/**
 * 서버 API에 전달할 회원가입 payload 타입
 */
export type SignupApiPayload = SignupRequest;

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

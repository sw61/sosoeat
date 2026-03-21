import { EmailValues, NicknameValues, PasswordValues } from './signup-form.schema';

export type SignupStep = 'email' | 'password' | 'nickname';

/**
 * 전체 회원가입 폼 데이터 타입 (클라이언트 전용 필드 포함)
 */
export interface SignupFormValues extends EmailValues, PasswordValues, NicknameValues {}

/**
 * 서버 API에 전달할 회원가입 payload 타입
 * passwordConfirm은 클라이언트 검증 전용 필드이므로 제외합니다.
 */
export type SignupApiPayload = Omit<SignupFormValues, 'passwordConfirm'>;

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

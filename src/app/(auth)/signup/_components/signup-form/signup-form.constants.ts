import { type SignupStep } from './signup-form.types';

/**
 * 각 단계(Step)별 상단 헤더에 렌더링될 제목(title)과 부가 설명(description)을 매핑한 상수입니다.
 * @see SignupStepHeader 컴포넌트에서 활용됩니다.
 */
export const STEP_HEADING_MAP: Record<SignupStep, { title: string; description: string }> = {
  email: {
    title: '이메일을 입력하세요',
    description: '로그인 시 사용할 이메일 주소를 입력해주세요',
  },
  password: {
    title: '비밀번호를 설정하세요',
    description: '로그인 시 사용할 수 있는 안전한 비밀번호를 입력해주세요',
  },
  nickname: {
    title: '프로필을 설정하세요',
    description: '모임에서 사용할 닉네임을 설정해주세요',
  },
};

/**
 * 각 단계 문자열을 실제 화면에 보여질 스텝의 숫자(Number)로 변환해주는 맵핑 객체입니다.
 */
export const STEP_TO_NUMBER: Record<SignupStep, number> = {
  email: 1,
  password: 2,
  nickname: 3,
};

/**
 * Stepper 컴포넌트에서 순회하며 상단 프로세스 바 상태를 그릴 때 사용하는 속성 배열입니다.
 */
export const SIGNUP_STEPS = [
  { id: 'email', label: '이메일', number: 1 },
  { id: 'password', label: '비밀번호', number: 2 },
  { id: 'nickname', label: '프로필', number: 3 },
] as const;

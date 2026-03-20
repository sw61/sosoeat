import { useState } from 'react';

import {
  EmailValues,
  NicknameValues,
  PasswordValues,
  SignupFormValues,
  SignupStep,
} from '../signup-form.types';

interface UseSignupFormProps {
  onSubmit: (data: SignupFormValues) => Promise<void>;
  defaultStep?: SignupStep;
}

/**
 * 회원가입 다단계 폼(Multi-step Form)의 전역 비즈니스 로직과 상태를 관리하는 커스텀 훅입니다.
 * - `step`: 현재 보고 있는 폼의 단계 (email -> password -> nickname) 관리
 * - `formData`: 분리되어 있는 각 하위 폼의 입력 데이터를 하나로 취합하여 저장
 * - `handle[Step]Next`, `handlePrev`: 폼 단계 간의 다음/이전 이동과 데이터 저장을 제어
 */
export const useSignupForm = ({ onSubmit, defaultStep = 'email' }: UseSignupFormProps) => {
  // 현재 보고 있는 스텝 화면의 상태
  const [step, setStep] = useState<SignupStep>(defaultStep);
  // 각 스텝에서 수집된 유저의 입력값들을 임시 보관하는 상태
  const [formData, setFormData] = useState<Partial<SignupFormValues>>({});

  // [1단계] 이메일 작성 완료 ➔ 비밀번호 단계로 전환
  const handleEmailNext = (data: EmailValues) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep('password');
  };

  // [2단계] 비밀번호 작성 완료 ➔ 닉네임 단계로 전환
  const handlePasswordNext = (data: PasswordValues) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep('nickname');
  };

  // [3단계] 닉네임 작성 완료 ➔ 전체 취합된 데이터(finalData)로 최종 가입(onSubmit) 제출 처리
  const handleNicknameNext = async (data: NicknameValues) => {
    // 이전 단계 데이터가 모두 있는지 타입 세이프하게 체크
    if (!formData.email || !formData.password || !formData.passwordConfirm) {
      console.error('필수 회원가입 데이터가 누락되었습니다.');
      setStep('email');
      return;
    }

    const finalData: SignupFormValues = {
      email: formData.email,
      password: formData.password,
      passwordConfirm: formData.passwordConfirm,
      nickname: data.nickname,
    };

    await onSubmit(finalData);
  };

  // 이전 버튼 동작: 현재 스텝을 확인하여 직전 뷰로 단계 변경
  const handlePrev = () => {
    if (step === 'password') setStep('email');
    if (step === 'nickname') setStep('password');
  };

  return {
    step,
    formData,
    handleEmailNext,
    handlePasswordNext,
    handleNicknameNext,
    handlePrev,
  };
};

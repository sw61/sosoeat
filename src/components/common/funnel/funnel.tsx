'use client';

import { Children, isValidElement, ReactNode } from 'react';

export interface StepProps<T extends string> {
  name: T;
  children: ReactNode;
}

export interface FunnelProps<T extends string> {
  step: T;
  children: ReactNode;
}

/**
 * Funnel 내부에서 각 단계를 정의하는 컴포넌트입니다.
 * 실제 렌더링은 Funnel에서 필터링하여 수행합니다.
 */
export const Step = <T extends string>({ children }: StepProps<T>) => {
  return <>{children}</>;
};

/**
 * 여러 단계(Step) 중 현재 활성화된 step만 렌더링하는 컴포넌트입니다.
 */
export const Funnel = <T extends string>({ step, children }: FunnelProps<T>) => {
  const childrenArray = Children.toArray(children);

  // 현재 step과 일치하는 name을 가진 Step 컴포넌트를 찾습니다.
  const activeStep = childrenArray.find((child) => {
    return isValidElement(child) && (child.props as StepProps<T>).name === step;
  });

  if (!activeStep) {
    return null;
  }

  return <>{activeStep}</>;
};

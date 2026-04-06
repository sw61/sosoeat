import { STEP_HEADING_MAP } from '@/features/auth/signup/model/signup-form.constants';
import { type SignupStep } from '@/features/auth/signup/model/signup-form.types';

interface SignupStepHeaderProps {
  step: SignupStep;
}

export const SignupStepHeader = ({ step }: SignupStepHeaderProps) => {
  const { title, description } = STEP_HEADING_MAP[step];

  return (
    <div className="flex flex-col space-y-1 pt-1 md:space-y-2 md:pt-2">
      <h2 className="text-lg font-bold text-gray-900 md:text-xl">{title}</h2>
      <p className="text-xs font-medium text-gray-400 md:text-sm">{description}</p>
    </div>
  );
};

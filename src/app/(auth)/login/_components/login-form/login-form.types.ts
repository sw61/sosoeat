import { LoginRequest } from '@/types/generated-client/models';

export interface LoginFormProps {
  onSubmit?: (data: LoginRequest) => void | Promise<unknown>;
  isLoading?: boolean;
  defaultValues?: Partial<LoginRequest>;
}

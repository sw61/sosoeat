export interface LoginFormValues {
  email: string; // 이메일
  password: string; // 비밀번호
}

export interface LoginFormProps {
  onSubmit?: (data: LoginFormValues) => Promise<void>;
  isLoading?: boolean;
  defaultValues?: Partial<LoginFormValues>;
}

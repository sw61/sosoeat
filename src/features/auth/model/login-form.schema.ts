import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, '이메일을 입력해주세요.')
    .refine((val) => /^[^\n\s@]+@[^\s@]+\.[^\s@]+$/.test(val), '올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

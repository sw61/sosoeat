import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, ' ')
    .superRefine((val, ctx) => {
      if (!val.trim()) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: ' ' });
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: '올바른 이메일 형식이 아닙니다.' });
      }
    }),
  password: z
    .string()
    .min(1, ' ')
    .superRefine((val, ctx) => {
      if (val && val.length < 8) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: '비밀번호가 8자 이상이 되도록 해 주세요.' });
      }
    }),
});

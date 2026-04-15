import { z } from 'zod';

/**
 * [이메일 단계 스키마]
 */
export const emailSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .superRefine((val, ctx) => {
      if (!val.trim()) {
        ctx.addIssue({ code: 'custom', message: '이메일을 입력해주세요.' });
        return;
      }
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)) {
        ctx.addIssue({ code: 'custom', message: '올바른 이메일 형식이 아닙니다.' });
      }
    }),
});

/**
 * [비밀번호 단계 스키마]
 * 1. 최소 8자 이상 제한 (min: 8)
 * 2. 공백 포함 불가
 * 3. 영어와 숫자 모두 포함 필수
 * 4. 비밀번호와 비밀번호 확인 값이 일치하는지 교차 검증
 */
export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(1, '비밀번호를 입력해주세요.')
      .superRefine((val, ctx) => {
        if (!val) return;
        if (val.length < 8) {
          ctx.addIssue({
            code: 'custom',
            message: '비밀번호가 8자 이상이 되도록 해 주세요.',
          });
        } else if (/\s/.test(val)) {
          ctx.addIssue({
            code: 'custom',
            message: '비밀번호에 공백을 포함할 수 없습니다.',
          });
        } else if (!/[a-zA-Z]/.test(val)) {
          ctx.addIssue({
            code: 'custom',
            message: '비밀번호에 영어를 포함해야 합니다.',
          });
        } else if (!/\d/.test(val)) {
          ctx.addIssue({
            code: 'custom',
            message: '비밀번호에 숫자를 포함해야 합니다.',
          });
        }
      }),
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

/**
 * [이름 단계 스키마]
 * 1. 정규식(Regex)을 사용하여 완전한 영문자, 완전한 한글, 혹은 숫자로만 입력 제한
 * 2. 최대 12자 제한
 */
export const nameSchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요.')
    .superRefine((val, ctx) => {
      if (!val) return;
      if (!/^[가-힣a-zA-Z0-9]+$/.test(val)) {
        ctx.addIssue({
          code: 'custom',
          message: '특수문자, 공백, 자음/모음 단일 사용은 불가합니다.',
        });
      } else if (val.length > 12) {
        ctx.addIssue({
          code: 'custom',
          message: '이름은 최대 12자까지 입력할 수 있습니다.',
        });
      }
    }),
});

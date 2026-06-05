import { CookieStorage } from '@/shared/lib/cookie-storage';
import { AuthUser } from '@/shared/types/auth';

type VerifyResult =
  | { user: AuthUser; errorResponse: null }
  | { user: null; errorResponse: Response };

export async function verifyMember(): Promise<VerifyResult> {
  const user = await CookieStorage.getUser();
  if (!user) {
    return {
      user: null,
      errorResponse: Response.json({ message: '로그인이 필요합니다.' }, { status: 401 }),
    };
  }
  return { user, errorResponse: null };
}

import { CookieStorage } from '@/lib/auth/cookie-storage';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

/**
 * [Auth] silentRefresh
 * refreshToken으로 accessToken을 갱신합니다.
 * 갱신 성공 시 새 토큰을 쿠키에 저장하고 true를 반환합니다.
 * 갱신 실패 시 세션을 파기하고 false를 반환합니다.
 */
export async function silentRefresh(): Promise<boolean> {
  const refreshToken = await CookieStorage.getRefreshToken();
  if (!refreshToken) return false;

  const response = await fetch(`${BASE_URL}/${TEAM_ID}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    await CookieStorage.clearSession();
    return false;
  }

  const user = await CookieStorage.getUser();
  const data = await response.json();

  await CookieStorage.setSession({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken || refreshToken,
    user: user ?? undefined,
  });

  return true;
}

import { fetchUserInfo } from './auth-utils';
import { CookieStorage } from './cookie-storage';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

let refreshPromise: Promise<boolean> | null = null;

/**
 * [Auth] silentRefresh
 * refreshToken으로 accessToken을 갱신합니다.
 * 갱신 성공 시 새 토큰과 함께 user 정보도 업데이트하여 쿠키에 저장합니다.
 * 갱신 실패 시 세션을 파기하고 false를 반환합니다.
 */
export async function silentRefresh(): Promise<boolean> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const refreshToken = await CookieStorage.getRefreshToken();
      if (!refreshToken) {
        return false;
      }

      const response = await fetch(`${BASE_URL}/${TEAM_ID}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        await CookieStorage.clearSession();
        return false;
      }

      const data = await response.json();

      if (!data.accessToken || !data.refreshToken) {
        await CookieStorage.clearSession();
        return false;
      }

      // 새 accessToken으로 최신 user 정보 조회
      const user = await fetchUserInfo(data.accessToken);

      await CookieStorage.setSession({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user,
      });

      return true;
    } catch (error) {
      console.error('[silentRefresh] error:', error);
      await CookieStorage.clearSession();
      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

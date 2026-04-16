import * as Sentry from '@sentry/nextjs';

import { fetchUserInfo } from './auth-utils';
import { CookieStorage } from './cookie-storage';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

let refreshPromise: Promise<string | null> | null = null;

/**
 * [Auth] silentRefresh
 * refreshToken으로 accessToken을 갱신합니다.
 * 갱신 성공 시 새 accessToken을 반환하고 쿠키에도 저장합니다.
 * 갱신 실패 시 세션을 파기하고 null을 반환합니다.
 */
export async function silentRefresh(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const refreshToken = await CookieStorage.getRefreshToken();
      if (!refreshToken) {
        return null;
      }

      const response = await fetch(`${BASE_URL}/${TEAM_ID}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        await CookieStorage.clearSession();
        return null;
      }

      const data = await response.json();

      if (!data.accessToken) {
        await CookieStorage.clearSession();
        return null;
      }

      // 새 accessToken으로 최신 user 정보 조회
      const user = await fetchUserInfo(data.accessToken);

      await CookieStorage.setSession({
        accessToken: data.accessToken,
        ...(data.refreshToken && { refreshToken: data.refreshToken }),
        user,
      });

      return data.accessToken as string;
    } catch (error) {
      Sentry.captureException(error, {
        tags: {
          area: 'auth',
          action: 'silent-refresh',
        },
      });
      console.error('[silentRefresh] error:', error);
      await CookieStorage.clearSession();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

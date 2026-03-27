import { cookies } from 'next/headers';

import { AuthUser } from '@/store/auth-store';

export interface SessionData {
  accessToken?: string;
  refreshToken?: string;
  user?: AuthUser;
}

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/**
 * [Infrastructure Layer] CookieStorage
 * next/headers의 cookies()를 사용하여 서버 사이드에서 토큰을 관리합니다.
 */
export class CookieStorage {
  static async getAccessToken() {
    return (await cookies()).get('accessToken')?.value || null;
  }

  static async getRefreshToken() {
    return (await cookies()).get('refreshToken')?.value || null;
  }

  static async getUser(): Promise<AuthUser | null> {
    const raw = (await cookies()).get('user')?.value;
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  static async setSession(data: SessionData) {
    const cookieStore = await cookies();

    if (data.accessToken) {
      cookieStore.set('accessToken', data.accessToken, {
        ...COOKIE_OPTIONS,
        maxAge: 60 * 60, // 1 hour
      });
    }

    if (data.refreshToken) {
      cookieStore.set('refreshToken', data.refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: SESSION_MAX_AGE,
      });
    }

    if (data.user) {
      cookieStore.set('user', JSON.stringify(data.user), {
        ...COOKIE_OPTIONS,
        maxAge: SESSION_MAX_AGE,
      });
    }
  }

  static async clearSession() {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    cookieStore.delete('user');
  }
}

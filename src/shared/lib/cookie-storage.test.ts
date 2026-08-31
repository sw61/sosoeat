/** @jest-environment node */

import { SignJWT } from 'jose';

import { AuthUser } from '../types/auth';

import { CookieStorage } from './cookie-storage';

const mockCookieStore = new Map<string, string>();

jest.mock('next/headers', () => ({
  cookies: async () => ({
    get: (name: string) =>
      mockCookieStore.has(name) ? { value: mockCookieStore.get(name) } : undefined,
    set: (name: string, value: string) => {
      mockCookieStore.set(name, value);
    },
    delete: (name: string) => {
      mockCookieStore.delete(name);
    },
  }),
}));

const SECRET = 'test-session-secret-value';
const USER: AuthUser = { id: 42, email: 'a@b.com', name: '윤영', image: null };

const encode = (value: string) => new TextEncoder().encode(value);

beforeAll(() => {
  process.env.SESSION_SECRET = SECRET;
});

beforeEach(() => {
  mockCookieStore.clear();
});

describe('CookieStorage.getUser', () => {
  it('쿠키가 없으면 null을 반환한다', async () => {
    await expect(CookieStorage.getUser()).resolves.toBeNull();
  });

  it('setSession으로 저장한 사용자를 그대로 돌려준다', async () => {
    await CookieStorage.setSession({ user: USER });

    await expect(CookieStorage.getUser()).resolves.toEqual(USER);
  });

  it('쿠키를 JWT 형식으로 저장한다 (생 JSON이 아니다)', async () => {
    await CookieStorage.setSession({ user: USER });

    const raw = mockCookieStore.get('user')!;
    expect(raw.split('.')).toHaveLength(3);
    expect(raw).not.toContain('윤영');
  });

  it('payload를 조작하면 null을 반환한다', async () => {
    await CookieStorage.setSession({ user: USER });

    const [header, payload, signature] = mockCookieStore.get('user')!.split('.');
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString());
    decoded.user.id = 999; // 다른 사람 행세
    const tampered = Buffer.from(JSON.stringify(decoded)).toString('base64url');

    mockCookieStore.set('user', `${header}.${tampered}.${signature}`);

    await expect(CookieStorage.getUser()).resolves.toBeNull();
  });

  it('다른 키로 서명한 토큰은 null을 반환한다', async () => {
    const forged = await new SignJWT({ user: { ...USER, id: 999 } })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(encode('attacker-secret'));

    mockCookieStore.set('user', forged);

    await expect(CookieStorage.getUser()).resolves.toBeNull();
  });

  it('만료된 토큰은 null을 반환한다', async () => {
    const expired = await new SignJWT({ user: USER })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt(Math.floor(Date.now() / 1000) - 7200)
      .setExpirationTime(Math.floor(Date.now() / 1000) - 3600)
      .sign(encode(SECRET));

    mockCookieStore.set('user', expired);

    await expect(CookieStorage.getUser()).resolves.toBeNull();
  });

  it('서명 없는 생 JSON 쿠키는 null을 반환한다 (기존 형식 무효화)', async () => {
    mockCookieStore.set('user', JSON.stringify({ id: 999, name: '위조' }));

    await expect(CookieStorage.getUser()).resolves.toBeNull();
  });

  it('SESSION_SECRET이 없으면 로그인되지 않은 것으로 처리한다', async () => {
    await CookieStorage.setSession({ user: USER });
    delete process.env.SESSION_SECRET;

    await expect(CookieStorage.getUser()).resolves.toBeNull();

    process.env.SESSION_SECRET = SECRET;
  });
});

describe('CookieStorage 토큰 및 세션 관리', () => {
  it('accessToken과 refreshToken은 가공 없이 저장하고 반환한다', async () => {
    await CookieStorage.setSession({ accessToken: 'at-1', refreshToken: 'rt-1' });

    await expect(CookieStorage.getAccessToken()).resolves.toBe('at-1');
    await expect(CookieStorage.getRefreshToken()).resolves.toBe('rt-1');
  });

  it('전달하지 않은 항목은 기존 값을 유지한다', async () => {
    await CookieStorage.setSession({ accessToken: 'at-1', refreshToken: 'rt-1' });
    await CookieStorage.setSession({ accessToken: 'at-2' });

    await expect(CookieStorage.getAccessToken()).resolves.toBe('at-2');
    await expect(CookieStorage.getRefreshToken()).resolves.toBe('rt-1');
  });

  it('clearSession은 쿠키 세 개를 모두 지운다', async () => {
    await CookieStorage.setSession({ accessToken: 'at-1', refreshToken: 'rt-1', user: USER });

    await CookieStorage.clearSession();

    await expect(CookieStorage.getAccessToken()).resolves.toBeNull();
    await expect(CookieStorage.getRefreshToken()).resolves.toBeNull();
    await expect(CookieStorage.getUser()).resolves.toBeNull();
  });
});

/** @jest-environment node */

import { NextRequest } from 'next/server';

import { config, proxy } from './proxy';

describe('proxy', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('redirects unauthenticated users away from the sosotalk write page', async () => {
    const request = new NextRequest('http://localhost:3000/sosotalk/write');

    const response = await proxy(request);

    expect(response.headers.get('location')).toBe(
      'http://localhost:3000/login?callbackUrl=%2Fsosotalk%2Fwrite'
    );
  });

  it('preserves query params in callbackUrl for sosotalk edit routes', async () => {
    const request = new NextRequest('http://localhost:3000/sosotalk/write?postId=12');

    const response = await proxy(request);

    expect(response.headers.get('location')).toBe(
      'http://localhost:3000/login?callbackUrl=%2Fsosotalk%2Fwrite%3FpostId%3D12'
    );
  });

  it('refreshes access tokens for sosotalk write routes when only a refresh token exists', async () => {
    const request = new NextRequest('http://localhost:3000/sosotalk/write', {
      headers: {
        cookie: 'refreshToken=refresh-token',
      },
    });
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      headers: {
        getSetCookie: () => ['accessToken=renewed-token; Path=/; HttpOnly'],
      },
    } as Response);

    const response = await proxy(request);

    expect(fetchSpy).toHaveBeenCalledWith(new URL('/api/auth/refresh', request.url), {
      method: 'POST',
      headers: { cookie: 'refreshToken=refresh-token' },
    });
    expect(response.headers.get('set-cookie')).toContain('accessToken=renewed-token');
    expect(response.headers.get('location')).toBeNull();
  });

  it('includes sosotalk write routes in the matcher config', () => {
    expect(config.matcher).toEqual(['/mypage/:path*', '/sosotalk/write', '/sosotalk/write/:path*']);
  });
});

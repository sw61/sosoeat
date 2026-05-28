/** @jest-environment node */

import { NextRequest } from 'next/server';

import { createHmac } from 'crypto';

import { POST } from '../route';

const MOCK_SECRET = 'test-secret';
const MOCK_DISCORD_URL = 'https://discord.com/api/webhooks/test';

function sign(body: string): string {
  return createHmac('sha256', MOCK_SECRET).update(body, 'utf8').digest('hex');
}

function makeRequest(body: string, signature?: string): NextRequest {
  return new NextRequest('http://localhost:3000/api/sentry-webhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'sentry-hook-signature': signature ?? sign(body),
    },
    body,
  });
}

describe('POST /api/sentry-webhook', () => {
  beforeEach(() => {
    process.env.SENTRY_WEBHOOK_SECRET = MOCK_SECRET;
    process.env.DISCORD_WEBHOOK_URL = MOCK_DISCORD_URL;
  });

  afterEach(() => {
    delete process.env.SENTRY_WEBHOOK_SECRET;
    delete process.env.DISCORD_WEBHOOK_URL;
    jest.restoreAllMocks();
  });

  it('returns 500 when env vars are missing', async () => {
    delete process.env.SENTRY_WEBHOOK_SECRET;
    const response = await POST(makeRequest('{}'));
    expect(response.status).toBe(500);
  });

  it('returns 401 for invalid signature', async () => {
    const body = JSON.stringify({ action: 'created' });
    const response = await POST(makeRequest(body, 'bad-signature'));
    expect(response.status).toBe(401);
  });

  it('returns 400 for malformed JSON body', async () => {
    const body = 'not-json';
    const response = await POST(makeRequest(body, sign(body)));
    expect(response.status).toBe(400);
  });

  it('returns 200 for valid payload without issue data', async () => {
    const body = JSON.stringify({ action: 'created', data: {} });
    const response = await POST(makeRequest(body));
    expect(response.status).toBe(200);
  });

  it('calls Discord and returns 200 for a valid issue payload', async () => {
    const fetchSpy = jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(null, { status: 204 }));

    const payload = {
      action: 'created',
      data: {
        issue: {
          id: '1',
          title: 'TypeError: Cannot read property',
          culprit: 'app/page.tsx',
          permalink: 'https://sentry.io/issues/1',
          level: 'error',
          project: { name: 'sosoeat' },
        },
      },
    };
    const body = JSON.stringify(payload);
    const response = await POST(makeRequest(body));

    expect(response.status).toBe(200);
    expect(fetchSpy).toHaveBeenCalledWith(
      MOCK_DISCORD_URL,
      expect.objectContaining({ method: 'POST' })
    );
  });
});

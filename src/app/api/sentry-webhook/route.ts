import { NextResponse } from 'next/server';

import { createHmac, timingSafeEqual } from 'crypto';

type SentryIssue = {
  id: string;
  title: string;
  culprit?: string;
  permalink?: string;
  level?: string;
  project?: { name: string };
};

type SentryWebhookPayload = {
  action?: string;
  data?: { issue?: SentryIssue };
};

const LEVEL_COLORS: Record<string, number> = {
  fatal: 0xff0000,
  error: 0xe53e3e,
  warning: 0xf6ad55,
  info: 0x63b3ed,
};

function verifySignature(body: string, signature: string, secret: string): boolean {
  const digest = createHmac('sha256', secret).update(body, 'utf8').digest('hex');
  try {
    return timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const discordUrl = process.env.DISCORD_WEBHOOK_URL;
  const secret = process.env.SENTRY_WEBHOOK_SECRET;

  if (!discordUrl || !secret) {
    return NextResponse.json({ error: 'Misconfigured' }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get('sentry-hook-signature') ?? '';

  if (!verifySignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload: SentryWebhookPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const issue = payload.data?.issue;
  if (!issue) {
    return NextResponse.json({ ok: true });
  }

  const level = issue.level ?? 'error';

  await fetch(discordUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      embeds: [
        {
          title: `[${level.toUpperCase()}] ${issue.title}`,
          url: issue.permalink,
          description: issue.culprit,
          color: LEVEL_COLORS[level] ?? LEVEL_COLORS.error,
          fields: [
            { name: 'Project', value: issue.project?.name ?? '-', inline: true },
            { name: 'Action', value: payload.action ?? '-', inline: true },
          ],
          footer: { text: 'Sentry → Discord' },
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });

  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, createSessionToken, setSessionCookie } from '@/lib/auth';
import { verifyTOTP, isTOTPConfigured } from '@/lib/totp';
import { appendAuditEvent, extractIp } from '@/lib/audit';

export async function POST(req: NextRequest) {
  const ip = extractIp(req);
  const userAgent = req.headers.get('user-agent') ?? 'unknown';

  try {
    const { username, password, totpCode } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    if (!verifyCredentials(username, password)) {
      await Promise.all([
        new Promise((r) => setTimeout(r, 500)),
        appendAuditEvent({
          type: 'LOGIN_FAILURE',
          username,
          ip,
          userAgent,
          reason: 'Invalid credentials',
        }),
      ]);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    if (isTOTPConfigured()) {
      if (!totpCode) {
        return NextResponse.json({ error: 'Two-factor code required' }, { status: 400 });
      }
      if (!verifyTOTP(process.env.ADMIN_TOTP_SECRET!, totpCode)) {
        await Promise.all([
          new Promise((r) => setTimeout(r, 500)),
          appendAuditEvent({
            type: 'LOGIN_FAILURE',
            username,
            ip,
            userAgent,
            reason: 'Invalid two-factor code',
          }),
        ]);
        return NextResponse.json({ error: 'Invalid two-factor code' }, { status: 401 });
      }
    }

    const token = createSessionToken();
    await Promise.all([
      setSessionCookie(token),
      appendAuditEvent({ type: 'LOGIN_SUCCESS', username, ip, userAgent }),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

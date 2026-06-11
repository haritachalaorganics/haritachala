import { NextRequest, NextResponse } from 'next/server';
import { generateTOTPSecret, getTOTPUri, isTOTPConfigured, verifyTOTP } from '@/lib/totp';
import { getSessionToken, verifySessionToken } from '@/lib/auth';
import QRCode from 'qrcode';

async function assertSetupAccess(): Promise<boolean> {
  if (process.env.NODE_ENV === 'development') return true;
  const token = await getSessionToken();
  return !!token && verifySessionToken(token);
}

export async function GET() {
  if (!(await assertSetupAccess())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const secret = isTOTPConfigured()
    ? process.env.ADMIN_TOTP_SECRET!
    : generateTOTPSecret();

  const uri = getTOTPUri(secret);
  const qrDataUrl = await QRCode.toDataURL(uri, { width: 256, margin: 2 });

  return NextResponse.json({ secret, uri, qrDataUrl, configured: isTOTPConfigured() });
}

// Dedicated TOTP test endpoint — avoids going through the login route
export async function POST(req: NextRequest) {
  if (!(await assertSetupAccess())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { testCode } = await req.json();
  if (!testCode || !isTOTPConfigured()) {
    return NextResponse.json({ valid: false });
  }

  const valid = verifyTOTP(process.env.ADMIN_TOTP_SECRET!, String(testCode));
  return NextResponse.json({ valid });
}

import { NextResponse } from 'next/server';
import { isTOTPConfigured } from '@/lib/totp';

// Public — intentionally reveals only a boolean, no secrets.
// The login page needs to know whether to show the TOTP field.
export async function GET() {
  return NextResponse.json({ totpRequired: isTOTPConfigured() });
}

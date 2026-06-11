import { NextResponse } from 'next/server';
import { getSessionToken, verifySessionToken } from '@/lib/auth';
import { getAuditLog } from '@/lib/audit';

export async function GET() {
  const token = await getSessionToken();
  if (!token || !verifySessionToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const log = await getAuditLog();
  return NextResponse.json(log);
}

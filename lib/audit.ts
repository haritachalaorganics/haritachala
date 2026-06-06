import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { randomBytes } from 'crypto';

export type AuditEventType = 'LOGIN_SUCCESS' | 'LOGIN_FAILURE';

export interface AuditEvent {
  id: string;
  timestamp: string; // ISO 8601
  type: AuditEventType;
  username: string;
  ip: string;
  userAgent: string;
  reason?: string; // populated on failure
}

const LOCAL_FILE = join(process.cwd(), 'data', 'audit_log.json');
const BLOB_PATHNAME = 'audit-log.json';
const MAX_EVENTS = 200;

export async function getAuditLog(): Promise<AuditEvent[]> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { list } = await import('@vercel/blob');
      const { blobs } = await list({ prefix: BLOB_PATHNAME });
      const blob = blobs.find((b) => b.pathname === BLOB_PATHNAME);
      if (blob) {
        const res = await fetch(blob.url, { cache: 'no-store' });
        if (res.ok) return (await res.json()) as AuditEvent[];
      }
    } catch (e) {
      console.error('[audit] blob read failed:', e);
    }
  }

  if (process.env.NODE_ENV === 'development') {
    try {
      return JSON.parse(readFileSync(LOCAL_FILE, 'utf-8')) as AuditEvent[];
    } catch {}
  }

  return [];
}

export async function appendAuditEvent(
  event: Omit<AuditEvent, 'id' | 'timestamp'>,
): Promise<void> {
  const newEvent: AuditEvent = {
    id: randomBytes(8).toString('hex'),
    timestamp: new Date().toISOString(),
    ...event,
  };

  let existing: AuditEvent[] = [];
  try {
    existing = await getAuditLog();
  } catch {}

  const updated = [newEvent, ...existing].slice(0, MAX_EVENTS);
  const json = JSON.stringify(updated, null, 2);

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { put } = await import('@vercel/blob');
      await put(BLOB_PATHNAME, json, {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
      });
      return;
    } catch (e) {
      console.error('[audit] blob write failed:', e);
    }
  }

  if (process.env.NODE_ENV === 'development') {
    try {
      writeFileSync(LOCAL_FILE, json, 'utf-8');
    } catch (e) {
      console.error('[audit] file write failed:', e);
    }
  }
}

export function extractIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

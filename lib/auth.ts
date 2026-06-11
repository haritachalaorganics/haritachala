import { createHmac, createHash, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const TOKEN_COOKIE = 'admin_token';
const TOKEN_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

function getSecret(): string {
  const s = process.env.ADMIN_JWT_SECRET;
  if (!s) throw new Error('ADMIN_JWT_SECRET env var is not set');
  return s;
}

export function createSessionToken(): string {
  const payload = JSON.stringify({ admin: true, exp: Date.now() + TOKEN_TTL_MS });
  const data = Buffer.from(payload).toString('base64url');
  const sig = createHmac('sha256', getSecret()).update(data).digest('base64url');
  return `${data}.${sig}`;
}

export function verifySessionToken(token: string): boolean {
  try {
    const dot = token.lastIndexOf('.');
    if (dot === -1) return false;
    const data = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    const expectedSig = createHmac('sha256', getSecret()).update(data).digest('base64url');
    if (sig.length !== expectedSig.length) return false;
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) return false;
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString());
    return typeof payload.exp === 'number' && Date.now() < payload.exp;
  } catch {
    return false;
  }
}

export function verifyCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME ?? '';
  const expectedHash = process.env.ADMIN_PASSWORD_HASH ?? '';

  const passHash = createHash('sha256').update(password).digest('hex');

  const padTo = 128;
  const userBuf = Buffer.from(username.padEnd(padTo).slice(0, padTo));
  const expUserBuf = Buffer.from(expectedUser.padEnd(padTo).slice(0, padTo));
  const hashBuf = Buffer.from(passHash.padEnd(padTo).slice(0, padTo));
  const expHashBuf = Buffer.from(expectedHash.padEnd(padTo).slice(0, padTo));

  const userOk = timingSafeEqual(userBuf, expUserBuf);
  const passOk = timingSafeEqual(hashBuf, expHashBuf);
  return userOk && passOk;
}

export async function setSessionCookie(token: string): Promise<void> {
  const store = await cookies();
  store.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: TOKEN_TTL_MS / 1000,
    path: '/',
  });
}

export async function getSessionToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(TOKEN_COOKIE)?.value ?? null;
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(TOKEN_COOKIE);
}

export async function requireAuth(): Promise<void> {
  const token = await getSessionToken();
  if (!token || !verifySessionToken(token)) redirect('/admin');
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getSessionToken();
  return !!token && verifySessionToken(token);
}

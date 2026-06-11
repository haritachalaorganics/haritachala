import { TOTP, Secret } from 'otpauth';

const ISSUER = 'Haritachala Organics Admin';
const LABEL = 'Admin';

function buildTOTP(secret: string): TOTP {
  return new TOTP({ issuer: ISSUER, label: LABEL, algorithm: 'SHA1', digits: 6, period: 30, secret });
}

export function verifyTOTP(secret: string, code: string): boolean {
  try {
    const totp = buildTOTP(secret);
    return totp.validate({ token: code.replace(/\s/g, ''), window: 1 }) !== null;
  } catch {
    return false;
  }
}

export function getTOTPUri(secret: string): string {
  return buildTOTP(secret).toString();
}

export function generateTOTPSecret(): string {
  return new Secret({ size: 20 }).base32;
}

export function isTOTPConfigured(): boolean {
  return !!process.env.ADMIN_TOTP_SECRET;
}

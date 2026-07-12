import { createHmac, timingSafeEqual } from "crypto";

/**
 * Signs a user id into a short, unguessable token for one-click newsletter
 * unsubscribe links — no login required to click "unsubscribe" from an
 * email client. Falls back to RESEND_API_KEY as the signing secret if a
 * dedicated one isn't set, so this works out of the box wherever Resend is
 * already configured; set UNSUBSCRIBE_SECRET explicitly for a stronger,
 * independent secret in production.
 */
function getSecret(): string {
  return process.env.UNSUBSCRIBE_SECRET || process.env.RESEND_API_KEY || "vttw-unsubscribe-dev-secret";
}

export function createUnsubscribeToken(userId: string): string {
  return createHmac("sha256", getSecret()).update(userId).digest("hex").slice(0, 32);
}

export function verifyUnsubscribeToken(userId: string, token: string): boolean {
  const expected = createUnsubscribeToken(userId);
  const a = Buffer.from(expected);
  const b = Buffer.from(token);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

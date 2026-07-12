/**
 * Best-effort in-memory rate limiter for public, unauthenticated routes.
 *
 * Caveat: this state lives in a single serverless function instance's
 * memory, so on a multi-instance deployment (which Vercel scales to under
 * load) each instance tracks its own counts — a determined abuser spread
 * across instances isn't fully blocked. It still stops the common case
 * (a script hammering one endpoint) and costs nothing to run. For real
 * production-grade rate limiting, put Upstash Redis + @upstash/ratelimit
 * (or Vercel Firewall rules) in front of these routes instead.
 */

const buckets = new Map<string, { count: number; resetAt: number }>();

// Prevent unbounded memory growth if this instance runs a long time.
const MAX_TRACKED_KEYS = 5000;

export function checkRateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    if (buckets.size >= MAX_TRACKED_KEYS) buckets.clear();
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (bucket.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  bucket.count++;
  return { allowed: true, remaining: limit - bucket.count };
}

/** Best-effort client identifier from standard proxy headers (Vercel sets x-forwarded-for). */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

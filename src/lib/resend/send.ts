import type { ReactNode } from "react";
import { getResendClient } from "@/lib/resend/server";
import { RESEND_FROM_EMAIL } from "@/lib/resend/config";
import { createAdminClient } from "@/lib/supabase/admin";
import type { EmailType } from "@/lib/supabase/database.types";

const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 500;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** True for errors worth retrying (network blips, rate limits, 5xx) — not for a bad address or missing config. */
function isRetryable(message: string): boolean {
  const lower = message.toLowerCase();
  return (
    lower.includes("timeout") ||
    lower.includes("network") ||
    lower.includes("rate limit") ||
    lower.includes("429") ||
    lower.includes("500") ||
    lower.includes("502") ||
    lower.includes("503") ||
    lower.includes("econnreset") ||
    lower.includes("fetch failed")
  );
}

export type SendEmailParams = {
  type: EmailType;
  to: string;
  subject: string;
  react: ReactNode;
  text: string;
  replyTo?: string;
  /** Extra context stored alongside the log row (booking id, campaign id, etc.) — no PII beyond what's already in `to`. */
  metadata?: Record<string, string | number | boolean | null>;
};

export type SendEmailResult = { success: true; id?: string } | { success: false; error: string };

/**
 * Single choke point for every outgoing email in the app: retries transient
 * failures with backoff, always logs the outcome (console + best-effort
 * email_logs row), and never throws — callers get a normalized result and
 * decide for themselves whether a failed email should affect the response.
 */
export async function sendEmail(params: SendEmailParams): Promise<SendEmailResult> {
  const resend = getResendClient();
  if (!resend) {
    const error = "Resend is not configured (RESEND_API_KEY missing).";
    await logEmail(params, { status: "failed", error, attempts: 0 });
    console.error(`[email:${params.type}] skipped — ${error}`);
    return { success: false, error };
  }

  let lastError = "Unknown error";

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const result = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: params.to,
      subject: params.subject,
      react: params.react,
      text: params.text,
      replyTo: params.replyTo,
    });

    if (!result.error) {
      const id = result.data?.id;
      console.log(`[email:${params.type}] sent to ${params.to} (attempt ${attempt}/${MAX_ATTEMPTS}, id=${id ?? "n/a"})`);
      await logEmail(params, { status: "sent", providerId: id, attempts: attempt });
      return { success: true, id };
    }

    lastError = result.error.message ?? String(result.error);
    console.error(`[email:${params.type}] attempt ${attempt}/${MAX_ATTEMPTS} failed for ${params.to}: ${lastError}`);

    const hasAttemptsLeft = attempt < MAX_ATTEMPTS;
    if (!hasAttemptsLeft || !isRetryable(lastError)) break;

    await sleep(RETRY_DELAY_MS * attempt);
  }

  await logEmail(params, { status: "failed", error: lastError, attempts: MAX_ATTEMPTS });
  return { success: false, error: lastError };
}

async function logEmail(
  params: SendEmailParams,
  outcome: { status: "sent" | "failed"; providerId?: string; error?: string; attempts: number },
) {
  const admin = createAdminClient();
  if (!admin) return; // Logging is best-effort — never let a missing service-role key break a send.

  try {
    await admin.from("email_logs").insert({
      type: params.type,
      recipient: params.to,
      status: outcome.status,
      provider_id: outcome.providerId ?? null,
      error: outcome.error ?? null,
      attempts: outcome.attempts,
      metadata: params.metadata ?? {},
    });
  } catch (err) {
    console.error(`[email:${params.type}] failed to write email_logs row:`, err);
  }
}

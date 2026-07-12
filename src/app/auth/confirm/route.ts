import type { EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendWelcomeEmail } from "@/lib/resend/emails";

/**
 * Target for Supabase Auth's "Confirm signup" email link
 * ({{ .ConfirmationURL }} in the Supabase dashboard's email template must be
 * changed to point here — see docs/EMAIL_SETUP.md). This is the one real
 * server-side hook for "a user successfully creates and verifies an
 * account": verifyOtp() only succeeds once the click is genuine, so the
 * Welcome email fires right after, exactly once (guarded by
 * profiles.welcome_email_sent_at).
 *
 * Password reset and magic-link emails keep using Supabase's own templates
 * and can keep pointing at Supabase's default verify endpoint — only the
 * signup confirmation template needs to be repointed here.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/dashboard";

  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");

  if (!tokenHash || !type) {
    redirectTo.pathname = "/auth/login";
    redirectTo.searchParams.set("error", "invalid-confirmation-link");
    return NextResponse.redirect(redirectTo);
  }

  const supabase = await createClient();
  if (!supabase) {
    redirectTo.pathname = "/auth/login";
    return NextResponse.redirect(redirectTo);
  }

  const { data, error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });

  if (error || !data.user) {
    redirectTo.pathname = "/auth/login";
    redirectTo.searchParams.set("error", "confirmation-failed");
    return NextResponse.redirect(redirectTo);
  }

  if (type === "signup" || type === "email") {
    await sendWelcomeEmailOnce(supabase, data.user);
  }

  return NextResponse.redirect(redirectTo);
}

async function sendWelcomeEmailOnce(
  supabase: NonNullable<Awaited<ReturnType<typeof createClient>>>,
  user: { id: string; email?: string; user_metadata?: { full_name?: string } },
) {
  if (!user.email) return;

  const { data: profile } = await supabase
    .from("profiles")
    .select("welcome_email_sent_at, full_name")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.welcome_email_sent_at) return; // Already sent — link clicked twice, or a re-run.

  const result = await sendWelcomeEmail({
    to: user.email,
    name: profile?.full_name || user.user_metadata?.full_name || user.email.split("@")[0],
  });

  if (result.success) {
    await supabase
      .from("profiles")
      .update({ welcome_email_sent_at: new Date().toISOString() })
      .eq("id", user.id);
  }
}

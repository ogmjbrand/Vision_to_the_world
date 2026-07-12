import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyUnsubscribeToken } from "@/lib/resend/unsubscribe";

const PAGE_STYLE =
  "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;text-align:center;padding:80px 20px;color:#0D0D0D;";

function htmlPage(title: string, body: string) {
  return `<!doctype html><html><head><meta charset="utf-8" /><title>${title}</title></head><body style="${PAGE_STYLE}"><h1 style="font-size:22px;">${title}</h1><p style="color:#5B6B7A;">${body}</p></body></html>`;
}

/** One-click unsubscribe — no login required, matching the link in every Newsletter email's footer. */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  if (!uid || !token || !verifyUnsubscribeToken(uid, token)) {
    return new NextResponse(
      htmlPage("Invalid link", "This unsubscribe link is invalid or has expired."),
      { status: 400, headers: { "Content-Type": "text/html" } },
    );
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return new NextResponse(htmlPage("Service unavailable", "Please try again later."), {
      status: 503,
      headers: { "Content-Type": "text/html" },
    });
  }

  await supabase.from("profiles").update({ newsletter_opt_in: false }).eq("id", uid);

  return new NextResponse(
    htmlPage(
      "You've been unsubscribed",
      "You won't receive any more newsletter emails from Vision To The World. You'll still get booking confirmations, invoices, and trip reminders for any active bookings.",
    ),
    { headers: { "Content-Type": "text/html" } },
  );
}

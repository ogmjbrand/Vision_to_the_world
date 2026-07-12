import { NextRequest, NextResponse } from "next/server";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { sendNewsletterEmail } from "@/lib/resend/emails";

export const maxDuration = 60;

const CHUNK_SIZE = 10;

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  const supabase = await createClient();
  if (!user || !supabase) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const body = await request.json();
  const { headline, intro } = body as { headline?: string; intro?: string };

  if (!headline?.trim() || !intro?.trim()) {
    return NextResponse.json({ error: "Headline and intro are required." }, { status: 400 });
  }

  const { data: recipients, error } = await supabase
    .from("profiles")
    .select("id, email")
    .eq("newsletter_opt_in", true)
    .not("email", "is", null);

  if (error) {
    console.error("[newsletter:send] failed to load recipients:", error.message);
    return NextResponse.json({ error: "Failed to load recipient list." }, { status: 500 });
  }

  const list = (recipients ?? []).filter(
    (r): r is { id: string; email: string } => !!r.email,
  );

  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < list.length; i += CHUNK_SIZE) {
    const chunk = list.slice(i, i + CHUNK_SIZE);
    const results = await Promise.all(
      chunk.map((r) => sendNewsletterEmail({ to: r.email, userId: r.id, headline, intro })),
    );
    for (const result of results) {
      if (result.success) successCount++;
      else failureCount++;
    }
  }

  await supabase.from("newsletter_campaigns").insert({
    sent_by: user.id,
    headline,
    intro,
    recipient_count: list.length,
    success_count: successCount,
    failure_count: failureCount,
  });

  console.log(
    `[newsletter:send] campaign "${headline}" — ${successCount}/${list.length} sent, ${failureCount} failed`,
  );

  return NextResponse.json({
    ok: true,
    recipientCount: list.length,
    successCount,
    failureCount,
  });
}

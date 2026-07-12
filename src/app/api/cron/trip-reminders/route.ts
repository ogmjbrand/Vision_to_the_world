import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendTripReminderEmail } from "@/lib/resend/emails";

export const maxDuration = 60;

type ReminderMilestone = { daysUntil: 7 | 1; column: "reminder_7d_sent_at" | "reminder_24h_sent_at" };

const MILESTONES: ReminderMilestone[] = [
  { daysUntil: 7, column: "reminder_7d_sent_at" },
  { daysUntil: 1, column: "reminder_24h_sent_at" },
];

function isoDateInDays(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * Runs once a day (see vercel.json) and, in one pass, sends both the 7-day
 * and the "24 hours before" reminder — the latter is a daily batch job, so
 * "24 hours before" means "the day before", not a to-the-minute countdown.
 * Each booking row tracks its own reminder_7d_sent_at / reminder_24h_sent_at
 * so a retried or overlapping run can never double-send.
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase service role is not configured." }, { status: 503 });
  }

  const results: { milestone: number; sent: number; failed: number }[] = [];

  for (const milestone of MILESTONES) {
    const targetDate = isoDateInDays(milestone.daysUntil);

    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("id, title, travel_date, user_id, profile:profiles(email, full_name)")
      .eq("travel_date", targetDate)
      .is(milestone.column, null)
      .neq("status", "cancelled");

    if (error) {
      console.error(`[cron:trip-reminders] query failed for ${milestone.daysUntil}d milestone:`, error.message);
      results.push({ milestone: milestone.daysUntil, sent: 0, failed: 0 });
      continue;
    }

    let sent = 0;
    let failed = 0;

    for (const booking of bookings ?? []) {
      const profile = booking.profile as unknown as { email: string | null; full_name: string | null } | null;
      if (!profile?.email) {
        failed++;
        continue;
      }

      const bookingRef = `VTW-${booking.id.slice(0, 8).toUpperCase()}`;
      const departDate = new Date(`${booking.travel_date}T00:00:00Z`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const result = await sendTripReminderEmail({
        to: profile.email,
        name: profile.full_name ?? undefined,
        destination: booking.title,
        daysUntil: milestone.daysUntil,
        departDate,
        bookingRef,
      });

      if (result.success) {
        sent++;
        const update =
          milestone.column === "reminder_7d_sent_at"
            ? { reminder_7d_sent_at: new Date().toISOString() }
            : { reminder_24h_sent_at: new Date().toISOString() };
        await supabase.from("bookings").update(update).eq("id", booking.id);
      } else {
        failed++;
      }
    }

    results.push({ milestone: milestone.daysUntil, sent, failed });
  }

  console.log("[cron:trip-reminders] complete:", JSON.stringify(results));
  return NextResponse.json({ ok: true, results });
}

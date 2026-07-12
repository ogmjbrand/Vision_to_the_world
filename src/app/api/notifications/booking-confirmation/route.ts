import { NextRequest, NextResponse } from "next/server";
import { sendBookingConfirmationEmail } from "@/lib/resend/emails";
import { getCurrentUser } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { to, title, type, total, currency, bookingRef } = body as {
    to?: string;
    title?: string;
    type?: string;
    total?: number;
    currency?: string;
    bookingRef?: string;
  };

  if (!to || !title || !type || !Number.isFinite(total)) {
    return NextResponse.json({ error: "Missing booking details." }, { status: 400 });
  }

  // Without this check, anyone could POST an arbitrary `to` address here and
  // get a real branded email sent to it, no login required — an open email
  // relay. Only the signed-in user emailing their own address is legitimate;
  // this is only ever called client-side right after that same user's own
  // checkout completes.
  const user = await getCurrentUser();
  if (!user?.email || user.email !== to) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const result = await sendBookingConfirmationEmail({
    to,
    title,
    type,
    bookingRef: bookingRef ?? `VTW-${Date.now().toString(36).toUpperCase()}`,
    total: total as number,
    currency: currency ?? "USD",
  });

  if (!result.success) {
    // Email failures shouldn't block the booking flow — sendBookingConfirmationEmail
    // already retried and logged this; just report the outcome, don't throw.
    return NextResponse.json({ sent: false }, { status: 200 });
  }

  return NextResponse.json({ sent: true });
}

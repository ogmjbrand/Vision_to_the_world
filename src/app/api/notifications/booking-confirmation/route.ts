import { NextRequest, NextResponse } from "next/server";
import { sendBookingConfirmationEmail } from "@/lib/resend/emails";

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

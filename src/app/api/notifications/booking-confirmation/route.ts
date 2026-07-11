import { NextRequest, NextResponse } from "next/server";
import { sendBookingConfirmationEmail } from "@/lib/resend/emails";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { to, title, type, total, currency } = body as {
    to?: string;
    title?: string;
    type?: string;
    total?: number;
    currency?: string;
  };

  if (!to || !title || !type || !Number.isFinite(total)) {
    return NextResponse.json({ error: "Missing booking details." }, { status: 400 });
  }

  const result = await sendBookingConfirmationEmail({
    to,
    title,
    type,
    total: total as number,
    currency: currency ?? "USD",
  });

  if (result.error) {
    // Email failures shouldn't block the booking flow — log and report, don't throw.
    console.error("Booking confirmation email failed:", result.error);
    return NextResponse.json({ sent: false }, { status: 200 });
  }

  return NextResponse.json({ sent: true });
}

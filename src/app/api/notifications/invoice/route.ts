import { NextRequest, NextResponse } from "next/server";
import { sendInvoiceEmail } from "@/lib/resend/emails";
import { getCurrentUser } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { to, title, invoiceNumber, subtotal, serviceFee, total, currency } = body as {
    to?: string;
    title?: string;
    invoiceNumber?: string;
    subtotal?: number;
    serviceFee?: number;
    total?: number;
    currency?: string;
  };

  if (!to || !title || !Number.isFinite(subtotal) || !Number.isFinite(total)) {
    return NextResponse.json({ error: "Missing invoice details." }, { status: 400 });
  }

  // Same open-relay concern as booking-confirmation — only let the signed-in
  // user trigger an invoice email to their own address.
  const user = await getCurrentUser();
  if (!user?.email || user.email !== to) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const result = await sendInvoiceEmail({
    to,
    title,
    invoiceNumber: invoiceNumber ?? `INV-${Date.now().toString(36).toUpperCase()}`,
    subtotal: subtotal as number,
    serviceFee: serviceFee ?? (total as number) - (subtotal as number),
    total: total as number,
    currency: currency ?? "USD",
  });

  if (!result.success) {
    return NextResponse.json({ sent: false }, { status: 200 });
  }

  return NextResponse.json({ sent: true });
}

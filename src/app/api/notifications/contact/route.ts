import { NextRequest, NextResponse } from "next/server";
import { sendContactNotificationEmail, sendContactAutoReplyEmail } from "@/lib/resend/emails";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const { allowed } = checkRateLimit(`contact:${getClientIp(request)}`, {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const body = await request.json();
  const { name, email, subject, message } = body as {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Missing contact details." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }
  if (name.length > 200 || message.length > 5000 || (subject?.length ?? 0) > 200) {
    return NextResponse.json({ error: "Input too long." }, { status: 400 });
  }

  const [notification, autoReply] = await Promise.all([
    sendContactNotificationEmail({ name, email, subject: subject ?? "general", message }),
    sendContactAutoReplyEmail({ to: email, name }),
  ]);

  // sendContactNotificationEmail/sendContactAutoReplyEmail already retried and
  // logged internally — just report the combined outcome here.
  return NextResponse.json({ sent: notification.success && autoReply.success });
}

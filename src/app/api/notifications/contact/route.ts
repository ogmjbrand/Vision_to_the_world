import { NextRequest, NextResponse } from "next/server";
import { sendContactNotificationEmail, sendContactAutoReplyEmail } from "@/lib/resend/emails";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, subject, message } = body as {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing contact details." }, { status: 400 });
  }

  const [notification, autoReply] = await Promise.all([
    sendContactNotificationEmail({ name, email, subject: subject ?? "general", message }),
    sendContactAutoReplyEmail({ to: email, name }),
  ]);

  if (notification.error || autoReply.error) {
    console.error("Contact email failed:", notification.error, autoReply.error);
  }

  return NextResponse.json({ sent: !notification.error && !autoReply.error });
}

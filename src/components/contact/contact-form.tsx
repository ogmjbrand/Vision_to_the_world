"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const inputClass =
  "w-full rounded-lg border border-brand-200 bg-white px-3.5 py-2.5 text-sm text-brand-950 placeholder:text-brand-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";
const labelClass = "mb-1 block text-xs font-semibold text-brand-600";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const subject = String(data.get("subject") ?? "general");
    const message = String(data.get("message") ?? "");

    if (isSupabaseConfigured) {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error: insertError } = await supabase.from("support_tickets").insert({
        user_id: user?.id ?? null,
        name,
        email,
        subject,
        message,
      });

      setLoading(false);

      if (insertError) {
        setError("Something went wrong sending your message. Please try again.");
        return;
      }

      setSubmitted(true);
      return;
    }

    // No backend configured — simulate submission so the form still feels responsive.
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brand-100 bg-brand-50 p-8 text-center">
        <h3 className="text-lg font-semibold text-brand-950">
          Thanks — we&apos;ve received your message
        </h3>
        <p className="mt-2 text-sm text-brand-600">
          A member of our travel support team will respond within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Full name</label>
          <input name="name" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Email address</label>
          <input type="email" name="email" required className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Subject</label>
        <select name="subject" className={inputClass} defaultValue="general">
          <option value="general">General inquiry</option>
          <option value="booking">Booking support</option>
          <option value="visa">Visa & travel assistance</option>
          <option value="consultant">Speak to a travel consultant</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Message</label>
        <textarea
          name="message"
          required
          rows={5}
          className={inputClass}
          placeholder="Tell us about your trip or question..."
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <Button type="submit" disabled={loading} className="w-fit">
        <Send className="h-4 w-4" />
        {loading ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}

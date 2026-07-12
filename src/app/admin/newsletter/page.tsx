"use client";

import { useState, type FormEvent } from "react";
import { Send, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const inputClass =
  "w-full rounded-xl border border-brand-200 bg-white px-3.5 py-2.5 text-sm text-brand-950 placeholder:text-brand-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";
const labelClass = "mb-1 block text-xs font-semibold text-brand-600";

type Result = { recipientCount: number; successCount: number; failureCount: number };

export default function AdminNewsletterPage() {
  const [headline, setHeadline] = useState("");
  const [intro, setIntro] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (
      !window.confirm(
        "This will send a real email to every opted-in customer. Send this campaign now?",
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ headline, intro }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Failed to send campaign.");
      }

      setResult(data);
      setHeadline("");
      setIntro("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">Newsletter</h1>
      <p className="mt-1 text-sm text-brand-600">
        Compose and send a branded campaign to every customer who hasn&apos;t unsubscribed.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 max-w-xl space-y-4 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm"
      >
        <div>
          <label className={labelClass}>Headline</label>
          <input
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            required
            placeholder="Where will your next trip take you?"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Intro</label>
          <textarea
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            required
            rows={4}
            placeholder="New routes, fresh package deals, and real-time pricing across flights, hotels, and more."
            className={inputClass}
          />
        </div>

        <p className="flex items-start gap-2 rounded-lg bg-brand-50 px-3 py-2.5 text-xs text-brand-600">
          <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Sent using the Newsletter template&apos;s existing destination highlights and Vision To
          The World branding. Every recipient gets a personal unsubscribe link.
        </p>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        {result && (
          <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
            Sent to {result.successCount} of {result.recipientCount} recipients
            {result.failureCount > 0 ? ` (${result.failureCount} failed)` : ""}.
          </p>
        )}

        <Button type="submit" disabled={loading} className="w-fit">
          <Send className="h-4 w-4" />
          {loading ? "Sending..." : "Send campaign"}
        </Button>
      </form>
    </div>
  );
}

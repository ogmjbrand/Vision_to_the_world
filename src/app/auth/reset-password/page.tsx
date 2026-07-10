"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import AuthShell from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const inputClass =
  "w-full rounded-lg border border-brand-200 bg-white px-3.5 py-2.5 text-sm text-brand-950 placeholder:text-brand-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";
const labelClass = "mb-1 block text-xs font-semibold text-brand-600";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!isSupabaseConfigured) {
      setError(
        "Authentication is not configured yet. Please contact the site administrator.",
      );
      return;
    }

    setLoading(true);

    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "");

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/auth/update-password`
            : undefined,
      },
    );

    setLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSent(true);
  }

  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll email you a link to reset your password."
      footer={
        <Link href="/auth/login" className="font-semibold text-brand-900">
          Back to log in
        </Link>
      }
    >
      {sent ? (
        <p className="rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-700">
          If an account exists for that email, a reset link is on its way.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className={labelClass}>Email address</label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            <Mail className="h-4 w-4" />
            {loading ? "Sending link..." : "Send reset link"}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}

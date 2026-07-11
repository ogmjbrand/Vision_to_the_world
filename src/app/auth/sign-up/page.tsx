"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import AuthShell from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const inputClass =
  "w-full rounded-xl border border-brand-200 bg-white px-3.5 py-2.5 text-sm text-brand-950 placeholder:text-brand-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";
const labelClass = "mb-1 block text-xs font-semibold text-brand-600";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
    const fullName = String(data.get("fullName") ?? "");
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <AuthShell
        title="Check your inbox"
        subtitle="We've sent a confirmation link to your email."
        footer={
          <Link href="/auth/login" className="font-semibold text-brand-900">
            Back to log in
          </Link>
        }
      >
        <p className="rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-700">
          Confirm your email address to activate your Vision To The World
          account and start booking.
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Sign up to search, book, and manage your trips."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-brand-900">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className={labelClass}>Full name</label>
          <input
            name="fullName"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Jane Traveler"
          />
        </div>
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
        <div>
          <label className={labelClass}>Password</label>
          <input
            type="password"
            name="password"
            required
            minLength={8}
            autoComplete="new-password"
            className={inputClass}
            placeholder="At least 8 characters"
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          <UserPlus className="h-4 w-4" />
          {loading ? "Creating account..." : "Create account"}
        </Button>

        <p className="text-center text-xs text-brand-500">
          By signing up, you agree to our Terms of Service and Privacy
          Policy.
        </p>
      </form>
    </AuthShell>
  );
}

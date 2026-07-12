"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn, Mail } from "lucide-react";
import AuthShell from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const inputClass =
  "w-full rounded-xl border border-brand-200 bg-white px-3.5 py-2.5 text-sm text-brand-950 placeholder:text-brand-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200";
const labelClass = "mb-1 block text-xs font-semibold text-brand-600";

function LoginForm() {
  const [mode, setMode] = useState<"password" | "magic-link">("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const redirectTo = next && next.startsWith("/") ? next : "/dashboard";

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

    if (mode === "magic-link") {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}/auth/confirm?next=${encodeURIComponent(redirectTo)}`
              : undefined,
        },
      });

      setLoading(false);

      if (otpError) {
        setError(otpError.message);
        return;
      }

      setMagicLinkSent(true);
      return;
    }

    const password = String(data.get("password") ?? "");
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  if (magicLinkSent) {
    return (
      <AuthShell
        title="Check your inbox"
        subtitle="We've sent you a one-click sign-in link."
        footer={
          <button
            type="button"
            onClick={() => setMagicLinkSent(false)}
            className="font-semibold text-brand-900"
          >
            Back to login
          </button>
        }
      >
        <p className="rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-700">
          Click the link in the email to sign in — it expires shortly, so use it soon.
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to manage your bookings and trips."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/auth/sign-up" className="font-semibold text-brand-900">
            Sign up
          </Link>
        </>
      }
    >
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

        {mode === "password" && (
          <div>
            <div className="flex items-center justify-between">
              <label className={labelClass}>Password</label>
              <Link href="/auth/reset-password" className="text-xs font-medium text-brand-600">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className={inputClass}
              placeholder="••••••••"
            />
          </div>
        )}

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {mode === "password" ? <LogIn className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
          {loading
            ? mode === "password"
              ? "Logging in..."
              : "Sending link..."
            : mode === "password"
              ? "Log in"
              : "Send magic link"}
        </Button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "password" ? "magic-link" : "password");
            setError(null);
          }}
          className="text-center text-xs font-semibold text-brand-600 hover:text-brand-900"
        >
          {mode === "password" ? "Use a magic link instead" : "Use a password instead"}
        </button>
      </form>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

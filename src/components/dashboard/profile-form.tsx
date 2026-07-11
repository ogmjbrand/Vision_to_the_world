"use client";

import { useState, type FormEvent } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const inputClass =
  "w-full rounded-xl border border-brand-200 bg-white px-3.5 py-2.5 text-sm text-brand-950 placeholder:text-brand-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 disabled:bg-brand-50 disabled:text-brand-500";
const labelClass = "mb-1 block text-xs font-semibold text-brand-600";

export default function ProfileForm({
  userId,
  email,
  fullName,
  phone,
}: {
  userId?: string;
  email?: string;
  fullName?: string;
  phone?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);

    if (!isSupabaseConfigured || !userId) {
      setMessage("Profile changes require Supabase to be configured.");
      return;
    }

    setLoading(true);

    const data = new FormData(e.currentTarget);
    const newFullName = String(data.get("fullName") ?? "");
    const newPhone = String(data.get("phone") ?? "");
    const supabase = createClient();

    const [{ error: authError }, { error: profileError }] = await Promise.all([
      supabase.auth.updateUser({ data: { full_name: newFullName, phone: newPhone } }),
      supabase
        .from("profiles")
        .update({ full_name: newFullName, phone: newPhone, updated_at: new Date().toISOString() })
        .eq("id", userId),
    ]);

    setLoading(false);
    setMessage(
      authError?.message ?? profileError?.message ?? "Profile updated successfully.",
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-lg gap-4">
      <div>
        <label className={labelClass}>Full name</label>
        <input
          name="fullName"
          defaultValue={fullName}
          placeholder="Your full name"
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Email address</label>
        <input value={email ?? ""} disabled className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Phone number</label>
        <input
          name="phone"
          defaultValue={phone}
          placeholder="+1 555 000 0000"
          className={inputClass}
        />
      </div>

      {message && (
        <p className="rounded-lg bg-brand-50 px-3 py-2 text-sm text-brand-700">
          {message}
        </p>
      )}

      <Button type="submit" disabled={loading} className="w-fit">
        <Save className="h-4 w-4" />
        {loading ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}

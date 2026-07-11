import type { Metadata } from "next";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import ProfileForm from "@/components/dashboard/profile-form";

export const metadata: Metadata = { title: "My Profile" };

export default async function ProfilePage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  const profile =
    supabase && user
      ? (await supabase.from("profiles").select("full_name, phone").eq("id", user.id).maybeSingle())
          .data
      : null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">My Profile</h1>
      <p className="mt-1 text-sm text-brand-600">
        Keep your traveler information up to date for faster checkout.
      </p>

      <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
        <ProfileForm
          userId={user?.id}
          email={user?.email}
          fullName={profile?.full_name ?? (user?.user_metadata?.full_name as string | undefined)}
          phone={profile?.phone ?? (user?.user_metadata?.phone as string | undefined)}
        />
      </div>
    </div>
  );
}

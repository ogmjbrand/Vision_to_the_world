import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/supabase/server";
import ProfileForm from "@/components/dashboard/profile-form";

export const metadata: Metadata = { title: "My Profile" };

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">My Profile</h1>
      <p className="mt-1 text-sm text-brand-600">
        Keep your traveler information up to date for faster checkout.
      </p>

      <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
        <ProfileForm
          email={user?.email}
          fullName={user?.user_metadata?.full_name as string | undefined}
          phone={user?.user_metadata?.phone as string | undefined}
        />
      </div>
    </div>
  );
}

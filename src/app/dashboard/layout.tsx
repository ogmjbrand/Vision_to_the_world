import { getCurrentUser } from "@/lib/supabase/server";
import DashboardSidebar from "@/components/dashboard/sidebar";
import AppTopbar from "@/components/dashboard/app-topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <AppTopbar />
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col sm:flex-row">
        <DashboardSidebar email={user?.email} />
        <div className="flex-1 bg-brand-50/40 p-4 sm:p-8">
          {!user && (
            <div className="mb-6 rounded-lg border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-accent-800">
              Demo mode — connect Supabase credentials to enable real
              accounts. Showing sample data below.
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

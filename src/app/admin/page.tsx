import type { Metadata } from "next";
import { Wallet, CalendarCheck, Users, LifeBuoy } from "lucide-react";
import StatCard from "@/components/dashboard/stat-card";
import StatusBadge from "@/components/dashboard/status-badge";
import { analyticsSummary, mockAdminBookings } from "@/lib/data/admin";
import { formatCurrency } from "@/lib/utils";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { getAdminStats, getAllBookings, toAdminDisplayBooking } from "@/lib/supabase/bookings";

export const metadata: Metadata = { title: "Admin Overview" };

export default async function AdminOverviewPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  const [stats, bookingsResult] =
    supabase && user
      ? await Promise.all([getAdminStats(supabase), getAllBookings(supabase, 5)])
      : [null, { data: null, error: null }];

  const isReal = !!stats;
  const bookings = isReal && bookingsResult.data
    ? bookingsResult.data.map(toAdminDisplayBooking)
    : mockAdminBookings;

  const displayStats = stats ?? {
    totalRevenue: analyticsSummary.totalRevenue,
    totalBookings: analyticsSummary.totalBookings,
    activeCustomers: analyticsSummary.activeCustomers,
    openTickets: analyticsSummary.supportTickets,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">Admin Overview</h1>
      <p className="mt-1 text-sm text-brand-600">
        Monitor bookings, customers, and platform performance at a glance.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Wallet} label="Total revenue" value={formatCurrency(displayStats.totalRevenue)} />
        <StatCard icon={CalendarCheck} label="Total bookings" value={String(displayStats.totalBookings)} />
        <StatCard icon={Users} label="Active customers" value={String(displayStats.activeCustomers)} />
        <StatCard icon={LifeBuoy} label="Open support tickets" value={String(displayStats.openTickets)} />
      </div>

      <div className="mt-8 rounded-2xl border border-brand-100 bg-white shadow-sm">
        <div className="border-b border-brand-100 p-5">
          <h2 className="text-base font-semibold text-brand-950">
            Recent bookings
          </h2>
        </div>
        {bookings.length === 0 ? (
          <p className="p-5 text-sm text-brand-600">No bookings yet.</p>
        ) : (
          <div className="divide-y divide-brand-100">
            {bookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between gap-4 p-5">
                <div>
                  <p className="text-sm font-semibold text-brand-950">
                    {b.customer} · {b.type}
                  </p>
                  <p className="mt-0.5 text-xs text-brand-500">
                    {b.date} · {b.id}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <StatusBadge status={b.status} />
                  <p className="w-20 text-right text-sm font-semibold text-brand-950">
                    {formatCurrency(b.amount, b.currency)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {!isReal && (
        <p className="mt-4 text-center text-xs text-brand-400">
          Showing sample data — you need admin access (profiles.role =
          &apos;admin&apos;) to see live platform data.
        </p>
      )}
    </div>
  );
}

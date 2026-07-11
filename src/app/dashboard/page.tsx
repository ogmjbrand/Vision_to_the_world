import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, Plane, Wallet, ArrowRight } from "lucide-react";
import StatCard from "@/components/dashboard/stat-card";
import StatusBadge from "@/components/dashboard/status-badge";
import { mockBookings } from "@/lib/data/dashboard";
import { formatCurrency } from "@/lib/utils";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { getUserBookings, withFallback, toDisplayBooking } from "@/lib/supabase/bookings";

export const metadata: Metadata = { title: "My Dashboard" };

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  const { data: rawBookings, usedFallback } =
    supabase && user
      ? await withFallback(getUserBookings(supabase, user.id), [])
      : { data: [], usedFallback: false };

  const bookings = user && !usedFallback ? rawBookings.map(toDisplayBooking) : mockBookings;

  const upcomingCount = bookings.filter((b) => b.status === "Upcoming").length;
  const totalSpent = bookings.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">Welcome back</h1>
      <p className="mt-1 text-sm text-brand-600">
        Here&apos;s a snapshot of your travel activity.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={CalendarCheck} label="Upcoming trips" value={String(upcomingCount)} />
        <StatCard icon={Plane} label="Total bookings" value={String(bookings.length)} />
        <StatCard icon={Wallet} label="Total spent" value={formatCurrency(totalSpent)} />
      </div>

      <div className="mt-8 rounded-2xl border border-brand-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-brand-100 p-5">
          <h2 className="text-base font-semibold text-brand-950">
            Recent bookings
          </h2>
          <Link
            href="/dashboard/bookings"
            className="flex items-center gap-1 text-sm font-semibold text-brand-700"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {bookings.length === 0 ? (
          <p className="p-5 text-sm text-brand-600">
            No bookings yet — start a search and book your first trip.
          </p>
        ) : (
          <div className="divide-y divide-brand-100">
            {bookings.slice(0, 4).map((b) => (
              <div key={b.id} className="flex items-center justify-between gap-4 p-5">
                <div>
                  <p className="text-sm font-semibold text-brand-950">{b.title}</p>
                  <p className="mt-0.5 text-xs text-brand-500">
                    {b.type} · {b.date} · {b.id}
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

      {!user && (
        <p className="mt-4 text-center text-xs text-brand-400">
          Showing sample data — log in to see your real bookings.
        </p>
      )}
    </div>
  );
}

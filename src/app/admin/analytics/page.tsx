import type { Metadata } from "next";
import StatCard from "@/components/dashboard/stat-card";
import { Wallet, CalendarCheck, Users, TrendingUp } from "lucide-react";
import { analyticsSummary } from "@/lib/data/admin";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin · Analytics" };

export default function AdminAnalyticsPage() {
  const max = Math.max(...analyticsSummary.monthlyRevenue.map((m) => m.value));

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">Analytics</h1>
      <p className="mt-1 text-sm text-brand-600">
        Business performance across bookings, revenue, and customers.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Wallet} label="Total revenue" value={formatCurrency(analyticsSummary.totalRevenue)} />
        <StatCard icon={CalendarCheck} label="Total bookings" value={String(analyticsSummary.totalBookings)} />
        <StatCard icon={Users} label="Active customers" value={String(analyticsSummary.activeCustomers)} />
        <StatCard icon={TrendingUp} label="Avg. booking value" value={formatCurrency(Math.round(analyticsSummary.totalRevenue / analyticsSummary.totalBookings))} />
      </div>

      <div className="mt-8 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-brand-950">
          Monthly revenue
        </h2>
        <div className="mt-6 flex h-56 items-end gap-4">
          {analyticsSummary.monthlyRevenue.map((m) => (
            <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-full w-full items-end">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-brand-700 to-brand-400"
                  style={{ height: `${(m.value / max) * 100}%` }}
                  title={formatCurrency(m.value)}
                />
              </div>
              <span className="text-xs font-medium text-brand-500">{m.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

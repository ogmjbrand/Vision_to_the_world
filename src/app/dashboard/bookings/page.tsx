import type { Metadata } from "next";
import StatusBadge from "@/components/dashboard/status-badge";
import { mockBookings } from "@/lib/data/dashboard";
import { formatCurrency } from "@/lib/utils";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { getUserBookings, withFallback, toDisplayBooking } from "@/lib/supabase/bookings";

export const metadata: Metadata = { title: "My Bookings" };

export default async function BookingsPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  const { data: rawBookings, usedFallback } =
    supabase && user
      ? await withFallback(getUserBookings(supabase, user.id), [])
      : { data: [], usedFallback: false };

  const bookings = user && !usedFallback ? rawBookings.map(toDisplayBooking) : mockBookings;

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">My Bookings</h1>
      <p className="mt-1 text-sm text-brand-600">
        Track upcoming trips and review past bookings.
      </p>

      {bookings.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-brand-200 bg-brand-50/60 p-10 text-center">
          <p className="text-brand-700">
            No bookings yet — start a search and book your first trip.
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-50 text-xs uppercase tracking-wide text-brand-500">
              <tr>
                <th className="px-5 py-3">Booking</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className="px-5 py-4">
                    <p className="font-medium text-brand-950">{b.title}</p>
                    <p className="text-xs text-brand-500">{b.id}</p>
                  </td>
                  <td className="px-5 py-4 text-brand-700">{b.type}</td>
                  <td className="px-5 py-4 text-brand-700">{b.date}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="px-5 py-4 text-right font-semibold text-brand-950">
                    {formatCurrency(b.amount, b.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import { CreditCard } from "lucide-react";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { getUserPayments, withFallback } from "@/lib/supabase/bookings";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Payments" };

const gateways = ["Stripe", "PayPal", "Cash App"];

const statusStyles: Record<string, string> = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-accent-100 text-accent-700",
  refunded: "bg-brand-100 text-brand-700",
  failed: "bg-red-100 text-red-700",
};

const gatewayLabels: Record<string, string> = {
  stripe: "Stripe",
  paypal: "PayPal",
  cashapp: "Cash App",
};

export default async function PaymentsPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  const { data: payments, usedFallback } =
    supabase && user
      ? await withFallback(getUserPayments(supabase, user.id), [])
      : { data: [], usedFallback: true };

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">Payments</h1>
      <p className="mt-1 text-sm text-brand-600">
        Your payment history across every booking.
      </p>

      {payments.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-brand-200 bg-white p-8 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <CreditCard className="h-6 w-6" />
          </span>
          <p className="mt-3 text-sm text-brand-600">
            {usedFallback
              ? "You have no payments yet."
              : "No payments recorded yet — they'll show up here after checkout."}
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-50 text-xs uppercase tracking-wide text-brand-500">
              <tr>
                <th className="px-5 py-3">Booking</th>
                <th className="px-5 py-3">Gateway</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="px-5 py-4 font-medium text-brand-950">
                    {p.booking?.title ?? p.booking_id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="px-5 py-4 text-brand-700">
                    {gatewayLabels[p.gateway] ?? p.gateway}
                  </td>
                  <td className="px-5 py-4 text-brand-700">
                    {p.created_at.slice(0, 10)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
                        statusStyles[p.status] ?? "bg-brand-100 text-brand-700",
                      )}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right font-semibold text-brand-950">
                    {formatCurrency(Number(p.amount), p.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-sm font-semibold text-brand-900">
          Supported payment gateways
        </h2>
        <div className="mt-3 flex flex-wrap gap-3">
          {gateways.map((g) => (
            <span
              key={g}
              className="rounded-lg border border-brand-200 bg-white px-4 py-2 text-sm font-medium text-brand-800"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

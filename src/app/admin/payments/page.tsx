import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { mockPayments } from "@/lib/data/admin";
import { formatCurrency } from "@/lib/utils";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { getAllPayments, toAdminDisplayPayment, withFallback } from "@/lib/supabase/bookings";

export const metadata: Metadata = { title: "Admin · Payments" };

const statusStyles: Record<string, string> = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-accent-100 text-accent-700",
  Refunded: "bg-brand-100 text-brand-700",
  Failed: "bg-red-100 text-red-700",
};

export default async function AdminPaymentsPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  const { data: rawPayments, usedFallback } =
    supabase && user
      ? await withFallback(getAllPayments(supabase, 100), [])
      : { data: [], usedFallback: true };

  const payments = usedFallback ? mockPayments : rawPayments.map(toAdminDisplayPayment);

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">Payments</h1>
      <p className="mt-1 text-sm text-brand-600">
        Track transactions across all connected payment gateways.
      </p>
      <p className="mt-3 rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-600">
        To issue a refund for a Stripe payment, process it from the{" "}
        <a
          href="https://dashboard.stripe.com/payments"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-900 underline"
        >
          Stripe Dashboard
        </a>{" "}
        — this table updates automatically within seconds once Stripe confirms the refund. PayPal
        and Cash App refunds are processed manually in each provider&apos;s own dashboard.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-50 text-xs uppercase tracking-wide text-brand-500">
            <tr>
              <th className="px-5 py-3">Transaction</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Gateway</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {payments.map((p) => (
              <tr key={p.id}>
                <td className="px-5 py-4 font-medium text-brand-950">{p.id}</td>
                <td className="px-5 py-4 text-brand-700">{p.customer}</td>
                <td className="px-5 py-4 text-brand-700">{p.gateway}</td>
                <td className="px-5 py-4 text-brand-700">{p.date}</td>
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
                  {formatCurrency(p.amount, p.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { mockPayments } from "@/lib/data/admin";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin · Payments" };

const statusStyles: Record<string, string> = {
  Paid: "bg-green-100 text-green-700",
  Refunded: "bg-brand-100 text-brand-700",
  Failed: "bg-red-100 text-red-700",
};

export default function AdminPaymentsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">Payments</h1>
      <p className="mt-1 text-sm text-brand-600">
        Track transactions across all connected payment gateways.
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
            {mockPayments.map((p) => (
              <tr key={p.id}>
                <td className="px-5 py-4 font-medium text-brand-950">{p.id}</td>
                <td className="px-5 py-4 text-brand-700">{p.customer}</td>
                <td className="px-5 py-4 text-brand-700">{p.gateway}</td>
                <td className="px-5 py-4 text-brand-700">{p.date}</td>
                <td className="px-5 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
                      statusStyles[p.status],
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

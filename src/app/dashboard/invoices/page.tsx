import type { Metadata } from "next";
import { Download } from "lucide-react";
import { mockInvoices } from "@/lib/data/dashboard";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Invoices" };

export default function InvoicesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">Invoices</h1>
      <p className="mt-1 text-sm text-brand-600">
        Download invoices for your bookings.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-50 text-xs uppercase tracking-wide text-brand-500">
            <tr>
              <th className="px-5 py-3">Invoice</th>
              <th className="px-5 py-3">Booking</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3 text-right">Amount</th>
              <th className="px-5 py-3 text-right">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {mockInvoices.map((inv) => (
              <tr key={inv.id}>
                <td className="px-5 py-4 font-medium text-brand-950">{inv.id}</td>
                <td className="px-5 py-4 text-brand-700">{inv.bookingId}</td>
                <td className="px-5 py-4 text-brand-700">{inv.date}</td>
                <td className="px-5 py-4 text-right font-semibold text-brand-950">
                  {formatCurrency(inv.amount, inv.currency)}
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-950"
                    title="Invoice download will be available once billing is connected"
                  >
                    <Download className="h-4 w-4" />
                    PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

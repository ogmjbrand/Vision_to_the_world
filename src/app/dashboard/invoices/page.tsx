import type { Metadata } from "next";
import { Download } from "lucide-react";
import { mockInvoices } from "@/lib/data/dashboard";
import { formatCurrency } from "@/lib/utils";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { getUserInvoices, withFallback } from "@/lib/supabase/bookings";

export const metadata: Metadata = { title: "Invoices" };

export default async function InvoicesPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  const { data: rawInvoices, usedFallback } =
    supabase && user
      ? await withFallback(getUserInvoices(supabase, user.id), [])
      : { data: [], usedFallback: false };

  const invoices =
    user && !usedFallback
      ? rawInvoices.map((inv) => ({
          id: inv.invoice_number,
          bookingTitle: inv.booking?.title ?? inv.booking_id.slice(0, 8).toUpperCase(),
          date: inv.issued_at.slice(0, 10),
          amount: Number(inv.amount),
          currency: inv.currency,
        }))
      : mockInvoices.map((inv) => ({
          id: inv.id,
          bookingTitle: inv.bookingId,
          date: inv.date,
          amount: inv.amount,
          currency: inv.currency,
        }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">Invoices</h1>
      <p className="mt-1 text-sm text-brand-600">
        Download invoices for your bookings.
      </p>

      {invoices.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-brand-200 bg-brand-50/60 p-10 text-center">
          <p className="text-brand-700">No invoices yet.</p>
        </div>
      ) : (
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
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="px-5 py-4 font-medium text-brand-950">{inv.id}</td>
                  <td className="px-5 py-4 text-brand-700">{inv.bookingTitle}</td>
                  <td className="px-5 py-4 text-brand-700">{inv.date}</td>
                  <td className="px-5 py-4 text-right font-semibold text-brand-950">
                    {formatCurrency(inv.amount, inv.currency)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-950"
                      title="PDF invoice generation is not yet wired up"
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
      )}
    </div>
  );
}

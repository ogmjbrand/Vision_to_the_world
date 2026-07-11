import type { Metadata } from "next";
import { mockCustomers } from "@/lib/data/admin";
import { formatCurrency } from "@/lib/utils";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { getCustomerSummary, toDisplayCustomer, withFallback } from "@/lib/supabase/bookings";

export const metadata: Metadata = { title: "Admin · Customers" };

export default async function AdminCustomersPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  const { data: rawCustomers, usedFallback } =
    supabase && user
      ? await withFallback(getCustomerSummary(supabase), [])
      : { data: [], usedFallback: true };

  const customers = usedFallback ? mockCustomers : rawCustomers.map(toDisplayCustomer);

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">Customers</h1>
      <p className="mt-1 text-sm text-brand-600">
        Manage traveler accounts and view booking history.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-50 text-xs uppercase tracking-wide text-brand-500">
            <tr>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Bookings</th>
              <th className="px-5 py-3">Joined</th>
              <th className="px-5 py-3 text-right">Total spent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {customers.map((c) => (
              <tr key={c.id}>
                <td className="px-5 py-4">
                  <p className="font-medium text-brand-950">{c.name}</p>
                  <p className="text-xs text-brand-500">{c.id}</p>
                </td>
                <td className="px-5 py-4 text-brand-700">{c.email}</td>
                <td className="px-5 py-4 text-brand-700">{c.bookings}</td>
                <td className="px-5 py-4 text-brand-700">{c.joined}</td>
                <td className="px-5 py-4 text-right font-semibold text-brand-950">
                  {formatCurrency(c.totalSpent)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

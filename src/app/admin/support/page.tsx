import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { mockTickets } from "@/lib/data/admin";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { getSupportTickets, toDisplayTicket, withFallback } from "@/lib/supabase/bookings";

export const metadata: Metadata = { title: "Admin · Support" };

const priorityStyles: Record<string, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-accent-100 text-accent-700",
  Low: "bg-brand-100 text-brand-700",
};

const statusStyles: Record<string, string> = {
  Open: "bg-red-100 text-red-700",
  "In Progress": "bg-accent-100 text-accent-700",
  Resolved: "bg-green-100 text-green-700",
};

export default async function AdminSupportPage() {
  const user = await getCurrentUser();
  const supabase = await createClient();

  const { data: rawTickets, usedFallback } =
    supabase && user
      ? await withFallback(getSupportTickets(supabase, 100), [])
      : { data: [], usedFallback: true };

  const tickets = usedFallback ? mockTickets : rawTickets.map(toDisplayTicket);

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-950">Support Requests</h1>
      <p className="mt-1 text-sm text-brand-600">
        Handle customer support tickets and travel assistance requests.
      </p>

      {tickets.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-brand-200 bg-brand-50/60 p-10 text-center">
          <p className="text-brand-700">No support requests yet.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {tickets.map((t) => (
            <div
              key={t.id}
              className="flex flex-col gap-3 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-brand-950">{t.subject}</p>
                <p className="mt-0.5 text-xs text-brand-500">
                  {t.customer} · {t.id}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-semibold",
                    priorityStyles[t.priority] ?? "bg-brand-100 text-brand-700",
                  )}
                >
                  {t.priority} priority
                </span>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-semibold",
                    statusStyles[t.status] ?? "bg-brand-100 text-brand-700",
                  )}
                >
                  {t.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

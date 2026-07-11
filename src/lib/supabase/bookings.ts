import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  Database,
  BookingStatus,
  PaymentGateway,
  PaymentStatus,
} from "@/lib/supabase/database.types";
import type { CheckoutItem } from "@/lib/checkout";
import { computeOrderTotals } from "@/lib/checkout";
import type { Booking as DisplayBooking } from "@/lib/data/dashboard";
import type { AdminBooking, AdminPayment, Customer, SupportTicket } from "@/lib/data/admin";

type TypedClient = SupabaseClient<Database>;
type BookingRow = Database["public"]["Tables"]["bookings"]["Row"];
type InvoiceRow = Database["public"]["Tables"]["invoices"]["Row"];
type PaymentRow = Database["public"]["Tables"]["payments"]["Row"];

const STATUS_LABELS: Record<string, string> = {
  upcoming: "Upcoming",
  completed: "Completed",
  cancelled: "Cancelled",
  pending_confirmation: "Pending",
};

export function formatBookingStatus(status: string): string {
  return STATUS_LABELS[status] ?? status;
}

export function toDisplayBooking(row: BookingRow): DisplayBooking {
  return {
    id: row.id.slice(0, 8).toUpperCase(),
    type: row.type,
    title: row.title,
    date: (row.travel_date ?? row.created_at).slice(0, 10),
    status: formatBookingStatus(row.status),
    amount: Number(row.total),
    currency: row.currency,
  };
}

/**
 * Inserts a booking + payment + invoice for a completed (or pending, for
 * Cash App) purchase. Used from the Stripe success page (server) and the
 * PayPal / Cash App checkout components (browser) — both hand in a
 * Supabase client authenticated as the current user, so RLS's
 * `auth.uid() = user_id` check on insert is satisfied either way.
 */
export async function recordPaidBooking(
  supabase: TypedClient,
  params: {
    userId: string;
    item: CheckoutItem;
    gateway: PaymentGateway;
    gatewayReference?: string;
    paymentStatus?: PaymentStatus;
    bookingStatus?: BookingStatus;
    stripeSessionId?: string;
  },
) {
  const { subtotal, serviceFee, total } = computeOrderTotals(params.item.price);

  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .insert({
      user_id: params.userId,
      type: params.item.type,
      title: params.item.title,
      subtotal,
      service_fee: serviceFee,
      total,
      currency: params.item.currency,
      status: params.bookingStatus ?? "upcoming",
      stripe_session_id: params.stripeSessionId,
    })
    .select()
    .single();

  if (bookingError || !booking) {
    return { booking: null, error: bookingError };
  }

  await supabase.from("payments").insert({
    booking_id: booking.id,
    user_id: params.userId,
    gateway: params.gateway,
    gateway_reference: params.gatewayReference,
    amount: total,
    currency: params.item.currency,
    status: params.paymentStatus ?? "paid",
  });

  await supabase.from("invoices").insert({
    booking_id: booking.id,
    user_id: params.userId,
    invoice_number: `INV-${booking.id.slice(0, 8).toUpperCase()}`,
    amount: total,
    currency: params.item.currency,
  });

  return { booking, error: null };
}

/** Finds a previously recorded booking for a Stripe session, if any (avoids double-recording on page refresh). */
export async function findBookingByStripeSession(
  supabase: TypedClient,
  stripeSessionId: string,
) {
  const { data } = await supabase
    .from("bookings")
    .select("*")
    .eq("stripe_session_id", stripeSessionId)
    .maybeSingle();
  return data;
}

/** Runs a Supabase query and falls back to sample data if it errors (e.g. migration not run yet) or is empty-by-error. */
export async function withFallback<T>(
  query: PromiseLike<{ data: T | null; error: unknown }>,
  fallback: T,
): Promise<{ data: T; usedFallback: boolean }> {
  const { data, error } = await query;
  if (error || data === null) {
    return { data: fallback, usedFallback: true };
  }
  return { data, usedFallback: false };
}

export async function getUserBookings(supabase: TypedClient, userId: string) {
  return supabase
    .from("bookings")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
}

export type InvoiceWithBooking = InvoiceRow & {
  booking: { title: string; type: string } | null;
};

export async function getUserInvoices(supabase: TypedClient, userId: string) {
  const result = await supabase
    .from("invoices")
    .select("*, booking:bookings(title, type)")
    .eq("user_id", userId)
    .order("issued_at", { ascending: false });
  return result as unknown as { data: InvoiceWithBooking[] | null; error: typeof result.error };
}

export type PaymentWithBooking = PaymentRow & {
  booking: { title: string; type: string } | null;
};

export async function getUserPayments(supabase: TypedClient, userId: string) {
  const result = await supabase
    .from("payments")
    .select("*, booking:bookings(title, type)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return result as unknown as { data: PaymentWithBooking[] | null; error: typeof result.error };
}

export type BookingWithProfile = BookingRow & {
  profile: { full_name: string | null; email: string | null } | null;
};

/** Admin-scoped: RLS allows an admin session to see every row, not just their own. */
export async function getAllBookings(supabase: TypedClient, limit = 50) {
  const result = await supabase
    .from("bookings")
    .select("*, profile:profiles(full_name, email)")
    .order("created_at", { ascending: false })
    .limit(limit);
  return result as unknown as { data: BookingWithProfile[] | null; error: typeof result.error };
}

export type PaymentWithProfile = PaymentRow & {
  profile: { full_name: string | null; email: string | null } | null;
};

export async function getAllPayments(supabase: TypedClient, limit = 50) {
  const result = await supabase
    .from("payments")
    .select("*, profile:profiles(full_name, email)")
    .order("created_at", { ascending: false })
    .limit(limit);
  return result as unknown as { data: PaymentWithProfile[] | null; error: typeof result.error };
}

export async function getCustomerSummary(supabase: TypedClient) {
  return supabase
    .from("customer_summary")
    .select("*")
    .order("joined_at", { ascending: false });
}

export async function getSupportTickets(supabase: TypedClient, limit = 50) {
  return supabase
    .from("support_tickets")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
}

export type AdminStats = {
  totalRevenue: number;
  totalBookings: number;
  activeCustomers: number;
  openTickets: number;
};

/** Admin-only aggregate stats. Requires an admin-role session (RLS enforces this). */
export async function getAdminStats(supabase: TypedClient): Promise<AdminStats | null> {
  const [bookings, profilesCount, openTicketsCount] = await Promise.all([
    supabase.from("bookings").select("total, status"),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("support_tickets").select("*", { count: "exact", head: true }).eq("status", "open"),
  ]);

  if (bookings.error || profilesCount.error || openTicketsCount.error) {
    return null;
  }

  const totalRevenue = (bookings.data ?? [])
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + Number(b.total), 0);

  return {
    totalRevenue,
    totalBookings: bookings.data?.length ?? 0,
    activeCustomers: profilesCount.count ?? 0,
    openTickets: openTicketsCount.count ?? 0,
  };
}

/** Revenue for each of the last `months` calendar months, oldest first. */
export async function getMonthlyRevenue(supabase: TypedClient, months = 6) {
  const since = new Date();
  since.setMonth(since.getMonth() - (months - 1));
  since.setDate(1);
  since.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("bookings")
    .select("total, created_at, status")
    .neq("status", "cancelled")
    .gte("created_at", since.toISOString());

  if (error) return null;

  const buckets = new Map<string, number>();
  const cursor = new Date(since);
  for (let i = 0; i < months; i++) {
    buckets.set(cursor.toLocaleString("en-US", { month: "short" }), 0);
    cursor.setMonth(cursor.getMonth() + 1);
  }

  for (const row of data ?? []) {
    const key = new Date(row.created_at).toLocaleString("en-US", { month: "short" });
    if (buckets.has(key)) {
      buckets.set(key, (buckets.get(key) ?? 0) + Number(row.total));
    }
  }

  return Array.from(buckets.entries()).map(([month, value]) => ({ month, value }));
}

// ---------------------------------------------------------------------------
// Admin display mappers — flatten a joined row into the shape the existing
// admin UI components expect (see src/lib/data/admin.ts).
// ---------------------------------------------------------------------------

function customerLabel(profile: { full_name: string | null; email: string | null } | null) {
  return profile?.full_name || profile?.email || "Unknown customer";
}

export function toAdminDisplayBooking(row: BookingWithProfile): AdminBooking {
  return {
    id: row.id.slice(0, 8).toUpperCase(),
    customer: customerLabel(row.profile),
    type: row.type,
    date: (row.travel_date ?? row.created_at).slice(0, 10),
    status: formatBookingStatus(row.status),
    amount: Number(row.total),
    currency: row.currency,
  };
}

export function toAdminDisplayPayment(row: PaymentWithProfile): AdminPayment {
  return {
    id: row.id.slice(0, 8).toUpperCase(),
    customer: customerLabel(row.profile),
    gateway: row.gateway === "cashapp" ? "Cash App" : row.gateway[0].toUpperCase() + row.gateway.slice(1),
    amount: Number(row.amount),
    currency: row.currency,
    status: row.status[0].toUpperCase() + row.status.slice(1),
    date: row.created_at.slice(0, 10),
  };
}

export function toDisplayCustomer(row: Database["public"]["Views"]["customer_summary"]["Row"]): Customer {
  return {
    id: (row.id ?? "").slice(0, 8).toUpperCase(),
    name: row.full_name || row.email || "Unknown customer",
    email: row.email ?? "",
    bookings: row.bookings_count ?? 0,
    totalSpent: Number(row.total_spent ?? 0),
    joined: (row.joined_at ?? "").slice(0, 10),
  };
}

export function toDisplayTicket(
  row: Database["public"]["Tables"]["support_tickets"]["Row"],
): SupportTicket {
  const priorityLabels: Record<string, string> = { low: "Low", medium: "Medium", high: "High" };
  const statusLabels: Record<string, string> = {
    open: "Open",
    in_progress: "In Progress",
    resolved: "Resolved",
  };
  return {
    id: row.id.slice(0, 8).toUpperCase(),
    customer: row.name,
    subject: row.subject,
    priority: priorityLabels[row.priority] ?? row.priority,
    status: statusLabels[row.status] ?? row.status,
  };
}

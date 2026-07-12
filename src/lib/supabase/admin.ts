import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

export const isSupabaseAdminConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

let adminClient: ReturnType<typeof createSupabaseClient<Database>> | null = null;

/**
 * Service-role client that bypasses RLS entirely. Only ever import this from
 * server-only code that isn't reachable from the browser (route handlers,
 * cron jobs) — never from a client component or anything bundled client-side.
 * Used where a request isn't scoped to a single user's session: the
 * trip-reminder cron (needs every user's upcoming bookings), the newsletter
 * sender (needs every opted-in profile), and the email_logs audit trail.
 */
export function createAdminClient() {
  if (!isSupabaseAdminConfigured) return null;
  if (!adminClient) {
    adminClient = createSupabaseClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } },
    );
  }
  return adminClient;
}

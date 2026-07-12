-- Vision To The World — email workflow support
-- Adds: welcome-email idempotency + newsletter opt-in on profiles, an
-- audit log for every outgoing email, and an index to make the trip-reminder
-- cron's daily lookups on bookings.travel_date cheap.
-- Run this in the Supabase SQL Editor (or `supabase db push`) after the
-- initial schema migration.

-- ---------------------------------------------------------------------------
-- profiles: welcome-email idempotency + newsletter audience
-- ---------------------------------------------------------------------------
alter table public.profiles
  add column welcome_email_sent_at timestamptz,
  add column newsletter_opt_in boolean not null default true;

-- ---------------------------------------------------------------------------
-- bookings: index travel_date for the trip-reminder cron's daily scan
-- ---------------------------------------------------------------------------
create index if not exists bookings_travel_date_idx on public.bookings (travel_date)
  where travel_date is not null;

-- Tracks which trip-reminder milestones (7-day / 24-hour) have already been
-- sent for a booking, so a cron re-run (retry, redeploy, overlapping
-- invocation) can never double-send the same reminder.
alter table public.bookings
  add column reminder_7d_sent_at timestamptz,
  add column reminder_24h_sent_at timestamptz;

-- ---------------------------------------------------------------------------
-- email_logs — audit trail for every outgoing email (all types)
-- ---------------------------------------------------------------------------
create table public.email_logs (
  id uuid primary key default gen_random_uuid(),
  type text not null check (
    type in (
      'welcome',
      'booking_confirmation',
      'invoice',
      'trip_reminder',
      'newsletter',
      'contact_notification',
      'contact_auto_reply'
    )
  ),
  recipient text not null,
  status text not null check (status in ('sent', 'failed')),
  provider_id text,
  error text,
  attempts integer not null default 1,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index email_logs_created_at_idx on public.email_logs (created_at desc);
create index email_logs_type_idx on public.email_logs (type);
create index email_logs_recipient_idx on public.email_logs (recipient);

alter table public.email_logs enable row level security;

-- Only admins can read the log from the app; all writes happen through the
-- service-role key (server-only routes and cron jobs), which bypasses RLS
-- entirely, so no insert policy is needed for anon/authenticated roles.
create policy "email_logs_select_admin" on public.email_logs
  for select using (public.is_admin());

-- ---------------------------------------------------------------------------
-- newsletter_campaigns — audit trail for admin-sent campaigns
-- ---------------------------------------------------------------------------
create table public.newsletter_campaigns (
  id uuid primary key default gen_random_uuid(),
  sent_by uuid references auth.users (id) on delete set null,
  headline text not null,
  intro text not null,
  recipient_count integer not null default 0,
  success_count integer not null default 0,
  failure_count integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.newsletter_campaigns enable row level security;

create policy "newsletter_campaigns_select_admin" on public.newsletter_campaigns
  for select using (public.is_admin());
create policy "newsletter_campaigns_insert_admin" on public.newsletter_campaigns
  for insert with check (public.is_admin());

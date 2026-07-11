-- Vision To The World — core schema
-- Run this in the Supabase SQL Editor (or `supabase db push` with the CLI)
-- for project nojjlnekwtfampxyfcmg.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_role_idx on public.profiles (role);

-- Auto-create a profile row whenever a new auth user is created.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, phone)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'phone'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- bookings
-- ---------------------------------------------------------------------------
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  type text not null,
  title text not null,
  status text not null default 'upcoming'
    check (status in ('upcoming', 'completed', 'cancelled', 'pending_confirmation')),
  subtotal numeric(10, 2) not null,
  service_fee numeric(10, 2) not null,
  total numeric(10, 2) not null,
  currency text not null default 'USD',
  travel_date date,
  stripe_session_id text unique,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index bookings_user_id_idx on public.bookings (user_id);
create index bookings_created_at_idx on public.bookings (created_at desc);

-- ---------------------------------------------------------------------------
-- payments
-- ---------------------------------------------------------------------------
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  gateway text not null check (gateway in ('stripe', 'paypal', 'cashapp')),
  gateway_reference text,
  amount numeric(10, 2) not null,
  currency text not null default 'USD',
  status text not null default 'paid'
    check (status in ('paid', 'pending', 'refunded', 'failed')),
  created_at timestamptz not null default now()
);

create index payments_user_id_idx on public.payments (user_id);
create index payments_booking_id_idx on public.payments (booking_id);

-- ---------------------------------------------------------------------------
-- invoices
-- ---------------------------------------------------------------------------
create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  invoice_number text not null,
  amount numeric(10, 2) not null,
  currency text not null default 'USD',
  issued_at timestamptz not null default now()
);

create index invoices_user_id_idx on public.invoices (user_id);
create index invoices_booking_id_idx on public.invoices (booking_id);

-- ---------------------------------------------------------------------------
-- support_tickets (contact form submissions)
-- ---------------------------------------------------------------------------
create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  name text not null,
  email text not null,
  subject text not null default 'general',
  message text not null,
  status text not null default 'open'
    check (status in ('open', 'in_progress', 'resolved')),
  priority text not null default 'medium'
    check (priority in ('low', 'medium', 'high')),
  created_at timestamptz not null default now()
);

create index support_tickets_user_id_idx on public.support_tickets (user_id);

-- ---------------------------------------------------------------------------
-- row level security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.bookings enable row level security;
alter table public.payments enable row level security;
alter table public.invoices enable row level security;
alter table public.support_tickets enable row level security;

create function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

-- profiles
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (auth.uid() = id or public.is_admin());
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- bookings
create policy "bookings_select_own_or_admin" on public.bookings
  for select using (auth.uid() = user_id or public.is_admin());
create policy "bookings_insert_own" on public.bookings
  for insert with check (auth.uid() = user_id);
create policy "bookings_update_admin" on public.bookings
  for update using (public.is_admin());

-- payments
create policy "payments_select_own_or_admin" on public.payments
  for select using (auth.uid() = user_id or public.is_admin());
create policy "payments_insert_own" on public.payments
  for insert with check (auth.uid() = user_id);

-- invoices
create policy "invoices_select_own_or_admin" on public.invoices
  for select using (auth.uid() = user_id or public.is_admin());
create policy "invoices_insert_own" on public.invoices
  for insert with check (auth.uid() = user_id);

-- support_tickets: anyone (including anonymous visitors) can submit; only
-- the submitting user or an admin can read/update them.
create policy "support_tickets_insert_any" on public.support_tickets
  for insert with check (true);
create policy "support_tickets_select_own_or_admin" on public.support_tickets
  for select using (auth.uid() = user_id or public.is_admin());
create policy "support_tickets_update_admin" on public.support_tickets
  for update using (public.is_admin());

-- ---------------------------------------------------------------------------
-- admin customer summary (respects the RLS of the querying user; only an
-- admin's session will see every customer's aggregates)
-- ---------------------------------------------------------------------------
create view public.customer_summary
with (security_invoker = true) as
select
  p.id,
  p.email,
  p.full_name,
  p.role,
  p.created_at as joined_at,
  coalesce(count(b.id), 0) as bookings_count,
  coalesce(sum(b.total), 0) as total_spent
from public.profiles p
left join public.bookings b on b.user_id = p.id
group by p.id;

-- ---------------------------------------------------------------------------
-- To make a user an admin, run (after they've signed up at least once):
--   update public.profiles set role = 'admin' where email = 'you@example.com';
-- ---------------------------------------------------------------------------

-- LegacyDock Supabase scaffold
-- Apply only after choosing the hosted auth model and project settings.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  plan text not null default 'free',
  telemetry_opt_in boolean not null default false,
  crash_reports_opt_in boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  nickname text not null,
  identifier text not null,
  firmware text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  device_id uuid references public.devices(id) on delete set null,
  summary text,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  device_id uuid references public.devices(id) on delete set null,
  report_type text not null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.compatibility_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  package_id text not null,
  ios_version text not null,
  status text not null,
  notes text not null default '',
  moderation_state text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.team_memberships (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now()
);

create table if not exists public.billing_customers (
  user_id uuid primary key references auth.users(id) on delete cascade,
  stripe_customer_id text unique,
  entitlement_state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.devices enable row level security;
alter table public.snapshots enable row level security;
alter table public.reports enable row level security;
alter table public.compatibility_submissions enable row level security;
alter table public.team_memberships enable row level security;
alter table public.billing_customers enable row level security;

create policy "profiles own row" on public.profiles
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "devices own rows" on public.devices
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "snapshots own rows" on public.snapshots
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "reports own rows" on public.reports
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "compat submissions readable by owner" on public.compatibility_submissions
  for select
  using (auth.uid() = user_id);

create policy "compat submissions insert by signed in users" on public.compatibility_submissions
  for insert
  with check (auth.uid() = user_id);

create policy "team memberships own rows" on public.team_memberships
  for select
  using (auth.uid() = user_id);

create policy "billing own row" on public.billing_customers
  for select
  using (auth.uid() = user_id);

-- Storage buckets to create separately:
-- legacydock-exports     private
-- legacydock-backups     private
-- legacydock-reports     private
-- legacydock-community   private, moderated

-- Recommended storage rule shape:
-- bucket owner path prefix = auth.uid()
-- no public bucket for device exports or backups
-- moderation assets uploaded to a private staging bucket only

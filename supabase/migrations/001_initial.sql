-- Go Pro Heating & Cooling — Initial Schema
-- Run this in the Supabase SQL editor or via MCP apply_migration

create extension if not exists "uuid-ossp";

-- Leads table (checklist downloads, contact form, etc.)
create table if not exists leads (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now() not null,
  name text,
  email text,
  phone text,
  source text,
  city text,
  notes text,
  status text default 'new' not null
);

-- Estimates table (from the estimate wizard)
create table if not exists estimates (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now() not null,
  name text,
  email text,
  phone text,
  city text,
  service_type text,
  home_size text,
  system_age text,
  urgency text,
  estimated_min integer,
  estimated_max integer,
  notes text,
  status text default 'new' not null
);

-- Automation events (incoming OpenClaw webhooks)
create table if not exists automation_events (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now() not null,
  event_type text,
  payload jsonb,
  source text
);

-- Webhook logs (outgoing and incoming webhook audit log)
create table if not exists webhook_logs (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now() not null,
  direction text not null, -- 'outgoing' or 'incoming'
  endpoint text,
  payload jsonb,
  status text,
  attempts integer default 1
);

-- Indexes for common queries
create index if not exists leads_email_idx on leads(email);
create index if not exists leads_status_idx on leads(status);
create index if not exists leads_created_at_idx on leads(created_at desc);
create index if not exists estimates_email_idx on estimates(email);
create index if not exists estimates_status_idx on estimates(status);
create index if not exists estimates_created_at_idx on estimates(created_at desc);
create index if not exists automation_events_created_at_idx on automation_events(created_at desc);
create index if not exists webhook_logs_created_at_idx on webhook_logs(created_at desc);

-- Row Level Security (enable but allow service role full access)
alter table leads enable row level security;
alter table estimates enable row level security;
alter table automation_events enable row level security;
alter table webhook_logs enable row level security;

-- Service role policies (API routes use service role key)
create policy "Service role full access on leads"
  on leads for all
  using (true)
  with check (true);

create policy "Service role full access on estimates"
  on estimates for all
  using (true)
  with check (true);

create policy "Service role full access on automation_events"
  on automation_events for all
  using (true)
  with check (true);

create policy "Service role full access on webhook_logs"
  on webhook_logs for all
  using (true)
  with check (true);

-- Job Proof SEO Engine — Projects table and storage bucket

-- Projects table
create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now() not null,
  city_slug text not null,
  service_slug text not null,
  description text not null,
  image_url text not null,
  customer_review_preview text
);

-- Indexes for common query patterns
create index if not exists projects_city_slug_idx on projects (city_slug);
create index if not exists projects_service_slug_idx on projects (service_slug);
create index if not exists projects_city_service_idx on projects (city_slug, service_slug);
create index if not exists projects_created_at_idx on projects (created_at desc);

-- Row Level Security
alter table projects enable row level security;

create policy "Service role full access on projects"
  on projects for all
  using (true)
  with check (true);

-- Storage bucket (run separately in Supabase dashboard or via MCP if needed)
-- insert into storage.buckets (id, name, public) values ('project-images', 'project-images', true)
-- on conflict (id) do nothing;

-- Storage policies (run after bucket creation)
-- create policy "Public read on project-images"
--   on storage.objects for select using (bucket_id = 'project-images');

-- create policy "Service role upload to project-images"
--   on storage.objects for insert
--   with check (bucket_id = 'project-images');

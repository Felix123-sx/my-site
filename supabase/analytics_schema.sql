create table if not exists public.product_views (
  id uuid primary key default gen_random_uuid(),
  product_id text references public.products(id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  session_id text,
  path text,
  referrer text,
  metadata jsonb not null default '{}'::jsonb,
  viewed_at timestamptz not null default now(),
  constraint product_views_actor_check check (user_id is not null or session_id is not null)
);

create index if not exists product_views_product_id_idx on public.product_views(product_id);
create index if not exists product_views_user_id_idx on public.product_views(user_id);
create index if not exists product_views_session_id_idx on public.product_views(session_id);
create index if not exists product_views_viewed_at_idx on public.product_views(viewed_at desc);

create table if not exists public.event_logs (
  id uuid primary key default gen_random_uuid(),
  event_name text not null check (event_name in ('product_view', 'add_to_cart', 'remove_from_cart', 'begin_checkout', 'purchase')),
  product_id text references public.products(id) on delete set null,
  order_id uuid references public.orders(id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  session_id text,
  path text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint event_logs_actor_check check (user_id is not null or session_id is not null)
);

create index if not exists event_logs_event_name_idx on public.event_logs(event_name);
create index if not exists event_logs_product_id_idx on public.event_logs(product_id);
create index if not exists event_logs_user_id_idx on public.event_logs(user_id);
create index if not exists event_logs_session_id_idx on public.event_logs(session_id);
create index if not exists event_logs_created_at_idx on public.event_logs(created_at desc);

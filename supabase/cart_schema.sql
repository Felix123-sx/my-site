create extension if not exists pgcrypto;

create table if not exists public.products (
  id text primary key,
  name text not null,
  slug text not null unique,
  description text,
  intro text,
  image_url text,
  price_cents integer not null check (price_cents >= 0),
  currency text not null default 'CNY',
  tag text,
  category text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  session_id text,
  status text not null default 'active' check (status in ('active', 'checked_out', 'abandoned')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint carts_owner_check check (user_id is not null or session_id is not null)
);

create unique index if not exists carts_active_user_idx
  on public.carts(user_id)
  where status = 'active' and user_id is not null;

create unique index if not exists carts_active_session_idx
  on public.carts(session_id)
  where status = 'active' and session_id is not null;

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts(id) on delete cascade,
  product_id text not null references public.products(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(cart_id, product_id)
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid references public.carts(id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  session_id text,
  status text not null default 'pending' check (status in ('pending', 'paid', 'fulfilled', 'cancelled')),
  currency text not null default 'CNY',
  subtotal_cents integer not null default 0 check (subtotal_cents >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint orders_owner_check check (user_id is not null or session_id is not null)
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text references public.products(id) on delete set null,
  product_name text not null,
  product_slug text not null,
  unit_price_cents integer not null check (unit_price_cents >= 0),
  quantity integer not null check (quantity > 0),
  subtotal_cents integer not null check (subtotal_cents >= 0),
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists set_carts_updated_at on public.carts;
create trigger set_carts_updated_at
before update on public.carts
for each row execute function public.set_updated_at();

drop trigger if exists set_cart_items_updated_at on public.cart_items;
create trigger set_cart_items_updated_at
before update on public.cart_items
for each row execute function public.set_updated_at();

drop trigger if exists set_orders_updated_at on public.orders;
create trigger set_orders_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

insert into public.products (id, name, slug, description, intro, price_cents, currency, tag, category, active)
values
  ('silkcare-lube', 'SilkCare 水性润滑剂', 'silkcare-lube', '温和配方，适合新用户建立第一层信任与低门槛下单。', '一款更适合健康向网站表达的入门型产品，强调温和、低刺激、舒适体验和更自然的使用场景，适合用于建立第一层用户信任。', 6900, 'CNY', '高复购引流款', '润滑护理', true),
  ('calmtouch-care', 'CalmTouch 柔感护理系列', 'calmtouch-care', '强调舒适触感与低刺激表达，适合作为品牌形象款。', '强调舒适触感与低刺激表达，适合用于承接更注重材料、安全感和审美表达的人群。', 19900, 'CNY', '身体友好材料', '私密健康', true),
  ('coupleease-box', 'CoupleEase 伴侣礼盒', 'coupleease-box', '适合节日与关系场景，兼顾送礼需求与组合销售逻辑。', '适合节日与关系场景，兼顾送礼需求与组合销售逻辑，适合作为礼盒型重点展示产品。', 29900, 'CNY', '提高客单价', '情侣关怀', true),
  ('dailycare-spray', 'DailyCare 清洁护理喷雾', 'dailycare-spray', '适合与主力产品组合呈现，增强整体购物路径。', '适合与主力产品组合呈现，增强整体购物路径，也能帮助网站建立更完整的护理感。', 8900, 'CNY', '搭配销售', '私密健康', true),
  ('velure-premium-device', 'Velure Premium Device', 'velure-premium-device', '以克制设计与舒适体验呈现更高级的私密健康表达。', '这是一款强调成熟审美、品质材料与稳定体验的精选产品，适合作为品牌系列中的核心展示款。', 25900, 'CNY', '成熟设计', '精选器具', true)
on conflict (id) do update set
  name = excluded.name,
  slug = excluded.slug,
  description = excluded.description,
  intro = excluded.intro,
  price_cents = excluded.price_cents,
  currency = excluded.currency,
  tag = excluded.tag,
  category = excluded.category,
  active = excluded.active;

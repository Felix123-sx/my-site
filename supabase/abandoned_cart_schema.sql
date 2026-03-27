create index if not exists carts_updated_at_idx on public.carts(updated_at desc);

create or replace view public.abandoned_carts_view as
with cart_item_totals as (
  select
    ci.cart_id,
    jsonb_agg(
      jsonb_build_object(
        'productId', p.id,
        'name', p.name,
        'slug', p.slug,
        'quantity', ci.quantity,
        'unitPriceCents', p.price_cents,
        'subtotalCents', p.price_cents * ci.quantity,
        'currency', p.currency
      )
      order by ci.created_at asc
    ) as items,
    sum(p.price_cents * ci.quantity) as total_value_cents,
    max(ci.updated_at) as item_last_activity_at,
    count(*) as item_count
  from public.cart_items ci
  join public.products p on p.id = ci.product_id
  group by ci.cart_id
)
select
  c.id as cart_id,
  c.user_id,
  c.session_id,
  pr.email as user_email,
  c.status,
  c.updated_at as cart_updated_at,
  coalesce(cit.item_last_activity_at, c.updated_at) as last_activity_at,
  cit.item_count,
  cit.total_value_cents,
  cit.items
from public.carts c
join cart_item_totals cit on cit.cart_id = c.id
left join public.profiles pr on pr.id = c.user_id
left join public.orders o on o.cart_id = c.id
where c.status = 'active'
  and o.id is null
  and coalesce(cit.item_last_activity_at, c.updated_at) <= now() - interval '24 hours';

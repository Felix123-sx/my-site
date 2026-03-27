# Next.js + Supabase Shopping Cart

This workspace contains a TypeScript shopping cart implementation for a Next.js App Router project backed by Supabase, plus the admin dashboard and homepage UI work merged from the existing repository history.

## Included

- SQL schema for `products`, `carts`, `cart_items`, `orders`, and `order_items`
- One active cart per logged-in user or guest session
- Route handlers for:
  - `GET /api/cart`
  - `POST /api/cart/add`
  - `PATCH /api/cart/item`
  - `DELETE /api/cart/item`
- A `/cart` UI page
- Product listing page with add-to-cart actions
- Guest cart persistence with an `httpOnly` `cart_session_id` cookie
- Protected admin login and dashboard at `/admin`

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_ACCESS_KEY`

Optional legacy variables retained from earlier repo history:

- `SUPABASE_URL`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Database Setup

Run the SQL in [`supabase/schema.sql`](/Users/mqbxya/Documents/Playground/supabase/schema.sql) in the Supabase SQL editor.

Additional historical SQL files from the previous Vite-based app remain in `supabase/` for reference:

- `supabase/cart_schema.sql`
- `supabase/analytics_schema.sql`
- `supabase/abandoned_cart_schema.sql`
- `supabase/auth_schema.sql`

## Admin Dashboard

- Create the admin user in Supabase Auth with email/password first
- Insert that user's id and email into `public.admin_users`
- Visit `/admin/login` and sign in with the same Supabase Auth credentials
- `/admin` is protected by an `httpOnly` admin auth cookie plus an `admin_users` membership check
- The admin dashboard supports preset and custom date filters, order search, status filters, trend charts, and CSV export

## File Map

- [`supabase/schema.sql`](/Users/mqbxya/Documents/Playground/supabase/schema.sql): database schema
- [`lib/cart/service.ts`](/Users/mqbxya/Documents/Playground/lib/cart/service.ts): cart business logic
- [`app/api/cart/route.ts`](/Users/mqbxya/Documents/Playground/app/api/cart/route.ts): get current cart
- [`app/api/cart/add/route.ts`](/Users/mqbxya/Documents/Playground/app/api/cart/add/route.ts): add to cart
- [`app/api/cart/item/route.ts`](/Users/mqbxya/Documents/Playground/app/api/cart/item/route.ts): update quantity and remove item
- [`app/cart/page.tsx`](/Users/mqbxya/Documents/Playground/app/cart/page.tsx): cart page
- [`components/marketing/animated-rose-logo.tsx`](/Users/mqbxya/Documents/Playground/components/marketing/animated-rose-logo.tsx): homepage animated logo
- [`components/admin/admin-dashboard-client.tsx`](/Users/mqbxya/Documents/Playground/components/admin/admin-dashboard-client.tsx): admin dashboard UI

## Repo History Note

This repository now contains merged history from an earlier Vite/React storefront. Those legacy files are still present under `src/`, `api/`, and `public/`, while the current active implementation in this workspace is the Next.js app under `app/`, `components/`, and `lib/`.

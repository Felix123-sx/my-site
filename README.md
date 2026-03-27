# Next.js Mainline

This repository's active codebase is now the Next.js App Router app in the root. The older Vite/React storefront has been archived under `legacy/vite-app/` so future development can stay focused on one main implementation.

## Current Mainline

- `app/`
- `components/`
- `lib/`
- `supabase/schema.sql`
- `package.json`

Run locally:

```bash
npm install
npm run dev
```

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

Optional legacy variables retained for archived repo history:

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

## Archived Legacy App

The previous Vite/React implementation has been moved to:

- `legacy/vite-app/api/`
- `legacy/vite-app/src/`
- `legacy/vite-app/public/`
- `legacy/vite-app/index.html`
- `legacy/vite-app/vite.config.js`

That archived app is preserved for history and reference only. Ongoing work should happen in the root Next.js app.

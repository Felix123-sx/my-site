# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Shopping cart + Supabase

- SQL schema: [`supabase/cart_schema.sql`](/Users/mqbxya/my-site/supabase/cart_schema.sql)
- Cart API routes:
  - [`api/cart/index.js`](/Users/mqbxya/my-site/api/cart/index.js)
  - [`api/cart/add.js`](/Users/mqbxya/my-site/api/cart/add.js)
  - [`api/cart/item.js`](/Users/mqbxya/my-site/api/cart/item.js)
  - [`api/cart/clear.js`](/Users/mqbxya/my-site/api/cart/clear.js)
- Frontend cart state: [`src/context/CartContext.jsx`](/Users/mqbxya/my-site/src/context/CartContext.jsx)
- Product loading helper: [`src/lib/products.js`](/Users/mqbxya/my-site/src/lib/products.js)

### Environment variables

Copy [`.env.example`](/Users/mqbxya/my-site/.env.example) to `.env.local` and fill in:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Local development note

The frontend builds with `npm run build`, but the `/api/*` routes are Vercel serverless functions. To test frontend + API together locally, use `vercel dev` from the project root.

## Product analytics

- Analytics SQL: [`supabase/analytics_schema.sql`](/Users/mqbxya/my-site/supabase/analytics_schema.sql)
- Analytics API route: [`api/analytics/track.js`](/Users/mqbxya/my-site/api/analytics/track.js)
- Server-side insert logic: [`api/_lib/analytics.js`](/Users/mqbxya/my-site/api/_lib/analytics.js)
- Frontend tracking helper: [`src/lib/analytics.js`](/Users/mqbxya/my-site/src/lib/analytics.js)

Tracked events currently wired in:

- `product_view` on [`src/pages/ProductDetail.jsx`](/Users/mqbxya/my-site/src/pages/ProductDetail.jsx)
- `add_to_cart` and `remove_from_cart` in [`src/context/CartContext.jsx`](/Users/mqbxya/my-site/src/context/CartContext.jsx)
- `begin_checkout` and `purchase` in [`src/pages/CartPage.jsx`](/Users/mqbxya/my-site/src/pages/CartPage.jsx)

To enable analytics:

1. Run [`supabase/analytics_schema.sql`](/Users/mqbxya/my-site/supabase/analytics_schema.sql) in the Supabase SQL Editor.
2. Start the app with `vercel dev` so frontend and `/api/analytics/track` run together.
3. Visit a product detail page, add/remove cart items, and use the checkout buttons.
4. Check `public.product_views` and `public.event_logs` in Supabase Table Editor.
5. If your account has `profiles.role = admin`, open `http://localhost:3000/analytics` to view the built-in analytics dashboard.

## Abandoned carts

- SQL view: [`supabase/abandoned_cart_schema.sql`](/Users/mqbxya/my-site/supabase/abandoned_cart_schema.sql)
- Admin API: [`api/admin/abandoned-carts.js`](/Users/mqbxya/my-site/api/admin/abandoned-carts.js)
- Admin UI: [`src/pages/AbandonedCartsPage.jsx`](/Users/mqbxya/my-site/src/pages/AbandonedCartsPage.jsx)

This feature identifies carts that:

- have cart items
- have no linked order
- have not been updated for 24 hours

To enable it:

1. Run [`supabase/abandoned_cart_schema.sql`](/Users/mqbxya/my-site/supabase/abandoned_cart_schema.sql) in Supabase SQL Editor.
2. Make sure your account has `profiles.role = admin`.
3. Start the app with `vercel dev`.
4. Open `http://localhost:3000/admin/abandoned-carts`.

## Authentication + Supabase Auth

- Auth/profile SQL: [`supabase/auth_schema.sql`](/Users/mqbxya/my-site/supabase/auth_schema.sql)
- Auth context: [`src/context/AuthContext.jsx`](/Users/mqbxya/my-site/src/context/AuthContext.jsx)
- Protected route wrapper: [`src/components/RequireAuth.jsx`](/Users/mqbxya/my-site/src/components/RequireAuth.jsx)
- Pages:
  - [`src/pages/LoginPage.jsx`](/Users/mqbxya/my-site/src/pages/LoginPage.jsx)
  - [`src/pages/SignupPage.jsx`](/Users/mqbxya/my-site/src/pages/SignupPage.jsx)
  - [`src/pages/ForgotPasswordPage.jsx`](/Users/mqbxya/my-site/src/pages/ForgotPasswordPage.jsx)
  - [`src/pages/ResetPasswordPage.jsx`](/Users/mqbxya/my-site/src/pages/ResetPasswordPage.jsx)
  - [`src/pages/AccountPage.jsx`](/Users/mqbxya/my-site/src/pages/AccountPage.jsx)

### What to configure in Supabase

1. Run [`supabase/auth_schema.sql`](/Users/mqbxya/my-site/supabase/auth_schema.sql) in the Supabase SQL Editor.
2. In Supabase Auth settings, set your site URL for local testing to `http://localhost:3000`.
3. Add `http://localhost:3000/auth/callback` to the allowed redirect URLs.

### Env variables

Put these in `.env.local` in the project root:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

For this auth implementation:

- Frontend auth uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Server-side cart functions use `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

### How to test locally

1. Run `npm run dev` for frontend-only auth flows, or `vercel dev` if you also want cart API routes.
2. Open `http://localhost:3000/signup` and create an account.
3. Check Supabase Auth users and `public.profiles` to confirm a profile row was created automatically.
4. Sign out, then sign back in at `http://localhost:3000/login`.
5. Visit `http://localhost:3000/account` and confirm the navbar login state updates.
6. Test `http://localhost:3000/forgot-password`, open the email link, return through `http://localhost:3000/auth/callback`, and finish at `http://localhost:3000/reset-password`.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

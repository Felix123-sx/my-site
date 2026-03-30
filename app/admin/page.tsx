import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminDashboardClient, type AdminDashboardPayload } from "@/components/admin/admin-dashboard-client";
import { hasAdminSession } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";
import type { ProductRow } from "@/lib/cart/types";

type CartStatus = "active" | "checked_out" | "abandoned";
type OrderStatus = "pending" | "paid" | "fulfilled" | "cancelled";

type CartRecord = {
  id: string;
  status: CartStatus;
  created_at: string;
  updated_at: string;
};

type OrderRecord = {
  id: string;
  status: OrderStatus;
  currency: string;
  subtotal_cents: number;
  created_at: string;
};

type OrderItemRecord = {
  order_id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  subtotal_cents: number;
  created_at: string;
};

type DashboardData = {
  usingFallback: boolean;
  products: ProductRow[];
  carts: CartRecord[];
  orders: OrderRecord[];
  orderItems: OrderItemRecord[];
};

const fallbackProducts: ProductRow[] = [
  {
    id: "demo-1",
    name: "Silk Comfort Gel",
    slug: "silk-comfort-gel",
    description: "更适合首次购买用户的入门型产品。",
    image_url: null,
    price_cents: 2400,
    currency: "USD",
    active: true,
  },
  {
    id: "demo-2",
    name: "peekplay Daily Massager",
    slug: "northstar-daily-massager",
    description: "复购率较高的核心 SKU。",
    image_url: null,
    price_cents: 7900,
    currency: "USD",
    active: true,
  },
  {
    id: "demo-3",
    name: "Evening Ritual Set",
    slug: "evening-ritual-set",
    description: "礼盒型高客单商品。",
    image_url: null,
    price_cents: 12900,
    currency: "USD",
    active: true,
  },
  {
    id: "demo-4",
    name: "Travel Essentials Kit",
    slug: "travel-essentials-kit",
    description: "轻量组合装，适合活动期间推广。",
    image_url: null,
    price_cents: 5600,
    currency: "USD",
    active: false,
  },
];

const fallbackCarts: CartRecord[] = [
  {
    id: "cart-1",
    status: "active",
    created_at: "2026-03-27T01:10:00.000Z",
    updated_at: "2026-03-27T04:40:00.000Z",
  },
  {
    id: "cart-2",
    status: "checked_out",
    created_at: "2026-03-27T00:30:00.000Z",
    updated_at: "2026-03-27T03:20:00.000Z",
  },
  {
    id: "cart-3",
    status: "abandoned",
    created_at: "2026-03-26T22:00:00.000Z",
    updated_at: "2026-03-27T00:10:00.000Z",
  },
  {
    id: "cart-4",
    status: "active",
    created_at: "2026-03-26T19:30:00.000Z",
    updated_at: "2026-03-27T04:05:00.000Z",
  },
  {
    id: "cart-5",
    status: "checked_out",
    created_at: "2026-03-26T16:50:00.000Z",
    updated_at: "2026-03-26T17:15:00.000Z",
  },
  {
    id: "cart-6",
    status: "abandoned",
    created_at: "2026-03-26T14:00:00.000Z",
    updated_at: "2026-03-26T14:45:00.000Z",
  },
];

const fallbackOrders: OrderRecord[] = [
  {
    id: "order-1001",
    status: "fulfilled",
    currency: "USD",
    subtotal_cents: 12900,
    created_at: "2026-03-27T03:10:00.000Z",
  },
  {
    id: "order-1002",
    status: "paid",
    currency: "USD",
    subtotal_cents: 7900,
    created_at: "2026-03-27T01:30:00.000Z",
  },
  {
    id: "order-1003",
    status: "pending",
    currency: "USD",
    subtotal_cents: 2400,
    created_at: "2026-03-26T20:00:00.000Z",
  },
  {
    id: "order-1004",
    status: "cancelled",
    currency: "USD",
    subtotal_cents: 5600,
    created_at: "2026-03-26T15:00:00.000Z",
  },
];

const fallbackOrderItems: OrderItemRecord[] = [
  {
    order_id: "order-1001",
    product_id: "demo-3",
    product_name: "Evening Ritual Set",
    quantity: 1,
    subtotal_cents: 12900,
    created_at: "2026-03-27T03:10:00.000Z",
  },
  {
    order_id: "order-1002",
    product_id: "demo-2",
    product_name: "peekplay Daily Massager",
    quantity: 1,
    subtotal_cents: 7900,
    created_at: "2026-03-27T01:30:00.000Z",
  },
  {
    order_id: "order-1003",
    product_id: "demo-1",
    product_name: "Silk Comfort Gel",
    quantity: 1,
    subtotal_cents: 2400,
    created_at: "2026-03-26T20:00:00.000Z",
  },
  {
    order_id: "order-1004",
    product_id: "demo-4",
    product_name: "Travel Essentials Kit",
    quantity: 1,
    subtotal_cents: 5600,
    created_at: "2026-03-26T15:00:00.000Z",
  },
];

export const metadata: Metadata = {
  title: "数据管理台",
  description: "为 peekplay 数据管理员提供更直观的业务概览、订单监控与商品表现分析。",
};

export const dynamic = "force-dynamic";

async function getDashboardData(): Promise<DashboardData> {
  if (!supabaseAdmin) {
    return {
      usingFallback: true,
      products: fallbackProducts,
      carts: fallbackCarts,
      orders: fallbackOrders,
      orderItems: fallbackOrderItems,
    };
  }

  const [productsResult, cartsResult, ordersResult, orderItemsResult] = await Promise.all([
    supabaseAdmin
      .from("products")
      .select("id, name, slug, description, image_url, price_cents, currency, active")
      .order("created_at", { ascending: false }),
    supabaseAdmin.from("carts").select("id, status, created_at, updated_at").order("updated_at", { ascending: false }),
    supabaseAdmin
      .from("orders")
      .select("id, status, currency, subtotal_cents, created_at")
      .order("created_at", { ascending: false }),
    supabaseAdmin
      .from("order_items")
      .select("order_id, product_id, product_name, quantity, subtotal_cents, created_at")
      .order("created_at", { ascending: false }),
  ]);

  const hasError =
    productsResult.error || cartsResult.error || ordersResult.error || orderItemsResult.error;

  if (hasError) {
    return {
      usingFallback: true,
      products: fallbackProducts,
      carts: fallbackCarts,
      orders: fallbackOrders,
      orderItems: fallbackOrderItems,
    };
  }

  return {
    usingFallback: false,
    products: (productsResult.data ?? []) as ProductRow[],
    carts: (cartsResult.data ?? []) as CartRecord[],
    orders: (ordersResult.data ?? []) as OrderRecord[],
    orderItems: (orderItemsResult.data ?? []) as OrderItemRecord[],
  };
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ range?: string }>;
}) {
  if (!(await hasAdminSession())) {
    redirect("/admin/login");
  }

  const resolvedSearchParams = await searchParams;
  const selectedRange = (resolvedSearchParams?.range === "30d" || resolvedSearchParams?.range === "90d"
    ? resolvedSearchParams.range
    : "7d") as "7d" | "30d" | "90d";
  const data = await getDashboardData();

  return <AdminDashboardClient initialData={data as AdminDashboardPayload} initialRange={selectedRange} />;
}

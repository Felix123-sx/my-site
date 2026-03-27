import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

type OrderStatus = "pending" | "paid" | "fulfilled" | "cancelled";

type OrderRecord = {
  id: string;
  status: OrderStatus;
  currency: string;
  subtotal_cents: number;
  created_at: string;
};

function escapeCsv(value: string | number) {
  const stringValue = String(value);
  const escaped = stringValue.replaceAll('"', '""');
  return `"${escaped}"`;
}

function getFallbackOrders(): OrderRecord[] {
  return [
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
  ];
}

export async function GET(request: Request) {
  if (!(await hasAdminSession())) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const url = new URL(request.url);
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");
  const status = url.searchParams.get("status");
  const query = (url.searchParams.get("query") ?? "").trim().toLowerCase();

  let orders: OrderRecord[] = getFallbackOrders();

  if (supabaseAdmin) {
    const { data } = await supabaseAdmin
      .from("orders")
      .select("id, status, currency, subtotal_cents, created_at")
      .order("created_at", { ascending: false });

    orders = (data ?? []) as OrderRecord[];
  }

  const filtered = orders.filter((order) => {
    const created = order.created_at.slice(0, 10);
    const matchesFrom = !from || created >= from;
    const matchesTo = !to || created <= to;
    const matchesStatus = !status || order.status === status;
    const matchesQuery =
      query.length === 0 ||
      order.id.toLowerCase().includes(query) ||
      order.status.toLowerCase().includes(query);

    return matchesFrom && matchesTo && matchesStatus && matchesQuery;
  });

  const csvLines = [
    ["order_id", "status", "subtotal_cents", "currency", "created_at"].map(escapeCsv).join(","),
    ...filtered.map((order) =>
      [order.id, order.status, order.subtotal_cents, order.currency, order.created_at].map(escapeCsv).join(",")
    ),
  ];

  return new NextResponse(csvLines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="orders-export.csv"`,
    },
  });
}

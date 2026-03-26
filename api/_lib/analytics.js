import { getSupabaseAdmin } from "./supabaseAdmin.js";

const ALLOWED_EVENTS = new Set([
  "product_view",
  "add_to_cart",
  "remove_from_cart",
  "begin_checkout",
  "purchase",
]);

function sanitizeMetadata(metadata) {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    return {};
  }

  return JSON.parse(JSON.stringify(metadata));
}

export function validateAnalyticsPayload(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid analytics payload.");
  }

  const eventName = String(payload.eventName || "");

  if (!ALLOWED_EVENTS.has(eventName)) {
    throw new Error("Unsupported event name.");
  }

  if (!payload.userId && !payload.sessionId) {
    throw new Error("userId or sessionId is required.");
  }

  return {
    eventName,
    productId: payload.productId || null,
    orderId: payload.orderId || null,
    userId: payload.userId || null,
    sessionId: payload.sessionId || null,
    path: payload.path || null,
    referrer: payload.referrer || null,
    metadata: sanitizeMetadata(payload.metadata),
  };
}

export async function trackAnalyticsEvent(payload) {
  const supabase = getSupabaseAdmin();
  const event = validateAnalyticsPayload(payload);

  const { error: eventLogError } = await supabase.from("event_logs").insert({
    event_name: event.eventName,
    product_id: event.productId,
    order_id: event.orderId,
    user_id: event.userId,
    session_id: event.sessionId,
    path: event.path,
    metadata: event.metadata,
  });

  if (eventLogError) {
    throw eventLogError;
  }

  if (event.eventName === "product_view") {
    const { error: productViewError } = await supabase.from("product_views").insert({
      product_id: event.productId,
      user_id: event.userId,
      session_id: event.sessionId,
      path: event.path,
      referrer: event.referrer,
      metadata: event.metadata,
    });

    if (productViewError) {
      throw productViewError;
    }
  }

  return { ok: true };
}

function formatDay(value) {
  return new Date(value).toISOString().slice(0, 10);
}

export async function getAnalyticsDashboard() {
  const supabase = getSupabaseAdmin();
  const since = new Date();
  since.setDate(since.getDate() - 30);
  const sinceIso = since.toISOString();

  const [
    { data: events, error: eventsError },
    { data: views, error: viewsError },
  ] = await Promise.all([
    supabase
      .from("event_logs")
      .select("id, event_name, product_id, order_id, user_id, session_id, path, metadata, created_at")
      .gte("created_at", sinceIso)
      .order("created_at", { ascending: false })
      .limit(500),
    supabase
      .from("product_views")
      .select("id, product_id, user_id, session_id, path, metadata, viewed_at")
      .gte("viewed_at", sinceIso)
      .order("viewed_at", { ascending: false })
      .limit(500),
  ]);

  if (eventsError) {
    throw eventsError;
  }

  if (viewsError) {
    throw viewsError;
  }

  const safeEvents = events || [];
  const safeViews = views || [];
  const productStatsMap = new Map();
  const trendMap = new Map();

  for (const view of safeViews) {
    const productId = view.product_id || "unknown";
    const entry = productStatsMap.get(productId) || {
      productId,
      name: view.metadata?.name || productId,
      category: view.metadata?.category || "未分类",
      productViews: 0,
      addToCart: 0,
      purchases: 0,
      revenueCents: 0,
    };
    entry.productViews += 1;
    productStatsMap.set(productId, entry);

    const day = formatDay(view.viewed_at);
    const trend = trendMap.get(day) || {
      date: day,
      product_view: 0,
      add_to_cart: 0,
      remove_from_cart: 0,
      begin_checkout: 0,
      purchase: 0,
    };
    trend.product_view += 1;
    trendMap.set(day, trend);
  }

  for (const event of safeEvents) {
    const day = formatDay(event.created_at);
    const trend = trendMap.get(day) || {
      date: day,
      product_view: 0,
      add_to_cart: 0,
      remove_from_cart: 0,
      begin_checkout: 0,
      purchase: 0,
    };
    trend[event.event_name] = (trend[event.event_name] || 0) + 1;
    trendMap.set(day, trend);

    if (event.product_id) {
      const entry = productStatsMap.get(event.product_id) || {
        productId: event.product_id,
        name: event.metadata?.name || event.product_id,
        category: event.metadata?.category || "未分类",
        productViews: 0,
        addToCart: 0,
        purchases: 0,
        revenueCents: 0,
      };

      if (event.event_name === "add_to_cart") {
        entry.addToCart += Number(event.metadata?.quantity || 1);
      }

      if (event.event_name === "purchase") {
        const items = Array.isArray(event.metadata?.items) ? event.metadata.items : [];
        const purchasedItem = items.find((item) => item.productId === event.product_id);
        const itemQuantity = Number(purchasedItem?.quantity || 1);
        const unitPrice = Number(purchasedItem?.unitPriceCents || 0);
        entry.purchases += itemQuantity;
        entry.revenueCents += itemQuantity * unitPrice;
      }

      productStatsMap.set(event.product_id, entry);
    } else if (event.event_name === "purchase" && Array.isArray(event.metadata?.items)) {
      for (const item of event.metadata.items) {
        const productId = item.productId || "unknown";
        const entry = productStatsMap.get(productId) || {
          productId,
          name: item.name || productId,
          category: "未分类",
          productViews: 0,
          addToCart: 0,
          purchases: 0,
          revenueCents: 0,
        };
        const quantity = Number(item.quantity || 1);
        const unitPrice = Number(item.unitPriceCents || 0);
        entry.purchases += quantity;
        entry.revenueCents += quantity * unitPrice;
        productStatsMap.set(productId, entry);
      }
    }
  }

  const overview = {
    productViews: safeViews.length,
    addToCart: safeEvents.filter((event) => event.event_name === "add_to_cart").length,
    removeFromCart: safeEvents.filter((event) => event.event_name === "remove_from_cart").length,
    beginCheckout: safeEvents.filter((event) => event.event_name === "begin_checkout").length,
    purchases: safeEvents.filter((event) => event.event_name === "purchase").length,
    uniqueUsers: new Set(
      [...safeViews, ...safeEvents]
        .map((entry) => entry.user_id || entry.session_id)
        .filter(Boolean),
    ).size,
  };

  const productPerformance = [...productStatsMap.values()]
    .sort((a, b) => b.productViews + b.addToCart + b.purchases - (a.productViews + a.addToCart + a.purchases))
    .slice(0, 8);

  const trends = [...trendMap.values()].sort((a, b) => a.date.localeCompare(b.date)).slice(-14);

  const recentEvents = safeEvents.slice(0, 20).map((event) => ({
    id: event.id,
    eventName: event.event_name,
    productId: event.product_id,
    actor: event.user_id || event.session_id || "unknown",
    path: event.path,
    createdAt: event.created_at,
    metadata: event.metadata || {},
  }));

  return {
    overview,
    trends,
    productPerformance,
    recentEvents,
  };
}

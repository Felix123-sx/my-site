import { getOrCreateGuestSessionId } from "./session";

function getCommonContext() {
  return {
    sessionId: getOrCreateGuestSessionId(),
    path: window.location.pathname,
    referrer: document.referrer || null,
  };
}

export async function trackEvent({
  eventName,
  userId = null,
  sessionId = null,
  productId = null,
  orderId = null,
  metadata = {},
}) {
  const payload = {
    eventName,
    userId,
    sessionId: sessionId || getCommonContext().sessionId,
    productId,
    orderId,
    path: window.location.pathname,
    referrer: document.referrer || null,
    metadata,
  };

  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    const queued = navigator.sendBeacon("/api/analytics/track", blob);

    if (queued) {
      return;
    }
  }

  await fetch("/api/analytics/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    keepalive: true,
  });
}

export async function trackProductView({ product, userId }) {
  await trackEvent({
    eventName: "product_view",
    userId,
    productId: product.id,
    metadata: {
      name: product.name,
      category: product.category,
      priceCents: product.priceCents,
      currency: product.currency,
    },
  });
}

export async function trackAddToCart({ product, quantity, userId }) {
  await trackEvent({
    eventName: "add_to_cart",
    userId,
    productId: product.id,
    metadata: {
      name: product.name,
      category: product.category,
      quantity,
      priceCents: product.priceCents,
      currency: product.currency,
    },
  });
}

export async function trackRemoveFromCart({ item, userId }) {
  await trackEvent({
    eventName: "remove_from_cart",
    userId,
    productId: item.productId,
    metadata: {
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      subtotalCents: item.subtotalCents,
      currency: item.currency,
    },
  });
}

export async function trackBeginCheckout({ cart, userId }) {
  await trackEvent({
    eventName: "begin_checkout",
    userId,
    metadata: {
      cartId: cart?.id || null,
      itemCount: cart?.items?.length || 0,
      totalQuantity: cart?.totalQuantity || 0,
      subtotalCents: cart?.subtotalCents || 0,
      currency: cart?.currency || "CNY",
      items: (cart?.items || []).map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        unitPriceCents: item.unitPriceCents,
      })),
    },
  });
}

export async function trackPurchase({ cart, orderId = null, userId }) {
  await trackEvent({
    eventName: "purchase",
    userId,
    orderId,
    metadata: {
      cartId: cart?.id || null,
      totalQuantity: cart?.totalQuantity || 0,
      subtotalCents: cart?.subtotalCents || 0,
      currency: cart?.currency || "CNY",
      items: (cart?.items || []).map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        unitPriceCents: item.unitPriceCents,
      })),
    },
  });
}

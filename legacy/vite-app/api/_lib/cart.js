import { getSupabaseAdmin } from "./supabaseAdmin.js";

function assertOwner({ userId, sessionId }) {
  if (!userId && !sessionId) {
    throw new Error("Either userId or sessionId is required.");
  }
}

function ownerFilter({ userId, sessionId }) {
  if (userId) {
    return { column: "user_id", value: userId };
  }

  return { column: "session_id", value: sessionId };
}

function mapCart(cart) {
  if (!cart) {
    return null;
  }

  const items = (cart.items || [])
    .filter((item) => item.product)
    .map((item) => ({
      id: item.id,
      productId: item.product_id,
      name: item.product.name,
      slug: item.product.slug,
      description: item.product.description,
      category: item.product.category,
      tag: item.product.tag,
      imageUrl: item.product.image_url,
      currency: item.product.currency,
      unitPriceCents: item.product.price_cents,
      price: formatMoney(item.product.price_cents, item.product.currency),
      quantity: item.quantity,
      subtotalCents: item.product.price_cents * item.quantity,
      subtotal: formatMoney(item.product.price_cents * item.quantity, item.product.currency),
    }));

  return {
    id: cart.id,
    userId: cart.user_id,
    sessionId: cart.session_id,
    status: cart.status,
    items,
    totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotalCents: items.reduce((sum, item) => sum + item.subtotalCents, 0),
    subtotal: formatMoney(
      items.reduce((sum, item) => sum + item.subtotalCents, 0),
      items[0]?.currency || "CNY",
    ),
    currency: items[0]?.currency || "CNY",
  };
}

function formatMoney(amountCents, currency = "CNY") {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amountCents / 100);
}

export async function getOrCreateActiveCart(owner) {
  assertOwner(owner);
  const supabase = getSupabaseAdmin();
  const filter = ownerFilter(owner);

  const { data: existingCart, error: existingCartError } = await supabase
    .from("carts")
    .select("id")
    .eq(filter.column, filter.value)
    .eq("status", "active")
    .maybeSingle();

  if (existingCartError) {
    throw existingCartError;
  }

  if (existingCart) {
    return existingCart.id;
  }

  const payload = owner.userId
    ? { user_id: owner.userId, session_id: null, status: "active" }
    : { user_id: null, session_id: owner.sessionId, status: "active" };

  const { data: createdCart, error: createdCartError } = await supabase
    .from("carts")
    .insert(payload)
    .select("id")
    .single();

  if (createdCartError) {
    throw createdCartError;
  }

  return createdCart.id;
}

export async function getCurrentCart(owner) {
  assertOwner(owner);
  const supabase = getSupabaseAdmin();
  const filter = ownerFilter(owner);

  const { data, error } = await supabase
    .from("carts")
    .select(`
      id,
      user_id,
      session_id,
      status,
      items:cart_items(
        id,
        cart_id,
        product_id,
        quantity,
        product:products(
          id,
          name,
          slug,
          description,
          image_url,
          price_cents,
          currency,
          active,
          category,
          tag
        )
      )
    `)
    .eq(filter.column, filter.value)
    .eq("status", "active")
    .maybeSingle();

  if (error) {
    throw error;
  }

  return mapCart(data);
}

export async function addToCart({ userId = null, sessionId = null, productId, quantity = 1 }) {
  assertOwner({ userId, sessionId });
  const supabase = getSupabaseAdmin();
  const safeQuantity = Math.max(1, Number(quantity) || 1);
  const cartId = await getOrCreateActiveCart({ userId, sessionId });

  const { data: existingItem, error: existingItemError } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("cart_id", cartId)
    .eq("product_id", productId)
    .maybeSingle();

  if (existingItemError) {
    throw existingItemError;
  }

  if (existingItem) {
    const { error: updateError } = await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + safeQuantity })
      .eq("id", existingItem.id);

    if (updateError) {
      throw updateError;
    }
  } else {
    const { error: insertError } = await supabase
      .from("cart_items")
      .insert({ cart_id: cartId, product_id: productId, quantity: safeQuantity });

    if (insertError) {
      throw insertError;
    }
  }

  return getCurrentCart({ userId, sessionId });
}

export async function updateCartItem({ userId = null, sessionId = null, cartItemId, quantity }) {
  assertOwner({ userId, sessionId });
  const supabase = getSupabaseAdmin();

  if ((Number(quantity) || 0) <= 0) {
    return removeCartItem({ userId, sessionId, cartItemId });
  }

  const cartId = await getOrCreateActiveCart({ userId, sessionId });

  const { error } = await supabase
    .from("cart_items")
    .update({ quantity: Number(quantity) })
    .eq("id", cartItemId)
    .eq("cart_id", cartId);

  if (error) {
    throw error;
  }

  return getCurrentCart({ userId, sessionId });
}

export async function removeCartItem({ userId = null, sessionId = null, cartItemId }) {
  assertOwner({ userId, sessionId });
  const supabase = getSupabaseAdmin();
  const cartId = await getOrCreateActiveCart({ userId, sessionId });

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId)
    .eq("cart_id", cartId);

  if (error) {
    throw error;
  }

  return getCurrentCart({ userId, sessionId });
}

export async function clearCart({ userId = null, sessionId = null }) {
  assertOwner({ userId, sessionId });
  const supabase = getSupabaseAdmin();
  const cartId = await getOrCreateActiveCart({ userId, sessionId });

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", cartId);

  if (error) {
    throw error;
  }

  return getCurrentCart({ userId, sessionId });
}

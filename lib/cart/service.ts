import { supabaseAdmin } from "@/lib/supabase";
import type {
  AddToCartInput,
  CartOwnerInput,
  CartRow,
  CartSummary,
  RemoveCartItemInput,
  UpdateCartItemInput,
} from "@/lib/cart/types";

function getAdminClient() {
  if (!supabaseAdmin) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY for server-side cart operations.");
  }

  return supabaseAdmin;
}

function assertCartOwner(owner: CartOwnerInput) {
  if (!owner.userId && !owner.sessionId) {
    throw new Error("Either userId or sessionId is required.");
  }
}

function buildOwnerFilter(owner: CartOwnerInput) {
  if (owner.userId) {
    return { column: "user_id", value: owner.userId };
  }

  return { column: "session_id", value: owner.sessionId as string };
}

function mapCart(cart: CartRow | null): CartSummary | null {
  if (!cart) {
    return null;
  }

  const items = cart.items.map((item) => ({
    id: item.id,
    productId: item.product_id,
    name: item.product.name,
    slug: item.product.slug,
    imageUrl: item.product.image_url,
    unitPriceCents: item.product.price_cents,
    currency: item.product.currency,
    quantity: item.quantity,
    subtotalCents: item.product.price_cents * item.quantity,
  }));

  return {
    id: cart.id,
    userId: cart.user_id,
    sessionId: cart.session_id,
    status: cart.status,
    items,
    totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotalCents: items.reduce((sum, item) => sum + item.subtotalCents, 0),
    currency: items[0]?.currency ?? null,
  };
}

export async function getOrCreateActiveCart(owner: CartOwnerInput) {
  assertCartOwner(owner);
  const admin = getAdminClient();
  const filter = buildOwnerFilter(owner);

  const { data: existingCart, error: existingCartError } = await admin
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

  const { data: createdCart, error: createdCartError } = await admin
    .from("carts")
    .insert(payload)
    .select("id")
    .single();

  if (createdCartError) {
    throw createdCartError;
  }

  return createdCart.id;
}

export async function getCurrentCart(owner: CartOwnerInput) {
  assertCartOwner(owner);
  const admin = getAdminClient();
  const filter = buildOwnerFilter(owner);

  const { data, error } = await admin
    .from("carts")
    .select(
      `
      id,
      user_id,
      session_id,
      status,
      created_at,
      updated_at,
      items:cart_items(
        id,
        cart_id,
        product_id,
        quantity,
        created_at,
        updated_at,
        product:products(
          id,
          name,
          slug,
          description,
          image_url,
          price_cents,
          currency,
          active
        )
      )
    `,
    )
    .eq(filter.column, filter.value)
    .eq("status", "active")
    .maybeSingle();

  if (error) {
    throw error;
  }

  return mapCart(data as CartRow | null);
}

export async function addToCart(input: AddToCartInput) {
  assertCartOwner(input);
  const admin = getAdminClient();
  const quantity = Math.max(1, input.quantity ?? 1);
  const cartId = await getOrCreateActiveCart(input);

  const { data: existingItem, error: existingItemError } = await admin
    .from("cart_items")
    .select("id, quantity")
    .eq("cart_id", cartId)
    .eq("product_id", input.productId)
    .maybeSingle();

  if (existingItemError) {
    throw existingItemError;
  }

  if (existingItem) {
    const { error: updateError } = await admin
      .from("cart_items")
      .update({ quantity: existingItem.quantity + quantity })
      .eq("id", existingItem.id);

    if (updateError) {
      throw updateError;
    }
  } else {
    const { error: insertError } = await admin.from("cart_items").insert({
      cart_id: cartId,
      product_id: input.productId,
      quantity,
    });

    if (insertError) {
      throw insertError;
    }
  }

  return getCurrentCart(input);
}

export async function updateCartItem(input: UpdateCartItemInput) {
  assertCartOwner(input);
  const admin = getAdminClient();

  if (input.quantity <= 0) {
    return removeCartItem({ cartItemId: input.cartItemId, userId: input.userId, sessionId: input.sessionId });
  }

  const ownerCartId = await getOrCreateActiveCart(input);

  const { error } = await admin
    .from("cart_items")
    .update({ quantity: input.quantity })
    .eq("id", input.cartItemId)
    .eq("cart_id", ownerCartId);

  if (error) {
    throw error;
  }

  return getCurrentCart(input);
}

export async function removeCartItem(input: RemoveCartItemInput) {
  assertCartOwner(input);
  const admin = getAdminClient();
  const ownerCartId = await getOrCreateActiveCart(input);

  const { error } = await admin
    .from("cart_items")
    .delete()
    .eq("id", input.cartItemId)
    .eq("cart_id", ownerCartId);

  if (error) {
    throw error;
  }

  return getCurrentCart(input);
}

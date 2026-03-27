export type CartOwnerInput = {
  userId?: string | null;
  sessionId?: string | null;
};

export type ProductRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  price_cents: number;
  currency: string;
  active: boolean;
};

export type CartItemRow = {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: ProductRow;
};

export type CartRow = {
  id: string;
  user_id: string | null;
  session_id: string | null;
  status: "active" | "checked_out" | "abandoned";
  created_at: string;
  updated_at: string;
  items: CartItemRow[];
};

export type CartSummary = {
  id: string;
  userId: string | null;
  sessionId: string | null;
  status: CartRow["status"];
  items: Array<{
    id: string;
    productId: string;
    name: string;
    slug: string;
    imageUrl: string | null;
    unitPriceCents: number;
    currency: string;
    quantity: number;
    subtotalCents: number;
  }>;
  totalQuantity: number;
  subtotalCents: number;
  currency: string | null;
};

export type AddToCartInput = CartOwnerInput & {
  productId: string;
  quantity?: number;
};

export type UpdateCartItemInput = CartOwnerInput & {
  cartItemId: string;
  quantity: number;
};

export type RemoveCartItemInput = CartOwnerInput & {
  cartItemId: string;
};

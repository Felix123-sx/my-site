import { NextRequest } from "next/server";
import { removeCartItem, updateCartItem } from "@/lib/cart/service";
import { jsonError, resolveCartOwner } from "@/lib/cart/api";

type UpdateCartItemBody = {
  cartItemId?: string;
  quantity?: number;
};

type RemoveCartItemBody = {
  cartItemId?: string;
};

export async function PATCH(request: NextRequest) {
  try {
    const body = (await request.json()) as UpdateCartItemBody;

    if (!body.cartItemId || typeof body.quantity !== "number") {
      return jsonError("cartItemId and quantity are required.");
    }

    const owner = await resolveCartOwner(request, { createGuestSession: true });
    const cart = await updateCartItem({
      ...owner,
      cartItemId: body.cartItemId,
      quantity: body.quantity,
    });

    return Response.json({ cart });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update cart item.";
    return jsonError(message, 500);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = (await request.json()) as RemoveCartItemBody;

    if (!body.cartItemId) {
      return jsonError("cartItemId is required.");
    }

    const owner = await resolveCartOwner(request, { createGuestSession: true });
    const cart = await removeCartItem({
      ...owner,
      cartItemId: body.cartItemId,
    });

    return Response.json({ cart });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to remove cart item.";
    return jsonError(message, 500);
  }
}

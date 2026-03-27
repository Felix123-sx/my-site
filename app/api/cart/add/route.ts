import { NextRequest } from "next/server";
import { addToCart } from "@/lib/cart/service";
import { jsonError, resolveCartOwner } from "@/lib/cart/api";

type AddToCartBody = {
  productId?: string;
  quantity?: number;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AddToCartBody;

    if (!body.productId) {
      return jsonError("productId is required.");
    }

    const owner = await resolveCartOwner(request, { createGuestSession: true });
    const cart = await addToCart({
      ...owner,
      productId: body.productId,
      quantity: body.quantity,
    });

    return Response.json({ cart });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to add item to cart.";
    return jsonError(message, 500);
  }
}

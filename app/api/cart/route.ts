import { NextRequest } from "next/server";
import { getCurrentCart } from "@/lib/cart/service";
import { jsonError, resolveCartOwner } from "@/lib/cart/api";

export async function GET(request: NextRequest) {
  try {
    const owner = await resolveCartOwner(request);

    if (!owner.userId && !owner.sessionId) {
      return Response.json({ cart: null });
    }

    const cart = await getCurrentCart(owner);
    return Response.json({ cart });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load cart.";
    return jsonError(message, 500);
  }
}

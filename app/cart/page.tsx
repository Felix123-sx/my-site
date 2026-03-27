import { headers } from "next/headers";
import { CartClient } from "@/components/cart/cart-client";
import { getCurrentCart } from "@/lib/cart/service";
import { getCartSessionId } from "@/lib/cart/session";

export default async function CartPage() {
  const headerStore = await headers();
  const userId = headerStore.get("x-user-id");
  const sessionId = await getCartSessionId();
  const cart =
    userId || sessionId
      ? await getCurrentCart({
          userId,
          sessionId,
        })
      : null;

  return <CartClient initialCart={cart} />;
}

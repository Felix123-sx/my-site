import { NextRequest } from "next/server";
import { getCartSessionId, getOrCreateCartSessionId } from "@/lib/cart/session";
import type { CartOwnerInput } from "@/lib/cart/types";

export async function resolveCartOwner(request: NextRequest, options?: { createGuestSession?: boolean }) {
  const userId = request.headers.get("x-user-id");

  if (userId) {
    const existingSessionId = await getCartSessionId();
    return {
      userId,
      sessionId: existingSessionId,
    } satisfies CartOwnerInput;
  }

  if (options?.createGuestSession) {
    const sessionId = await getOrCreateCartSessionId();
    return {
      userId: null,
      sessionId,
    } satisfies CartOwnerInput;
  }

  return {
    userId: null,
    sessionId: await getCartSessionId(),
  } satisfies CartOwnerInput;
}

export function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

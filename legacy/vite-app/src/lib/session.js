const CART_SESSION_KEY = "cart_session_id";

export function getOrCreateGuestSessionId() {
  if (typeof window === "undefined") {
    return null;
  }

  const existing = window.localStorage.getItem(CART_SESSION_KEY);

  if (existing) {
    return existing;
  }

  const sessionId = crypto.randomUUID();
  window.localStorage.setItem(CART_SESSION_KEY, sessionId);
  return sessionId;
}

export function getGuestSessionId() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(CART_SESSION_KEY);
}

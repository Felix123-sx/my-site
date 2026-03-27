import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { getGuestSessionId, getOrCreateGuestSessionId } from "../lib/session";
import { trackAddToCart, trackRemoveFromCart } from "../lib/analytics";

const CartContext = createContext(null);

function fireAndForget(task) {
  void task.catch(() => {
    // Analytics should never block cart UX.
  });
}

async function getCurrentUserId() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return data.user?.id ?? null;
}

function buildCartRequestPayload(overrides = {}) {
  return {
    sessionId: getOrCreateGuestSessionId(),
    ...overrides,
  };
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [cartLoading, setCartLoading] = useState(true);
  const [cartError, setCartError] = useState("");

  async function refreshCart() {
    setCartLoading(true);
    setCartError("");

    try {
      const sessionId = getGuestSessionId();
      const userId = await getCurrentUserId();

      if (!sessionId && !userId) {
        setCart(null);
        return;
      }

      const query = new URLSearchParams();
      if (sessionId) query.set("sessionId", sessionId);
      if (userId) query.set("userId", userId);

      const response = await fetch(`/api/cart?${query.toString()}`);
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Failed to fetch cart.");
      }

      setCart(payload.cart || null);
    } catch (error) {
      setCartError(error.message || "Failed to fetch cart.");
    } finally {
      setCartLoading(false);
    }
  }

  useEffect(() => {
    void refreshCart();
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void refreshCart();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function addToCart(product, quantity = 1) {
    setCartError("");

    try {
      const userId = await getCurrentUserId();
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          buildCartRequestPayload({
            userId,
            productId: product.id,
            quantity,
          }),
        ),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Failed to add item.");
      }

      setCart(payload.cart || null);
      fireAndForget(
        trackAddToCart({
          product,
          quantity,
          userId,
        }),
      );
      return payload.cart || null;
    } catch (error) {
      setCartError(error.message || "Failed to add item.");
      throw error;
    }
  }

  async function removeFromCart(cartItemId) {
    setCartError("");

    try {
      const userId = await getCurrentUserId();
      const currentItem = cart?.items?.find((item) => item.id === cartItemId) || null;
      const response = await fetch("/api/cart/item", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          buildCartRequestPayload({
            userId,
            cartItemId,
          }),
        ),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Failed to remove item.");
      }

      setCart(payload.cart || null);
      if (currentItem) {
        fireAndForget(
          trackRemoveFromCart({
            item: currentItem,
            userId,
          }),
        );
      }
    } catch (error) {
      setCartError(error.message || "Failed to remove item.");
    }
  }

  async function updateQuantity(cartItemId, quantity) {
    setCartError("");

    try {
      const userId = await getCurrentUserId();
      const response = await fetch("/api/cart/item", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          buildCartRequestPayload({
            userId,
            cartItemId,
            quantity: Math.max(1, quantity),
          }),
        ),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Failed to update quantity.");
      }

      setCart(payload.cart || null);
    } catch (error) {
      setCartError(error.message || "Failed to update quantity.");
    }
  }

  async function clearCart() {
    setCartError("");

    try {
      const userId = await getCurrentUserId();
      const response = await fetch("/api/cart/clear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          buildCartRequestPayload({
            userId,
          }),
        ),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Failed to clear cart.");
      }

      setCart(payload.cart || null);
    } catch (error) {
      setCartError(error.message || "Failed to clear cart.");
    }
  }

  const cartItems = cart?.items || [];

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const cartTotal = useMemo(() => cart?.subtotal || "¥0", [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        cartLoading,
        cartError,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}

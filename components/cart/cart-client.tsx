"use client";

import { useEffect, useState } from "react";
import type { CartSummary } from "@/lib/cart/types";

type CartClientProps = {
  initialCart: CartSummary | null;
};

function formatCurrency(amountCents: number, currency: string | null) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency ?? "USD",
  }).format(amountCents / 100);
}

export function CartClient({ initialCart }: CartClientProps) {
  const [cart, setCart] = useState<CartSummary | null>(initialCart);
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setCart(initialCart);
  }, [initialCart]);

  async function updateQuantity(cartItemId: string, quantity: number) {
    setLoadingItemId(cartItemId);
    setMessage(null);

    try {
      const response = await fetch("/api/cart/item", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItemId, quantity }),
      });

      const payload = (await response.json()) as { cart?: CartSummary; error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to update quantity.");
      }

      setCart(payload.cart ?? null);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoadingItemId(null);
    }
  }

  async function removeItem(cartItemId: string) {
    setLoadingItemId(cartItemId);
    setMessage(null);

    try {
      const response = await fetch("/api/cart/item", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItemId }),
      });

      const payload = (await response.json()) as { cart?: CartSummary; error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to remove item.");
      }

      setCart(payload.cart ?? null);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoadingItemId(null);
    }
  }

  if (!cart || cart.items.length === 0) {
    return (
      <section className="cart-card empty-state">
        <h1>Your cart is empty</h1>
        <p className="muted">Products added here are stored in Supabase and stay attached to your user or guest session.</p>
      </section>
    );
  }

  return (
    <div className="cart-layout">
      <section className="cart-card">
        <h1>Current cart</h1>
        <p className="muted">Adjust quantities or remove products. Changes are saved to Supabase immediately.</p>
        <div className="cart-items">
          {cart.items.map((item) => (
            <article className="cart-row" key={item.id}>
              <div>
                <h2>{item.name}</h2>
                <p className="muted">SKU: {item.slug}</p>
                <p className="price">{formatCurrency(item.subtotalCents, item.currency)}</p>
              </div>
              <div className="line-actions">
                <input
                  aria-label={`Quantity for ${item.name}`}
                  className="quantity-input"
                  defaultValue={item.quantity}
                  min={1}
                  onBlur={(event) => {
                    const nextValue = Number(event.target.value);
                    if (!Number.isNaN(nextValue) && nextValue !== item.quantity) {
                      void updateQuantity(item.id, nextValue);
                    }
                  }}
                  type="number"
                />
                <button
                  className="ghost-button"
                  disabled={loadingItemId === item.id}
                  onClick={() => void removeItem(item.id)}
                  type="button"
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
        {message ? <p className="muted">{message}</p> : null}
      </section>

      <aside className="summary-card">
        <h2>Summary</h2>
        <div className="summary-list">
          <div className="summary-line">
            <span>Items</span>
            <span>{cart.totalQuantity}</span>
          </div>
          <div className="summary-line">
            <span>Subtotal</span>
            <strong>{formatCurrency(cart.subtotalCents, cart.currency)}</strong>
          </div>
        </div>
        <button className="button" type="button">
          Continue to checkout
        </button>
      </aside>
    </div>
  );
}

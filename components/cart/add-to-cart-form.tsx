"use client";

import { useState } from "react";

type AddToCartFormProps = {
  productId: string;
};

export function AddToCartForm({ productId }: AddToCartFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit() {
    setIsPending(true);
    setMessage(null);

    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error ?? "Failed to add item.");
      }

      setMessage("Added to cart");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="product-actions">
      <input
        aria-label="Quantity"
        className="quantity-input"
        min={1}
        onChange={(event) => setQuantity(Number(event.target.value))}
        type="number"
        value={quantity}
      />
      <button className="button" disabled={isPending} onClick={handleSubmit} type="button">
        {isPending ? "Adding..." : "Add to cart"}
      </button>
      {message ? <span className="muted">{message}</span> : null}
    </div>
  );
}

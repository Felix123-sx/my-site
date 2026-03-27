import { removeCartItem, updateCartItem } from "../_lib/cart.js";

export default async function handler(req, res) {
  try {
    if (req.method === "PATCH") {
      const { sessionId = null, userId = null, cartItemId, quantity } = req.body || {};

      if (!cartItemId || typeof quantity !== "number") {
        return res.status(400).json({ error: "cartItemId and quantity are required." });
      }

      const cart = await updateCartItem({ sessionId, userId, cartItemId, quantity });
      return res.status(200).json({ cart });
    }

    if (req.method === "DELETE") {
      const { sessionId = null, userId = null, cartItemId } = req.body || {};

      if (!cartItemId) {
        return res.status(400).json({ error: "cartItemId is required." });
      }

      const cart = await removeCartItem({ sessionId, userId, cartItemId });
      return res.status(200).json({ cart });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Failed to update cart item." });
  }
}

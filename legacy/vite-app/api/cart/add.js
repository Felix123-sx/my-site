import { addToCart } from "../_lib/cart.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { sessionId = null, userId = null, productId, quantity = 1 } = req.body || {};

    if (!productId) {
      return res.status(400).json({ error: "productId is required." });
    }

    if (!sessionId && !userId) {
      return res.status(400).json({ error: "sessionId or userId is required." });
    }

    const cart = await addToCart({ sessionId, userId, productId, quantity });
    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Failed to add item." });
  }
}

import { clearCart } from "../_lib/cart.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { sessionId = null, userId = null } = req.body || {};

    if (!sessionId && !userId) {
      return res.status(400).json({ error: "sessionId or userId is required." });
    }

    const cart = await clearCart({ sessionId, userId });
    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Failed to clear cart." });
  }
}

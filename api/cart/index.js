import { getCurrentCart } from "../_lib/cart.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { sessionId = null, userId = null } = req.query || {};

    if (!sessionId && !userId) {
      return res.status(200).json({ cart: null });
    }

    const cart = await getCurrentCart({ sessionId, userId });
    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Failed to load cart." });
  }
}

import { getAnalyticsDashboard } from "../_lib/analytics.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = await getAnalyticsDashboard();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Failed to load analytics dashboard." });
  }
}

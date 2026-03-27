import { trackAnalyticsEvent } from "../_lib/analytics.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await trackAnalyticsEvent(req.body);
    return res.status(200).json({ ok: true });
  } catch (error) {
    const message = error.message || "Failed to track event.";
    const status =
      message === "Invalid analytics payload." ||
      message === "Unsupported event name." ||
      message === "userId or sessionId is required."
        ? 400
        : 500;

    return res.status(status).json({ error: message });
  }
}

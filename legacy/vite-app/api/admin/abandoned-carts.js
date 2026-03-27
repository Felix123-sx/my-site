import { getSupabaseAdmin } from "../_lib/supabaseAdmin.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("abandoned_carts_view")
      .select("cart_id, user_id, session_id, user_email, status, cart_updated_at, last_activity_at, item_count, total_value_cents, items")
      .order("last_activity_at", { ascending: true });

    if (error) {
      throw error;
    }

    return res.status(200).json({
      carts: data || [],
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Failed to load abandoned carts." });
  }
}

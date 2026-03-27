import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/lib/supabase";

export const ADMIN_ACCESS_TOKEN_COOKIE = "admin_access_token";
export const ADMIN_REFRESH_TOKEN_COOKIE = "admin_refresh_token";

type AdminUserRecord = {
  user_id: string;
  email: string;
  full_name: string | null;
  role: string;
}

function getPublicSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
}

export function isAdminAuthConfigured() {
  return Boolean(getPublicSupabaseConfig() && supabaseAdmin);
}

export function getAdminBrowserAuthClient() {
  const config = getPublicSupabaseConfig();

  if (!config) {
    return null;
  }

  return createClient(config.url, config.anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function getAdminSession() {
  const config = getPublicSupabaseConfig();

  if (!config || !supabaseAdmin) {
    return null;
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ADMIN_ACCESS_TOKEN_COOKIE)?.value;

  if (!accessToken) {
    return null;
  }

  const authClient = createClient(config.url, config.anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const {
    data: { user },
    error: userError,
  } = await authClient.auth.getUser(accessToken);

  if (userError || !user) {
    return null;
  }

  const { data: adminUser, error: adminError } = await supabaseAdmin
    .from("admin_users")
    .select("user_id, email, full_name, role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminError || !adminUser) {
    return null;
  }

  return {
    user,
    adminUser: adminUser as AdminUserRecord,
    accessToken,
    refreshToken: cookieStore.get(ADMIN_REFRESH_TOKEN_COOKIE)?.value ?? null,
  };
}

export async function hasAdminSession() {
  return Boolean(await getAdminSession());
}

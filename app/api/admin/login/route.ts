import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_ACCESS_TOKEN_COOKIE,
  ADMIN_REFRESH_TOKEN_COOKIE,
  getAdminBrowserAuthClient,
  isAdminAuthConfigured,
} from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const authClient = getAdminBrowserAuthClient();

  if (!isAdminAuthConfigured() || !authClient || !supabaseAdmin) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const {
    data: { session },
    error: sessionError,
  } = await authClient.auth.signInWithPassword({
    email,
    password,
  });

  if (sessionError || !session?.user) {
    return NextResponse.redirect(new URL("/admin/login?error=credentials", request.url), 303);
  }

  const { data: adminUser } = await supabaseAdmin
    .from("admin_users")
    .select("user_id")
    .eq("user_id", session.user.id)
    .maybeSingle();

  if (!adminUser) {
    return NextResponse.redirect(new URL("/admin/login?error=permission", request.url), 303);
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_ACCESS_TOKEN_COOKIE, session.access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: session.expires_in,
  });
  cookieStore.set(ADMIN_REFRESH_TOKEN_COOKIE, session.refresh_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  return NextResponse.redirect(new URL("/admin", request.url), 303);
}

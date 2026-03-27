import Link from "next/link";
import { redirect } from "next/navigation";
import { hasAdminSession, isAdminAuthConfigured } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  if (await hasAdminSession()) {
    redirect("/admin");
  }

  const resolvedSearchParams = await searchParams;
  const error = resolvedSearchParams?.error;

  return (
    <section className="admin-login-shell">
      <div className="admin-login-card">
        <p className="eyebrow">Admin Access</p>
        <h1>管理员登录</h1>
        <p className="admin-login-copy">
          使用 Supabase Auth 的管理员邮箱和密码登录。登录成功后，系统还会去 `admin_users` 表确认你是否拥有后台权限。
        </p>
        <form action="/api/admin/login" className="admin-login-form" method="post">
          <label className="admin-field">
            <span>邮箱</span>
            <input name="email" type="email" placeholder="admin@northstar.com" required />
          </label>
          <label className="admin-field">
            <span>密码</span>
            <input name="password" type="password" placeholder="请输入管理员密码" required />
          </label>
          <button className="admin-login-button" type="submit">
            进入后台
          </button>
        </form>
        {error === "credentials" ? (
          <p className="admin-login-hint">邮箱或密码不正确，请重新输入。</p>
        ) : null}
        {error === "permission" ? (
          <p className="admin-login-hint">登录成功，但这个用户还没有被加入 `admin_users` 管理员名单。</p>
        ) : null}
        {!isAdminAuthConfigured() ? (
          <p className="admin-login-hint">
            当前还没有完成 Supabase 环境配置，请先设置公开 key 和 service role key。
          </p>
        ) : null}
        <Link className="admin-login-back" href="/">
          返回前台首页
        </Link>
      </div>
    </section>
  );
}

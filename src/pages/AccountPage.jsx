import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function formatDate(value) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

export default function AccountPage() {
  const { user, profile, signOut, updateProfile } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFullName(profile?.full_name || "");
  }, [profile]);

  async function handleProfileSave(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await updateProfile({ fullName });
      setMessage("资料已保存。");
    } catch (error) {
      setMessage(error.message || "保存失败，请稍后重试。");
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      setMessage(error.message || "退出失败，请稍后重试。");
    }
  }

  return (
    <div className="min-h-screen tone-base text-[var(--text)]">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 pb-18 pt-10 sm:px-6 md:pb-28 md:pt-16">
        <section className="max-w-3xl">
          <div className="eyebrow">My Account</div>
          <h1 className="font-editorial mt-5 text-5xl font-semibold text-[var(--ui-title)] md:text-7xl">
            账户中心
          </h1>
          <p className="mt-6 text-sm leading-8 text-[var(--ui-copy)] md:text-base">
            你可以在这里查看账户信息与角色，并更新公开资料中的姓名字段。
          </p>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px]">
          <form className="soft-tonal-card rounded-[2rem] p-8 md:p-10" onSubmit={handleProfileSave}>
            <div className="eyebrow">Profile</div>
            <div className="mt-8 space-y-5">
              <div>
                <div className="text-sm text-[var(--ui-copy)]">邮箱</div>
                <div className="mt-3 text-base text-[var(--ui-title)]">{user?.email || profile?.email || "—"}</div>
              </div>

              <div>
                <div className="text-sm text-[var(--ui-copy)]">姓名</div>
                <input
                  className="input-lux mt-3"
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="输入你的称呼"
                  type="text"
                  value={fullName}
                />
              </div>

              {message ? <div className="soft-tonal-panel rounded-[1.2rem] p-4 text-sm text-[var(--ui-title)]">{message}</div> : null}

              <button className="btn-primary" disabled={saving} type="submit">
                {saving ? "保存中..." : "保存资料"}
              </button>
            </div>
          </form>

          <aside className="soft-tonal-panel rounded-[2rem] p-6">
            <div className="eyebrow">Status</div>
            <div className="mt-6 space-y-4 text-sm text-[var(--ui-copy)]">
              <div className="flex items-center justify-between gap-4">
                <span>角色</span>
                <span className="font-semibold text-[var(--ui-title)]">{profile?.role || "customer"}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>注册时间</span>
                <span className="font-semibold text-[var(--ui-title)]">{formatDate(profile?.created_at)}</span>
              </div>
            </div>

            <button className="btn-secondary mt-8 w-full" onClick={handleSignOut} type="button">
              退出登录
            </button>
          </aside>
        </section>
      </main>
    </div>
  );
}

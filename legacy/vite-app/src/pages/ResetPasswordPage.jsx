import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { updatePassword, isAuthenticated, authLoading } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("两次输入的密码不一致。");
      return;
    }

    setSubmitting(true);
    setMessage("");

    try {
      await updatePassword(password);
      setMessage("密码已更新，正在跳转到账户页。");
      window.setTimeout(() => navigate("/account", { replace: true }), 1200);
    } catch (error) {
      setMessage(error.message || "重置密码失败，请重新打开邮件中的链接。");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen tone-base text-[var(--text)]">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-18 pt-10 sm:px-6 md:pb-28 md:pt-16">
        <div className="soft-tonal-card rounded-[2rem] p-8 md:p-10">
          <div className="eyebrow">New Password</div>
          <h1 className="font-editorial mt-5 text-5xl font-semibold text-[var(--ui-title)] md:text-7xl">
            重置密码
          </h1>
          <p className="mt-5 text-sm leading-8 text-[var(--ui-copy)]">
            通过邮件中的恢复链接进入此页后，Supabase 会建立恢复会话，你可以在这里设置新密码。
          </p>

          {!authLoading && !isAuthenticated ? (
            <div className="soft-tonal-panel mt-8 rounded-[1.2rem] p-4 text-sm text-[var(--ui-title)]">
              当前没有检测到恢复会话。请重新打开邮箱中的重置密码链接。
            </div>
          ) : (
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <div className="text-sm text-[var(--ui-copy)]">新密码</div>
                <input
                  className="input-lux mt-3"
                  minLength={6}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  type="password"
                  value={password}
                />
              </div>

              <div>
                <div className="text-sm text-[var(--ui-copy)]">确认新密码</div>
                <input
                  className="input-lux mt-3"
                  minLength={6}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                  type="password"
                  value={confirmPassword}
                />
              </div>

              {message ? <div className="soft-tonal-panel rounded-[1.2rem] p-4 text-sm text-[var(--ui-title)]">{message}</div> : null}

              <button className="btn-primary w-full" disabled={submitting} type="submit">
                {submitting ? "更新中..." : "更新密码"}
              </button>
            </form>
          )}

          <p className="mt-6 text-sm text-[var(--ui-copy)]">
            <Link to="/login" className="text-[var(--ui-title)] underline underline-offset-4">返回登录</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

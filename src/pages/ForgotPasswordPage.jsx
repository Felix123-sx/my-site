import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function ForgotPasswordPage() {
  const { sendPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      await sendPasswordReset(email);
      setMessage("重置密码邮件已发送，请检查你的邮箱。");
    } catch (error) {
      setMessage(error.message || "发送失败，请稍后重试。");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen tone-base text-[var(--text)]">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-18 pt-10 sm:px-6 md:pb-28 md:pt-16">
        <div className="soft-tonal-card rounded-[2rem] p-8 md:p-10">
          <div className="eyebrow">Reset Access</div>
          <h1 className="font-editorial mt-5 text-5xl font-semibold text-[var(--ui-title)] md:text-7xl">
            忘记密码
          </h1>
          <p className="mt-5 text-sm leading-8 text-[var(--ui-copy)]">
            输入注册邮箱，我们会发送一个重置链接到你的邮箱，链接会跳回本站的重置密码页面。
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <div className="text-sm text-[var(--ui-copy)]">邮箱</div>
              <input
                className="input-lux mt-3"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                type="email"
                value={email}
              />
            </div>

            {message ? <div className="soft-tonal-panel rounded-[1.2rem] p-4 text-sm text-[var(--ui-title)]">{message}</div> : null}

            <button className="btn-primary w-full" disabled={submitting} type="submit">
              {submitting ? "发送中..." : "发送重置邮件"}
            </button>
          </form>

          <p className="mt-6 text-sm text-[var(--ui-copy)]">
            想起密码了？ <Link to="/login" className="text-[var(--ui-title)] underline underline-offset-4">返回登录</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

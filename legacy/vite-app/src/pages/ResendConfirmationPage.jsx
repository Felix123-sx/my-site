import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function ResendConfirmationPage() {
  const { resendConfirmation } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      await resendConfirmation(email);
      setMessage("新的确认邮件已发送，请打开最新邮件中的链接。");
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
          <div className="eyebrow">Resend Confirmation</div>
          <h1 className="font-editorial mt-5 text-5xl font-semibold text-[var(--ui-title)] md:text-7xl">
            重新发送确认邮件
          </h1>
          <p className="mt-5 text-sm leading-8 text-[var(--ui-copy)]">
            如果之前的确认链接已过期或已经失效，在这里输入注册邮箱，我们会重新发送一封最新的确认邮件。
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

            {message && !message.includes("失败") ? (
              <div className="soft-tonal-card rounded-[1.2rem] p-4 text-sm leading-7 text-[var(--ui-copy)]">
                <div>下一步建议：</div>
                <div className="mt-2">1. 先检查收件箱里的最新邮件</div>
                <div>2. 如果没看到，再检查垃圾邮箱 / Spam</div>
                <div>3. 只打开最新那封确认邮件里的链接</div>
                <div>4. 点击前确认本地站点仍在运行</div>
              </div>
            ) : null}

            <button className="btn-primary w-full" disabled={submitting} type="submit">
              {submitting ? "发送中..." : "重新发送确认邮件"}
            </button>
          </form>

          <p className="mt-6 text-sm text-[var(--ui-copy)]">
            想直接登录？ <Link to="/login" className="text-[var(--ui-title)] underline underline-offset-4">返回登录</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

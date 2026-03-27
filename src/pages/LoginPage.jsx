import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const redirectPath = location.state?.from || "/account";
  const confirmed = new URLSearchParams(location.search).get("confirmed") === "1";
  const authHashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const authHashErrorCode = authHashParams.get("error_code");
  const authHashErrorDescription = authHashParams.get("error_description");

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      await signIn({ email, password });
      navigate(redirectPath, { replace: true });
    } catch (error) {
      setMessage(error.message || "登录失败，请检查邮箱和密码。");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen tone-base text-[var(--text)]">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-18 pt-10 sm:px-6 md:pb-28 md:pt-16">
        <div className="soft-tonal-card rounded-[2rem] p-8 md:p-10">
          <div className="eyebrow">Sign In</div>
          <h1 className="font-editorial mt-5 text-5xl font-semibold text-[var(--ui-title)] md:text-7xl">
            登录你的账户
          </h1>
          <p className="mt-5 text-sm leading-8 text-[var(--ui-copy)]">
            使用邮箱和密码登录，购物车与账户资料会跟随你的会话持续保存。
          </p>

          {confirmed ? (
            <div className="soft-tonal-panel mt-6 rounded-[1.2rem] p-4 text-sm text-[var(--ui-title)]">
              邮箱已验证成功，现在可以登录了。
            </div>
          ) : null}

          {authHashErrorCode === "otp_expired" ? (
            <div className="soft-tonal-panel mt-6 rounded-[1.2rem] p-4 text-sm text-[var(--ui-title)]">
              确认链接已过期或已被使用。请重新注册，或重新请求一封新的确认邮件。
              <div className="mt-4">
                <Link to="/resend-confirmation" className="text-[var(--ui-title)] underline underline-offset-4">
                  重新发送确认邮件
                </Link>
              </div>
            </div>
          ) : null}

          {!confirmed && authHashErrorCode && authHashErrorCode !== "otp_expired" ? (
            <div className="soft-tonal-panel mt-6 rounded-[1.2rem] p-4 text-sm text-[var(--ui-title)]">
              {decodeURIComponent((authHashErrorDescription || authHashErrorCode).replaceAll("+", " "))}
            </div>
          ) : null}

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

            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm text-[var(--ui-copy)]">密码</div>
                <Link to="/forgot-password" className="text-sm text-[var(--ui-title)] underline underline-offset-4">
                  忘记密码？
                </Link>
              </div>
              <input
                className="input-lux mt-3"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="请输入密码"
                required
                type="password"
                value={password}
              />
            </div>

            {message ? <div className="soft-tonal-panel rounded-[1.2rem] p-4 text-sm text-[var(--ui-title)]">{message}</div> : null}

            <button className="btn-primary w-full" disabled={submitting} type="submit">
              {submitting ? "登录中..." : "登录"}
            </button>
          </form>

          <p className="mt-6 text-sm text-[var(--ui-copy)]">
            还没有账户？ <Link to="/signup" className="text-[var(--ui-title)] underline underline-offset-4">立即注册</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

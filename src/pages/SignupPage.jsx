import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const data = await signUp({ email, password, fullName });

      if (data.session) {
        navigate("/account", { replace: true });
      } else {
        setMessage("注册成功，请先去邮箱完成验证后再登录。");
      }
    } catch (error) {
      setMessage(error.message || "注册失败，请稍后重试。");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen tone-base text-[var(--text)]">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-18 pt-10 sm:px-6 md:pb-28 md:pt-16">
        <div className="soft-tonal-card rounded-[2rem] p-8 md:p-10">
          <div className="eyebrow">Create Account</div>
          <h1 className="font-editorial mt-5 text-5xl font-semibold text-[var(--ui-title)] md:text-7xl">
            创建账户
          </h1>
          <p className="mt-5 text-sm leading-8 text-[var(--ui-copy)]">
            注册成功后，数据库会自动在 `public.profiles` 中为你创建一条 `customer` 角色资料。
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <div className="text-sm text-[var(--ui-copy)]">姓名</div>
              <input
                className="input-lux mt-3"
                onChange={(event) => setFullName(event.target.value)}
                placeholder="你的称呼"
                required
                type="text"
                value={fullName}
              />
            </div>

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
              <div className="text-sm text-[var(--ui-copy)]">密码</div>
              <input
                className="input-lux mt-3"
                minLength={6}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="至少 6 位"
                required
                type="password"
                value={password}
              />
            </div>

            {message ? <div className="soft-tonal-panel rounded-[1.2rem] p-4 text-sm text-[var(--ui-title)]">{message}</div> : null}

            <button className="btn-primary w-full" disabled={submitting} type="submit">
              {submitting ? "创建中..." : "注册"}
            </button>
          </form>

          <p className="mt-6 text-sm text-[var(--ui-copy)]">
            已经有账户？ <Link to="/login" className="text-[var(--ui-title)] underline underline-offset-4">去登录</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { supabase } from "../lib/supabase";

function getCallbackParams() {
  const url = new URL(window.location.href);
  const search = url.searchParams;
  const hash = new URLSearchParams(url.hash.replace(/^#/, ""));

  return {
    code: search.get("code"),
    type: search.get("type") || hash.get("type"),
    error: search.get("error") || hash.get("error"),
    errorDescription: search.get("error_description") || hash.get("error_description"),
  };
}

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("正在处理验证链接...");

  useEffect(() => {
    let cancelled = false;

    async function handleCallback() {
      const params = getCallbackParams();

      try {
        if (params.error) {
          throw new Error(params.errorDescription || params.error);
        }

        if (params.code) {
          const { error } = await supabase.auth.exchangeCodeForSession(params.code);

          if (error) {
            throw error;
          }
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (cancelled) {
          return;
        }

        if (params.type === "recovery") {
          setMessage("恢复链接验证成功，正在前往重置密码页面...");
          window.setTimeout(() => navigate("/reset-password", { replace: true }), 900);
          return;
        }

        if (session?.user) {
          setMessage("邮箱已确认，正在进入账户页...");
          window.setTimeout(() => navigate("/account", { replace: true }), 900);
          return;
        }

        setMessage("邮箱已确认，请登录你的账户。");
        window.setTimeout(() => navigate("/login?confirmed=1", { replace: true }), 900);
      } catch (error) {
        if (cancelled) {
          return;
        }

        setMessage(error.message || "验证链接处理失败，请重新尝试。");
      }
    }

    void handleCallback();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <div className="min-h-screen tone-base text-[var(--text)]">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-18 pt-10 sm:px-6 md:pb-28 md:pt-16">
        <div className="soft-tonal-card rounded-[2rem] p-8 md:p-10">
          <div className="eyebrow">Auth Callback</div>
          <h1 className="font-editorial mt-5 text-5xl font-semibold text-[var(--ui-title)] md:text-7xl">
            正在确认
          </h1>
          <p className="mt-5 text-sm leading-8 text-[var(--ui-copy)]">
            {message}
          </p>
        </div>
      </main>
    </div>
  );
}

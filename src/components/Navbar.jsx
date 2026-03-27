import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const { cartCount } = useCart();
  const { isAuthenticated, profile, authLoading, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = location.pathname === "/";

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const homeLinks = [
    { label: "首页", href: "#home", type: "anchor" },
    { label: "精选", href: "#featured", type: "anchor" },
    { label: "系列", href: "#categories", type: "anchor" },
    { label: "品牌", href: "/about", type: "link" },
  ];

  const innerLinks = [
    { label: "首页", href: "/", type: "link" },
    { label: "产品", href: "/shop", type: "link" },
    { label: "品牌", href: "/about", type: "link" },
    { label: "咨询", href: "/contact", type: "link" },
  ];

  const links = isHome ? homeLinks : innerLinks;

  async function handleSignOut() {
    await signOut();
  }

  return (
    <>
      <div className="border-b border-[rgba(111,39,53,0.12)] bg-[rgba(42,20,23,0.94)] px-4 py-2 text-center text-[11px] uppercase tracking-[0.18em] text-[#f1e2df] sm:px-6">
        隐私包装 · 身体友好材料 · 安全支付
      </div>

      <header className="sticky top-0 z-50 border-b border-[rgba(111,39,53,0.12)] glass-panel">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <div>
              <div className="font-editorial text-lg font-semibold tracking-[0.03em] text-[#fff4f8] sm:text-[1.2rem]">
                Velure Health
              </div>
              <div className="hidden text-[10px] uppercase tracking-[0.24em] text-[var(--ui-kicker)] sm:block">
                PREMIUM INTIMATE WELLNESS
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-[13px] tracking-[0.03em] text-[var(--ui-copy)] md:flex">
            {links.map((item) =>
              item.type === "anchor" ? (
                <a key={item.label} href={item.href} className="transition hover:text-[var(--ui-title)]">
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} to={item.href} className="transition hover:text-[var(--ui-title)]">
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {!authLoading ? (
              isAuthenticated ? (
                <>
                  {profile?.role === "admin" ? (
                    <>
                      <Link to="/analytics" className="nav-text-link">
                        Analytics
                      </Link>
                      <Link to="/admin/abandoned-carts" className="nav-text-link">
                        弃单
                      </Link>
                    </>
                  ) : null}
                  <Link to="/account" className="nav-account-link">
                    {profile?.full_name || profile?.email || "我的账户"}
                  </Link>
                  <button type="button" onClick={() => void handleSignOut()} className="nav-text-button">
                    退出
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-text-link">
                    登录
                  </Link>
                  <Link to="/signup" className="nav-account-link">
                    注册
                  </Link>
                </>
              )
            ) : null}
            <Link to="/cart" className="nav-cart-link">
              购物袋
              <span className="nav-cart-count">{cartCount}</span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={mobileOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(111,39,53,0.16)] bg-[rgba(255,250,246,0.8)] text-sm text-[var(--ui-title)] md:hidden"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {mobileOpen ? (
          <div className="mx-4 mb-4 rounded-[1.4rem] border border-[rgba(255,235,245,0.1)] bg-[rgba(255,247,251,0.94)] p-4 ambient-shadow md:hidden sm:mx-6">
            <div className="flex flex-col gap-1 text-sm text-[#6a5863]">
              {links.map((item) =>
                item.type === "anchor" ? (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-3 transition hover:bg-[rgba(111,39,53,0.08)] hover:text-[var(--ui-title)]"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-3 transition hover:bg-[rgba(111,39,53,0.08)] hover:text-[var(--ui-title)]"
                  >
                    {item.label}
                  </Link>
                )
              )}

              <div className="mt-3 border-t border-[rgba(111,39,53,0.12)] pt-3">
                {!authLoading ? (
                  isAuthenticated ? (
                    <>
                      {profile?.role === "admin" ? (
                        <>
                          <Link
                            to="/analytics"
                            onClick={() => setMobileOpen(false)}
                            className="mb-3 block rounded-xl bg-[rgba(255,250,246,0.9)] px-4 py-3 text-center text-sm text-[var(--ui-title)]"
                          >
                            Analytics
                          </Link>
                          <Link
                            to="/admin/abandoned-carts"
                            onClick={() => setMobileOpen(false)}
                            className="mb-3 block rounded-xl bg-[rgba(255,250,246,0.9)] px-4 py-3 text-center text-sm text-[var(--ui-title)]"
                          >
                            弃单
                          </Link>
                        </>
                      ) : null}
                      <Link
                        to="/account"
                        onClick={() => setMobileOpen(false)}
                        className="mb-3 flex items-center justify-between rounded-xl bg-[rgba(111,39,53,0.08)] px-4 py-3 text-[var(--ui-title)]"
                      >
                        <span>我的账户</span>
                        <span className="text-xs text-[var(--ui-copy)]">{profile?.role || "customer"}</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          void handleSignOut();
                          setMobileOpen(false);
                        }}
                        className="mb-3 block w-full rounded-xl bg-[rgba(255,250,246,0.9)] px-4 py-3 text-center text-sm text-[var(--ui-title)]"
                      >
                        退出登录
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setMobileOpen(false)}
                        className="mb-3 block rounded-xl bg-[rgba(255,250,246,0.9)] px-4 py-3 text-center text-sm text-[var(--ui-title)]"
                      >
                        登录
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setMobileOpen(false)}
                        className="mb-3 block rounded-xl bg-[rgba(111,39,53,0.08)] px-4 py-3 text-center text-sm text-[var(--ui-title)]"
                      >
                        注册
                      </Link>
                    </>
                  )
                ) : null}

                <Link
                  to="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-[rgba(111,39,53,0.08)] px-4 py-3 text-[var(--ui-title)]"
                >
                  <span>购物袋</span>
                  <span className="nav-cart-count">{cartCount}</span>
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 block rounded-xl bg-[#5f2330] px-4 py-3 text-center text-sm text-[#fff8f3]"
                >
                  在线咨询
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}

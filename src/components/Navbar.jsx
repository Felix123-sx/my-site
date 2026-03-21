import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const location = useLocation();
  const { cartCount } = useCart();
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

  return (
    <>
      <div className="border-b border-[rgba(184,144,90,0.1)] bg-[rgba(42,33,29,0.92)] px-4 py-2 text-center text-[11px] uppercase tracking-[0.18em] text-[#f3e4d1] sm:px-6">
        Discreet packaging · Body-safe materials · Secure checkout
      </div>

      <header className="sticky top-0 z-50 border-b border-[rgba(184,144,90,0.12)] glass-panel">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <div>
              <div className="font-editorial text-lg font-semibold tracking-[0.03em] text-[#241914] sm:text-[1.2rem]">
                Velure Health
              </div>
              <div className="hidden text-[10px] uppercase tracking-[0.24em] text-[#9a897e] sm:block">
                PRIVATE WELLNESS
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-[13px] tracking-[0.03em] text-[#6d5d52] md:flex">
            {links.map((item) =>
              item.type === "anchor" ? (
                <a key={item.label} href={item.href} className="transition hover:text-[#241914]">
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} to={item.href} className="transition hover:text-[#241914]">
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(184,144,90,0.18)] bg-[rgba(255,251,245,0.72)] text-sm text-[#241914] md:hidden"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {mobileOpen ? (
          <div className="mx-4 mb-4 rounded-[1.4rem] border border-[rgba(184,144,90,0.12)] bg-[rgba(255,251,245,0.95)] p-4 ambient-shadow md:hidden sm:mx-6">
            <div className="flex flex-col gap-1 text-sm text-[#65564d]">
              {links.map((item) =>
                item.type === "anchor" ? (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-3 transition hover:bg-[rgba(184,144,90,0.08)] hover:text-[#241914]"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-3 transition hover:bg-[rgba(184,144,90,0.08)] hover:text-[#241914]"
                  >
                    {item.label}
                  </Link>
                )
              )}

              <div className="mt-3 border-t border-[rgba(184,144,90,0.12)] pt-3">
                <Link
                  to="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-[rgba(184,144,90,0.08)] px-4 py-3 text-[#241914]"
                >
                  <span>购物袋</span>
                  <span className="nav-cart-count">{cartCount}</span>
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 block rounded-xl bg-[#2a211d] px-4 py-3 text-center text-sm text-[#fff8f1]"
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

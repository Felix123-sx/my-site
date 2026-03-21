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
    { label: "系列", href: "#categories", type: "anchor" },
    { label: "产品", href: "/shop", type: "link" },
    { label: "承诺", href: "#trust", type: "anchor" },
  ];

  const innerLinks = [
    { label: "首页", href: "/", type: "link" },
    { label: "产品", href: "/shop", type: "link" },
    { label: "咨询", href: "/contact", type: "link" },
  ];

  const links = isHome ? homeLinks : innerLinks;

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 glass-panel">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <div className="font-editorial text-[15px] font-semibold tracking-[0.01em] text-[#2f342e] sm:text-base">
            Velure Health
          </div>
          <div className="hidden h-3 w-px bg-black/10 sm:block" />
          <div className="hidden text-[11px] tracking-[0.08em] text-[#7a8378] sm:block">
            PRIVATE WELLNESS
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-[13px] text-[#667064] md:flex">
          {links.map((item) =>
            item.type === "anchor" ? (
              <a key={item.label} href={item.href} className="transition hover:text-[#2f342e]">
                {item.label}
              </a>
            ) : (
              <Link key={item.label} to={item.href} className="transition hover:text-[#2f342e]">
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/cart" className="nav-cart-link">
            购物车
            <span className="nav-cart-count">{cartCount}</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
          aria-expanded={mobileOpen}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/8 bg-white/80 text-sm text-[#2f342e] md:hidden"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen ? (
        <div className="mx-4 mb-4 rounded-[1.25rem] border border-black/5 bg-white/95 p-4 ambient-shadow md:hidden sm:mx-6">
          <div className="flex flex-col gap-1 text-sm text-[#5b645b]">
            {links.map((item) =>
              item.type === "anchor" ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 transition hover:bg-[#f6f5f1] hover:text-[#2f342e]"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 transition hover:bg-[#f6f5f1] hover:text-[#2f342e]"
                >
                  {item.label}
                </Link>
              )
            )}

            <div className="mt-3 border-t border-black/6 pt-3">
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-xl bg-[#f6f5f1] px-4 py-3 text-[#2f342e]"
              >
                <span>购物车</span>
                <span className="nav-cart-count">{cartCount}</span>
              </Link>

              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-3 block rounded-xl bg-[#536257] px-4 py-3 text-center text-sm text-[#ebfcee]"
              >
                在线咨询
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

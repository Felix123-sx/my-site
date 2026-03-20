import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const location = useLocation();
  const { cartCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-stone-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="block">
          <div className="text-base font-semibold tracking-wide sm:text-lg">
            Velure Health
          </div>
          <div className="text-[10px] text-stone-500 sm:text-xs">
            Sexual Wellness · Private Care
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-stone-600 md:flex">
          {isHome ? (
            <>
              <a href="#home" className="hover:text-stone-950">首页</a>
              <a href="#categories" className="hover:text-stone-950">品牌系列</a>
              <Link to="/shop" className="hover:text-stone-950">全部产品</Link>
              <a href="#trust" className="hover:text-stone-950">品牌承诺</a>
              <Link to="/contact" className="hover:text-stone-950">在线咨询</Link>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-stone-950">首页</Link>
              <Link to="/shop" className="hover:text-stone-950">全部产品</Link>
              <Link to="/category/润滑护理" className="hover:text-stone-950">品牌系列</Link>
              <Link to="/contact" className="hover:text-stone-950">在线咨询</Link>
            </>
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/cart"
            className="rounded-xl border border-stone-300 px-4 py-2 text-sm text-stone-700 hover:bg-stone-100"
          >
            购物车 ({cartCount})
          </Link>

          <Link
            to="/contact"
            className="rounded-xl bg-stone-900 px-4 py-2 text-sm text-white hover:opacity-90"
          >
            咨询客服
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-stone-300 bg-white text-stone-700 md:hidden"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-stone-200 bg-stone-50 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm text-stone-700">
            {isHome ? (
              <>
                <a href="#home" onClick={() => setMobileOpen(false)}>首页</a>
                <a href="#categories" onClick={() => setMobileOpen(false)}>品牌系列</a>
                <Link to="/shop" onClick={() => setMobileOpen(false)}>全部产品</Link>
                <a href="#trust" onClick={() => setMobileOpen(false)}>品牌承诺</a>
                <Link to="/contact" onClick={() => setMobileOpen(false)}>在线咨询</Link>
              </>
            ) : (
              <>
                <Link to="/" onClick={() => setMobileOpen(false)}>首页</Link>
                <Link to="/shop" onClick={() => setMobileOpen(false)}>全部产品</Link>
                <Link to="/category/润滑护理" onClick={() => setMobileOpen(false)}>品牌系列</Link>
                <Link to="/contact" onClick={() => setMobileOpen(false)}>在线咨询</Link>
              </>
            )}

            <div className="mt-2 flex flex-col gap-3">
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-stone-300 px-4 py-3 text-center"
              >
                购物车 ({cartCount})
              </Link>

              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl bg-stone-900 px-4 py-3 text-center text-white"
              >
                咨询客服
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
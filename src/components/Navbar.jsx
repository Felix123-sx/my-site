import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const location = useLocation();
  const { cartCount } = useCart();

  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-stone-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="block">
          <div className="text-lg font-semibold tracking-wide">Velure Health</div>
          <div className="text-xs text-stone-500">
            Sexual Wellness · Private Care · Trusted Experience
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-stone-600 md:flex">
          {isHome ? (
            <>
              <a href="#home" className="hover:text-stone-950">首页</a>
              <a href="#categories" className="hover:text-stone-950">品牌系列</a>
              <a href="#products" className="hover:text-stone-950">精选产品</a>
              <a href="#trust" className="hover:text-stone-950">品牌承诺</a>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-stone-950">首页</Link>
              <Link to="/category/润滑护理" className="hover:text-stone-950">品牌系列</Link>
              <Link to="/" className="hover:text-stone-950">精选产品</Link>
              <Link to="/" className="hover:text-stone-950">品牌承诺</Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="rounded-xl border border-stone-300 px-4 py-2 text-sm text-stone-700 hover:bg-stone-100"
          >
            购物车 ({cartCount})
          </Link>

          {isHome ? (
            <a
              href="#products"
              className="rounded-xl bg-stone-900 px-4 py-2 text-sm text-white hover:opacity-90"
            >
              探索品牌
            </a>
          ) : (
            <Link
              to="/"
              className="rounded-xl bg-stone-900 px-4 py-2 text-sm text-white hover:opacity-90"
            >
              返回首页
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
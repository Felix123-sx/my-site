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

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="rounded-xl border border-stone-300 px-4 py-2 text-sm text-stone-700 hover:bg-stone-100"
          >
            购物车 ({cartCount})
          </Link>

          {isHome ? (
            <Link
              to="/shop"
              className="rounded-xl bg-stone-900 px-4 py-2 text-sm text-white hover:opacity-90"
            >
              浏览产品
            </Link>
          ) : (
            <Link
              to="/contact"
              className="rounded-xl bg-stone-900 px-4 py-2 text-sm text-white hover:opacity-90"
            >
              咨询客服
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
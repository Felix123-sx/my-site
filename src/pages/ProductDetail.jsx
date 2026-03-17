import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id) || products[0];
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Link to="/" className="text-stone-500 hover:text-stone-900 hover:underline">
            首页
          </Link>

          <span className="text-stone-400">/</span>

          <Link
            to={`/category/${encodeURIComponent(product.category)}`}
            className="text-stone-500 hover:text-stone-900 hover:underline"
          >
            {product.category}
          </Link>

          <span className="text-stone-400">/</span>

          <span className="font-medium text-stone-900">{product.name}</span>
        </div>

        <section className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="aspect-square rounded-[2rem] border border-stone-200 bg-gradient-to-br from-stone-100 via-stone-100 to-stone-200 shadow-sm" />

            <div className="mt-4 grid grid-cols-4 gap-4">
              <div className="aspect-square rounded-2xl border border-stone-300 bg-stone-200" />
              <div className="aspect-square rounded-2xl border border-stone-200 bg-stone-100" />
              <div className="aspect-square rounded-2xl border border-stone-200 bg-stone-100" />
              <div className="aspect-square rounded-2xl border border-stone-200 bg-stone-100" />
            </div>
          </div>

          <div>
            <div className="inline-flex rounded-full bg-white px-3 py-1 text-xs text-stone-600 ring-1 ring-stone-200">
              {product.tag}
            </div>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              {product.name}
            </h1>

            <p className="mt-4 max-w-xl text-base leading-8 text-stone-600">
              {product.intro}
            </p>

            <div className="mt-6 text-3xl font-semibold">{product.price}</div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm shadow-sm">
                ✓ 温和舒适体验
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm shadow-sm">
                ✓ 身体友好表达
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm shadow-sm">
                ✓ 隐私包装发货
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm shadow-sm">
                ✓ 适合健康向网站展示
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center rounded-xl border border-stone-300 bg-white">
                <button
                  className="px-4 py-3 text-sm text-stone-600"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>

                <div className="px-5 py-3 text-sm">{quantity}</div>

                <button
                  className="px-4 py-3 text-sm text-stone-600"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>

              <button
                className="rounded-xl border border-stone-300 bg-white px-6 py-3 text-sm hover:bg-stone-100"
                onClick={() => addToCart(product, quantity)}
              >
                加入购物车
              </button>

              <button className="rounded-xl bg-stone-900 px-6 py-3 text-sm text-white hover:opacity-90">
                立即购买
              </button>
            </div>

            <div className="mt-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-medium text-stone-900">配送与隐私说明</div>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                所有订单均采用隐私包装发货，外箱不显示敏感商品信息。
                网站表达以健康护理和成熟审美为主，尽可能降低用户购买时的心理负担。
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
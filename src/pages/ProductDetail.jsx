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

  const points = ["温和舒适", "身体友好", "隐私包装", "更克制的展示方式"];

  return (
    <div className="min-h-screen tone-base text-[#2f342e]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 md:pb-24 md:pt-14">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#5b645b]">
          <Link to="/" className="hover:text-[#2f342e]">
            首页
          </Link>

          <span>/</span>

          <Link
            to={`/category/${encodeURIComponent(product.category)}`}
            className="hover:text-[#2f342e]"
          >
            {product.category}
          </Link>

          <span>/</span>

          <span className="text-[#2f342e]">{product.name}</span>
        </div>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <div className="tone-mid aspect-square rounded-[1.9rem] bg-gradient-to-br from-[#f7f6f1] via-[#f2f3ee] to-[#dde8de]" />

            <div className="mt-4 grid grid-cols-4 gap-3">
              <div className="tone-card aspect-square rounded-[1rem] shadow-[inset_0_0_0_1px_rgba(47,52,46,0.06)]" />
              <div className="tone-card aspect-square rounded-[1rem] shadow-[inset_0_0_0_1px_rgba(47,52,46,0.06)]" />
              <div className="tone-card aspect-square rounded-[1rem] shadow-[inset_0_0_0_1px_rgba(47,52,46,0.06)]" />
              <div className="tone-card aspect-square rounded-[1rem] shadow-[inset_0_0_0_1px_rgba(47,52,46,0.06)]" />
            </div>
          </div>

          <div>
            <div className="eyebrow">{product.tag}</div>

            <h1 className="font-editorial mt-4 text-4xl font-semibold md:text-5xl">
              {product.name}
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#5b645b] md:text-base md:leading-8">
              {product.intro}
            </p>

            <div className="mt-6 text-3xl font-semibold text-[#2f342e]">
              {product.price}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {points.map((item) => (
                <div key={item} className="tone-card rounded-[1rem] px-4 py-4 text-sm">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="flex items-center rounded-full bg-white px-2 py-2 shadow-[inset_0_0_0_1px_rgba(47,52,46,0.08)]">
                <button
                  className="h-10 w-10 rounded-full text-sm text-[#5b645b]"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  −
                </button>

                <div className="min-w-[44px] text-center text-sm text-[#2f342e]">
                  {quantity}
                </div>

                <button
                  className="h-10 w-10 rounded-full text-sm text-[#5b645b]"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>

              <button
                className="btn-secondary"
                onClick={() => addToCart(product, quantity)}
              >
                加入购物车
              </button>

              <button className="btn-primary">立即购买</button>
            </div>

            <div className="tone-low mt-8 rounded-[1.5rem] p-6">
              <div className="text-sm font-medium text-[#2f342e]">
                配送与隐私说明
              </div>
              <p className="mt-3 text-sm leading-7 text-[#5b645b] md:leading-8">
                订单采用隐私包装发货，外箱不显示敏感商品信息。
                页面表达尽量保持温和与克制，减少额外心理负担。
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

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

  const points = ["隐私包装", "甄选材质", "舒适体验", "更克制的表达方式"];

  return (
    <div className="min-h-screen tone-base text-[#261b17]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-18 pt-10 sm:px-6 md:pb-28 md:pt-16">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#7d675a]">
          <Link to="/" className="hover:text-[#241914]">首页</Link>
          <span>/</span>
          <Link to={`/category/${encodeURIComponent(product.category)}`} className="hover:text-[#241914]">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#241914]">{product.name}</span>
        </div>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <div className="relative overflow-hidden rounded-[2rem]">
              <div className="aspect-[4/5] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7),transparent_28%),linear-gradient(145deg,#efd9ba_0%,#cfb096_25%,#8f6c5d_58%,#2c211d_100%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(22,14,12,0.26)] via-transparent to-[rgba(255,255,255,0.16)]" />
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              <div className="tone-card aspect-square rounded-[1rem] bg-[linear-gradient(145deg,#f2dfca,#bf9a72)]" />
              <div className="tone-card aspect-square rounded-[1rem] bg-[linear-gradient(145deg,#f7ebdf,#ceb39a)]" />
              <div className="tone-card aspect-square rounded-[1rem] bg-[linear-gradient(145deg,#ead6c0,#8f6d5b)]" />
              <div className="tone-card aspect-square rounded-[1rem] bg-[linear-gradient(145deg,#f6ede4,#baa08e)]" />
            </div>
          </div>

          <div>
            <div className="eyebrow">{product.tag}</div>

            <h1 className="font-editorial mt-5 text-5xl font-semibold leading-none text-[#241914] md:text-7xl">
              {product.name}
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-8 text-[#65564d] md:text-base">
              {product.intro}
            </p>

            <div className="mt-7 text-3xl font-semibold text-[#241914] md:text-4xl">
              {product.price}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {points.map((item) => (
                <div key={item} className="tone-card rounded-[1.2rem] px-4 py-4 text-sm text-[#241914]">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="flex items-center rounded-full bg-[rgba(255,252,248,0.82)] px-2 py-2 shadow-[inset_0_0_0_1px_rgba(184,144,90,0.14)]">
                <button
                  className="h-10 w-10 rounded-full text-sm text-[#65564d]"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  −
                </button>
                <div className="min-w-[44px] text-center text-sm text-[#241914]">{quantity}</div>
                <button
                  className="h-10 w-10 rounded-full text-sm text-[#65564d]"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>

              <button className="btn-secondary" onClick={() => addToCart(product, quantity)}>
                加入购物袋
              </button>
              <button className="btn-primary">立即购买</button>
            </div>

            <div className="tone-low mt-8 rounded-[1.8rem] p-6">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a897e]">Private Delivery</div>
              <p className="mt-3 text-sm leading-8 text-[#65564d]">
                所有订单均采用隐私包装发货，外箱不显示敏感商品信息。
                我们希望整段购买过程都保持 calm, discreet and premium。
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

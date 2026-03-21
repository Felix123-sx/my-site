import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  } = useCart();

  const getPriceNumber = (price) => {
    return Number(String(price).replace(/[^\d.]/g, ""));
  };

  return (
    <div className="min-h-screen tone-base text-[#2f342e]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 md:pb-24 md:pt-14">
        <section className="max-w-3xl">
          <div className="eyebrow">Cart</div>
          <h1 className="font-editorial mt-4 text-4xl font-semibold md:text-6xl">
            购物车
          </h1>
          <p className="mt-5 text-sm leading-7 text-[#5b645b] md:text-base md:leading-8">
            查看已加入的商品，并完成本次选择。
          </p>
        </section>

        <section className="mt-10">
          {cartItems.length === 0 ? (
            <div className="tone-card rounded-[1.75rem] p-8 md:p-10">
              <div className="eyebrow">Empty Cart</div>
              <h2 className="font-editorial mt-4 text-3xl font-semibold md:text-5xl">
                你还没有加入任何商品
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#5b645b] md:leading-8">
                可以先前往产品页继续浏览，或联系在线客服了解更多信息。
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/shop" className="btn-primary">
                  浏览产品
                </Link>

                <Link to="/contact" className="btn-secondary">
                  在线咨询
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              <div>
                <div className="tone-low mb-6 flex flex-col gap-4 rounded-[1.5rem] p-5 md:flex-row md:items-center md:justify-between md:p-6">
                  <div>
                    <div className="text-sm text-[#5b645b]">当前商品</div>
                    <div className="mt-1 text-lg font-semibold">
                      共 {cartCount} 件商品
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/shop"
                      className="rounded-full bg-white px-4 py-2 text-sm text-[#2f342e] shadow-[inset_0_0_0_1px_rgba(47,52,46,0.06)]"
                    >
                      继续浏览
                    </Link>

                    <button
                      className="rounded-full bg-white px-4 py-2 text-sm text-[#2f342e] shadow-[inset_0_0_0_1px_rgba(47,52,46,0.06)]"
                      onClick={clearCart}
                    >
                      清空购物车
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const unitPrice = getPriceNumber(item.price);
                    const subtotal = unitPrice * item.quantity;

                    return (
                      <div key={item.id} className="tone-card rounded-[1.5rem] p-5 md:p-6">
                        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                          <div className="flex gap-4">
                            <div className="h-24 w-24 rounded-[1rem] bg-gradient-to-br from-[#f4f4ef] to-[#d6e7d9]" />

                            <div>
                              <div className="eyebrow">{item.tag}</div>

                              <h3 className="font-editorial mt-3 text-2xl font-semibold">
                                {item.name}
                              </h3>

                              <p className="mt-2 text-sm text-[#5b645b]">
                                单价：{item.price}
                              </p>
                              <p className="mt-1 text-sm text-[#5b645b]">
                                分类：{item.category}
                              </p>

                              <Link
                                to={`/product/${item.id}`}
                                className="mt-3 inline-block text-sm text-[#2f342e] underline underline-offset-4"
                              >
                                查看详情
                              </Link>
                            </div>
                          </div>

                          <div className="flex flex-col items-start gap-4 md:items-end">
                            <div className="text-left md:text-right">
                              <div className="text-sm text-[#5b645b]">小计</div>
                              <div className="mt-1 text-xl font-semibold">¥{subtotal}</div>
                            </div>

                            <div className="flex items-center rounded-full bg-[#f6f5f1] px-2 py-2">
                              <button
                                className="h-10 w-10 rounded-full text-sm text-[#5b645b]"
                                onClick={() =>
                                  updateQuantity(item.id, Math.max(1, item.quantity - 1))
                                }
                              >
                                −
                              </button>

                              <div className="min-w-[44px] text-center text-sm">
                                {item.quantity}
                              </div>

                              <button
                                className="h-10 w-10 rounded-full text-sm text-[#5b645b]"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>

                            <button
                              className="rounded-full bg-[#e6e2d8] px-4 py-2 text-sm text-[#2f342e]"
                              onClick={() => removeFromCart(item.id)}
                            >
                              移除
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <aside className="tone-low h-fit rounded-[1.75rem] p-6">
                <div className="eyebrow">Summary</div>
                <h2 className="font-editorial mt-4 text-3xl font-semibold">
                  订单摘要
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between text-sm text-[#5b645b]">
                    <span>商品件数</span>
                    <span>{cartCount} 件</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-[#5b645b]">
                    <span>商品种类</span>
                    <span>{cartItems.length} 种</span>
                  </div>

                  <div className="border-t border-[#2f342e]/10 pt-4">
                    <div className="flex items-center justify-between text-lg font-semibold">
                      <span>合计</span>
                      <span>¥{cartTotal}</span>
                    </div>
                  </div>
                </div>

                <button className="btn-primary mt-6 w-full">去结算</button>

                <Link
                  to="/contact"
                  className="btn-secondary mt-3 w-full"
                >
                  在线咨询
                </Link>

                <div className="tone-card mt-6 rounded-[1.2rem] p-4">
                  <div className="text-sm font-medium text-[#2f342e]">说明</div>
                  <p className="mt-2 text-sm leading-7 text-[#5b645b]">
                    当前页面为前端演示版，价格与商品信息仅用于展示。
                  </p>
                </div>
              </aside>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

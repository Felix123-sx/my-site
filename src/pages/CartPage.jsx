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
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <section className="max-w-3xl">
          <div className="text-sm text-stone-500">Cart</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            购物车
          </h1>
          <p className="mt-4 text-base leading-8 text-stone-600">
            在这里查看已加入的商品，调整数量，或继续浏览更多产品。
          </p>
        </section>

        <section className="mt-10">
          {cartItems.length === 0 ? (
            <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm md:p-10">
              <div className="text-sm text-stone-500">购物车为空</div>
              <h2 className="mt-2 text-3xl font-semibold">你还没有加入任何商品</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600">
                你可以先前往产品页浏览不同系列，也可以进入分类页查看更适合你的产品。
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="rounded-xl bg-stone-900 px-6 py-3 text-sm text-white hover:opacity-90"
                >
                  去逛产品页
                </Link>

                <Link
                  to="/contact"
                  className="rounded-xl border border-stone-300 bg-white px-6 py-3 text-sm hover:bg-stone-100"
                >
                  咨询客服
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              <div>
                <div className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-sm text-stone-500">当前商品</div>
                    <div className="mt-1 text-lg font-semibold">
                      共 {cartCount} 件商品
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/shop"
                      className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm hover:bg-stone-100"
                    >
                      继续购物
                    </Link>

                    <button
                      className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm hover:bg-stone-100"
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
                      <div
                        key={item.id}
                        className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm"
                      >
                        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                          <div className="flex gap-5">
                            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-stone-100 to-stone-200" />

                            <div>
                              <div className="inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600">
                                {item.tag}
                              </div>

                              <h3 className="mt-3 text-xl font-semibold">{item.name}</h3>
                              <p className="mt-2 text-sm text-stone-600">
                                单价：{item.price}
                              </p>
                              <p className="mt-1 text-sm text-stone-600">
                                分类：{item.category}
                              </p>

                              <Link
                                to={`/product/${item.id}`}
                                className="mt-3 inline-block text-sm text-stone-700 underline underline-offset-4 hover:text-stone-900"
                              >
                                查看详情
                              </Link>
                            </div>
                          </div>

                          <div className="flex flex-col items-start gap-4 md:items-end">
                            <div className="text-right">
                              <div className="text-sm text-stone-500">小计</div>
                              <div className="mt-1 text-xl font-semibold">¥{subtotal}</div>
                            </div>

                            <div className="flex items-center rounded-xl border border-stone-300 bg-white">
                              <button
                                className="px-4 py-3 text-sm text-stone-600"
                                onClick={() =>
                                  updateQuantity(item.id, Math.max(1, item.quantity - 1))
                                }
                              >
                                -
                              </button>

                              <div className="px-5 py-3 text-sm">{item.quantity}</div>

                              <button
                                className="px-4 py-3 text-sm text-stone-600"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>

                            <button
                              className="rounded-xl border border-stone-300 px-4 py-2 text-sm hover:bg-stone-100"
                              onClick={() => removeFromCart(item.id)}
                            >
                              移除商品
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <aside className="h-fit rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
                <div className="text-sm text-stone-500">订单摘要</div>
                <h2 className="mt-2 text-2xl font-semibold">结算信息</h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between text-sm text-stone-600">
                    <span>商品件数</span>
                    <span>{cartCount} 件</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-stone-600">
                    <span>商品种类</span>
                    <span>{cartItems.length} 种</span>
                  </div>

                  <div className="border-t border-stone-200 pt-4">
                    <div className="flex items-center justify-between text-lg font-semibold">
                      <span>合计</span>
                      <span>¥{cartTotal}</span>
                    </div>
                  </div>
                </div>

                <button className="mt-6 w-full rounded-xl bg-stone-900 px-5 py-3 text-sm text-white hover:opacity-90">
                  去结算
                </button>

                <Link
                  to="/contact"
                  className="mt-3 block w-full rounded-xl border border-stone-300 px-5 py-3 text-center text-sm hover:bg-stone-100"
                >
                  咨询客服
                </Link>

                <div className="mt-6 rounded-2xl bg-stone-50 p-4">
                  <div className="text-sm font-medium text-stone-900">温馨提示</div>
                  <p className="mt-2 text-sm leading-7 text-stone-600">
                    当前购物车为前端演示版，价格与商品信息仅用于展示。后续可继续接入真实支付与订单流程。
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
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

  const getPriceNumber = (price) => Number(String(price).replace(/[^\d.]/g, ""));

  return (
    <div className="min-h-screen tone-base text-[#261b17]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-18 pt-10 sm:px-6 md:pb-28 md:pt-16">
        <section className="max-w-3xl">
          <div className="eyebrow">Bag</div>
          <h1 className="font-editorial mt-5 text-5xl font-semibold text-[#241914] md:text-7xl">
            购物袋
          </h1>
          <p className="mt-6 text-sm leading-8 text-[#65564d] md:text-base">
            在这里确认你的选择，并继续进入更私密、平静的购买流程。
          </p>
        </section>

        <section className="mt-10">
          {cartItems.length === 0 ? (
            <div className="tone-card rounded-[2rem] p-8 md:p-10">
              <div className="eyebrow">Empty Bag</div>
              <h2 className="font-editorial mt-4 text-4xl font-semibold text-[#241914] md:text-6xl">
                你还没有加入任何商品
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-[#65564d]">
                可以先前往产品页继续浏览，或联系在线客服了解更多信息。
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/shop" className="btn-primary">浏览产品</Link>
                <Link to="/contact" className="btn-secondary">在线咨询</Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
              <div>
                <div className="tone-low mb-6 flex flex-col gap-4 rounded-[1.8rem] p-5 md:flex-row md:items-center md:justify-between md:p-6">
                  <div>
                    <div className="text-sm text-[#65564d]">当前商品</div>
                    <div className="mt-1 text-lg font-semibold text-[#241914]">共 {cartCount} 件商品</div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/shop"
                      className="rounded-full bg-[rgba(255,252,248,0.85)] px-4 py-2 text-sm text-[#241914] shadow-[inset_0_0_0_1px_rgba(184,144,90,0.14)]"
                    >
                      继续浏览
                    </Link>
                    <button
                      className="rounded-full bg-[rgba(255,252,248,0.85)] px-4 py-2 text-sm text-[#241914] shadow-[inset_0_0_0_1px_rgba(184,144,90,0.14)]"
                      onClick={clearCart}
                    >
                      清空购物袋
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const unitPrice = getPriceNumber(item.price);
                    const subtotal = unitPrice * item.quantity;

                    return (
                      <div key={item.id} className="tone-card rounded-[1.8rem] p-5 md:p-6">
                        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                          <div className="flex gap-4">
                            <div className="h-28 w-24 rounded-[1rem] bg-[linear-gradient(145deg,#f1dbc0,#b88b5e_85%)]" />

                            <div>
                              <div className="eyebrow">{item.tag}</div>
                              <h3 className="font-editorial mt-3 text-[1.9rem] font-semibold leading-none text-[#241914]">
                                {item.name}
                              </h3>
                              <p className="mt-2 text-sm text-[#65564d]">单价：{item.price}</p>
                              <p className="mt-1 text-sm text-[#65564d]">分类：{item.category}</p>
                              <Link
                                to={`/product/${item.id}`}
                                className="mt-3 inline-block text-sm text-[#241914] underline underline-offset-4"
                              >
                                查看详情
                              </Link>
                            </div>
                          </div>

                          <div className="flex flex-col items-start gap-4 md:items-end">
                            <div className="text-left md:text-right">
                              <div className="text-sm text-[#65564d]">小计</div>
                              <div className="mt-1 text-xl font-semibold text-[#241914]">¥{subtotal}</div>
                            </div>

                            <div className="flex items-center rounded-full bg-[rgba(255,252,248,0.82)] px-2 py-2 shadow-[inset_0_0_0_1px_rgba(184,144,90,0.14)]">
                              <button
                                className="h-10 w-10 rounded-full text-sm text-[#65564d]"
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              >
                                −
                              </button>
                              <div className="min-w-[44px] text-center text-sm">{item.quantity}</div>
                              <button
                                className="h-10 w-10 rounded-full text-sm text-[#65564d]"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>

                            <button
                              className="rounded-full bg-[rgba(184,144,90,0.12)] px-4 py-2 text-sm text-[#241914]"
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

              <aside className="tone-low h-fit rounded-[2rem] p-6">
                <div className="eyebrow">Summary</div>
                <h2 className="font-editorial mt-5 text-4xl font-semibold text-[#241914]">
                  订单摘要
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between text-sm text-[#65564d]">
                    <span>商品件数</span>
                    <span>{cartCount} 件</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-[#65564d]">
                    <span>商品种类</span>
                    <span>{cartItems.length} 种</span>
                  </div>
                  <div className="border-t border-[rgba(184,144,90,0.18)] pt-4">
                    <div className="flex items-center justify-between text-lg font-semibold text-[#241914]">
                      <span>合计</span>
                      <span>¥{cartTotal}</span>
                    </div>
                  </div>
                </div>

                <button className="btn-primary mt-6 w-full">去结算</button>
                <Link to="/contact" className="btn-secondary mt-3 w-full">在线咨询</Link>

                <div className="tone-card mt-6 rounded-[1.35rem] p-4">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[#9a897e]">Note</div>
                  <p className="mt-2 text-sm leading-7 text-[#65564d]">
                    当前购物流程为前端演示版，价格与商品信息仅用于展示。
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

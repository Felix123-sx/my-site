import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
  } = useCart();

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="max-w-3xl">
          <div className="text-sm text-stone-500">Cart</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            购物车
          </h1>
          <p className="mt-4 text-base leading-8 text-stone-600">
            查看已加入购物车的商品，并调整数量。
          </p>
        </div>

        <section className="mt-10">
          {cartItems.length === 0 ? (
            <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">购物车还是空的</h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                你还没有添加任何商品。
              </p>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600">
                          {item.tag}
                        </div>
                        <h3 className="mt-3 text-xl font-semibold">{item.name}</h3>
                        <p className="mt-2 text-sm text-stone-600">{item.price}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
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
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="rounded-xl border border-stone-300 px-4 py-2 text-sm hover:bg-stone-100"
                          onClick={() => removeFromCart(item.id)}
                        >
                          移除
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm h-fit">
                <div className="text-sm text-stone-500">订单摘要</div>
                <h2 className="mt-2 text-2xl font-semibold">总计</h2>

                <div className="mt-6 flex items-center justify-between text-lg font-semibold">
                  <span>合计</span>
                  <span>¥{cartTotal}</span>
                </div>

                <button className="mt-6 w-full rounded-xl bg-stone-900 px-5 py-3 text-sm text-white hover:opacity-90">
                  去结算
                </button>

                <button
                  className="mt-3 w-full rounded-xl border border-stone-300 px-5 py-3 text-sm hover:bg-stone-100"
                  onClick={clearCart}
                >
                  清空购物车
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
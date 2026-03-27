import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function formatMoney(amountCents) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format((amountCents || 0) / 100);
}

function formatDate(value) {
  return new Date(value).toLocaleString("zh-CN");
}

export default function AbandonedCartsPage() {
  const { profile, authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [carts, setCarts] = useState([]);

  const isAdmin = profile?.role === "admin";

  useEffect(() => {
    if (authLoading || !isAdmin) {
      return;
    }

    let mounted = true;

    async function loadCarts() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/admin/abandoned-carts");
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || "Failed to load abandoned carts.");
        }

        if (mounted) {
          setCarts(payload.carts || []);
        }
      } catch (nextError) {
        if (mounted) {
          setError(nextError.message || "Failed to load abandoned carts.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadCarts();

    return () => {
      mounted = false;
    };
  }, [authLoading, isAdmin]);

  const totalValue = useMemo(
    () => carts.reduce((sum, cart) => sum + Number(cart.total_value_cents || 0), 0),
    [carts],
  );

  if (authLoading) {
    return (
      <div className="min-h-screen tone-base text-[var(--text)]">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-20 text-sm text-[var(--text-soft)]">正在验证访问权限...</main>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen tone-base text-[var(--text)]">
        <Navbar />
        <main className="mx-auto max-w-5xl px-4 pb-18 pt-10 sm:px-6 md:pb-28 md:pt-16">
          <div className="soft-tonal-card rounded-[2rem] p-8 md:p-10">
            <div className="eyebrow">Restricted</div>
            <h1 className="font-editorial mt-5 text-5xl font-semibold text-[var(--ui-title)] md:text-7xl">
              弃单页面仅限管理员
            </h1>
            <p className="mt-5 text-sm leading-8 text-[var(--ui-copy)]">
              当前账户角色不是 `admin`，因此无法查看弃单清单。
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen tone-base text-[var(--text)]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-18 pt-10 sm:px-6 md:pb-28 md:pt-16">
        <section className="max-w-4xl">
          <div className="eyebrow">Abandoned Carts</div>
          <h1 className="font-editorial mt-5 text-5xl font-semibold text-[var(--ui-title)] md:text-7xl">
            弃单列表
          </h1>
          <p className="mt-6 text-sm leading-8 text-[var(--ui-copy)] md:text-base">
            这里显示过去 24 小时以上未更新、购物车内有商品、但还没有生成订单的购物车。
          </p>
        </section>

        {loading ? (
          <section className="soft-tonal-card mt-10 rounded-[2rem] p-8 md:p-10">
            <div className="eyebrow">Loading</div>
            <p className="mt-4 text-sm text-[var(--ui-copy)]">正在读取弃单数据...</p>
          </section>
        ) : error ? (
          <section className="soft-tonal-card mt-10 rounded-[2rem] p-8 md:p-10">
            <div className="eyebrow">Error</div>
            <p className="mt-4 text-sm text-[var(--ui-copy)]">{error}</p>
          </section>
        ) : (
          <>
            <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div className="soft-tonal-card rounded-[1.7rem] p-6">
                <div className="text-sm text-[var(--ui-copy)]">弃单数量</div>
                <div className="mt-3 text-4xl font-semibold text-[var(--ui-title)]">{carts.length}</div>
              </div>
              <div className="soft-tonal-card rounded-[1.7rem] p-6">
                <div className="text-sm text-[var(--ui-copy)]">潜在回收金额</div>
                <div className="mt-3 text-4xl font-semibold text-[var(--ui-title)]">{formatMoney(totalValue)}</div>
              </div>
              <div className="soft-tonal-card rounded-[1.7rem] p-6">
                <div className="text-sm text-[var(--ui-copy)]">规则</div>
                <div className="mt-3 text-lg font-semibold text-[var(--ui-title)]">24 小时未更新 + 无订单</div>
              </div>
            </section>

            <section className="mt-8 space-y-4">
              {carts.map((cart) => (
                <article key={cart.cart_id} className="soft-tonal-panel rounded-[2rem] p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="eyebrow">{cart.user_email ? "Registered user" : "Guest session"}</div>
                      <h2 className="font-editorial mt-4 text-3xl font-semibold text-[var(--ui-title)]">
                        {cart.user_email || cart.session_id}
                      </h2>
                      <div className="mt-4 grid gap-2 text-sm text-[var(--ui-copy)]">
                        <div>购物车 ID：{cart.cart_id}</div>
                        <div>最后活动时间：{formatDate(cart.last_activity_at)}</div>
                        <div>商品数量：{cart.item_count}</div>
                        <div>总金额：{formatMoney(cart.total_value_cents)}</div>
                      </div>
                    </div>

                    <div className="soft-tonal-card rounded-[1.4rem] p-4 lg:min-w-[320px]">
                      <div className="text-sm font-semibold text-[var(--ui-title)]">购物车商品</div>
                      <div className="mt-4 space-y-3">
                        {(cart.items || []).map((item) => (
                          <div key={`${cart.cart_id}-${item.productId}`} className="flex items-start justify-between gap-4 text-sm">
                            <div>
                              <div className="text-[var(--ui-title)]">{item.name}</div>
                              <div className="text-[var(--ui-copy)]">x {item.quantity}</div>
                            </div>
                            <div className="text-right text-[var(--ui-copy)]">
                              <div>{formatMoney(item.unitPriceCents)}</div>
                              <div>{formatMoney(item.subtotalCents)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {carts.length === 0 ? (
                <div className="soft-tonal-card rounded-[2rem] p-8 md:p-10">
                  <div className="eyebrow">No abandoned carts</div>
                  <p className="mt-4 text-sm leading-8 text-[var(--ui-copy)]">
                    当前没有符合“24 小时未更新且无订单”的弃单购物车。
                  </p>
                </div>
              ) : null}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

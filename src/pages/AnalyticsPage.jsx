import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function formatNumber(value) {
  return new Intl.NumberFormat("zh-CN").format(value || 0);
}

function formatMoney(amountCents) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format((amountCents || 0) / 100);
}

function formatEventName(value) {
  return value.replaceAll("_", " ");
}

export default function AnalyticsPage() {
  const { profile, authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dashboard, setDashboard] = useState(null);

  const isAdmin = profile?.role === "admin";

  useEffect(() => {
    if (authLoading || !isAdmin) {
      return;
    }

    let mounted = true;

    async function loadDashboard() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/analytics/dashboard");
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || "Failed to load analytics.");
        }

        if (mounted) {
          setDashboard(payload);
        }
      } catch (nextError) {
        if (mounted) {
          setError(nextError.message || "Failed to load analytics.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadDashboard();

    return () => {
      mounted = false;
    };
  }, [authLoading, isAdmin]);

  const maxTrendValue = useMemo(() => {
    return Math.max(
      1,
      ...(dashboard?.trends || []).map((item) =>
        Math.max(item.product_view, item.add_to_cart, item.begin_checkout, item.purchase),
      ),
    );
  }, [dashboard]);

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
              Analytics 仅限管理员
            </h1>
            <p className="mt-5 text-sm leading-8 text-[var(--ui-copy)]">
              当前账户角色不是 `admin`，因此不会显示埋点分析面板。
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
          <div className="eyebrow">Analytics Dashboard</div>
          <h1 className="font-editorial mt-5 text-5xl font-semibold text-[var(--ui-title)] md:text-7xl">
            产品行为分析
          </h1>
          <p className="mt-6 text-sm leading-8 text-[var(--ui-copy)] md:text-base">
            这里展示最近 30 天的商品浏览、加入购物袋、移除、开始结账和购买事件概况。
          </p>
        </section>

        {loading ? (
          <section className="soft-tonal-card mt-10 rounded-[2rem] p-8 md:p-10">
            <div className="eyebrow">Loading</div>
            <p className="mt-4 text-sm text-[var(--ui-copy)]">正在读取 analytics 数据...</p>
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
                <div className="text-sm text-[var(--ui-copy)]">商品浏览</div>
                <div className="mt-3 text-4xl font-semibold text-[var(--ui-title)]">{formatNumber(dashboard?.overview?.productViews)}</div>
              </div>
              <div className="soft-tonal-card rounded-[1.7rem] p-6">
                <div className="text-sm text-[var(--ui-copy)]">加入购物袋</div>
                <div className="mt-3 text-4xl font-semibold text-[var(--ui-title)]">{formatNumber(dashboard?.overview?.addToCart)}</div>
              </div>
              <div className="soft-tonal-card rounded-[1.7rem] p-6">
                <div className="text-sm text-[var(--ui-copy)]">开始结账</div>
                <div className="mt-3 text-4xl font-semibold text-[var(--ui-title)]">{formatNumber(dashboard?.overview?.beginCheckout)}</div>
              </div>
              <div className="soft-tonal-card rounded-[1.7rem] p-6">
                <div className="text-sm text-[var(--ui-copy)]">购买完成</div>
                <div className="mt-3 text-4xl font-semibold text-[var(--ui-title)]">{formatNumber(dashboard?.overview?.purchases)}</div>
              </div>
              <div className="soft-tonal-card rounded-[1.7rem] p-6">
                <div className="text-sm text-[var(--ui-copy)]">移除购物袋</div>
                <div className="mt-3 text-4xl font-semibold text-[var(--ui-title)]">{formatNumber(dashboard?.overview?.removeFromCart)}</div>
              </div>
              <div className="soft-tonal-card rounded-[1.7rem] p-6">
                <div className="text-sm text-[var(--ui-copy)]">唯一访客</div>
                <div className="mt-3 text-4xl font-semibold text-[var(--ui-title)]">{formatNumber(dashboard?.overview?.uniqueUsers)}</div>
              </div>
            </section>

            <section className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="soft-tonal-panel rounded-[2rem] p-6">
                <div className="eyebrow">Trend</div>
                <h2 className="font-editorial mt-4 text-4xl font-semibold text-[var(--ui-title)]">最近 14 天趋势</h2>
                <div className="mt-8 grid gap-4">
                  {(dashboard?.trends || []).map((item) => (
                    <div key={item.date}>
                      <div className="mb-2 flex items-center justify-between text-xs text-[var(--ui-copy)]">
                        <span>{item.date}</span>
                        <span>
                          浏览 {item.product_view} / 加购 {item.add_to_cart} / 结账 {item.begin_checkout} / 购买 {item.purchase}
                        </span>
                      </div>
                      <div className="analytics-bars">
                        <span className="analytics-bar analytics-bar-view" style={{ width: `${(item.product_view / maxTrendValue) * 100}%` }} />
                        <span className="analytics-bar analytics-bar-cart" style={{ width: `${(item.add_to_cart / maxTrendValue) * 100}%` }} />
                        <span className="analytics-bar analytics-bar-checkout" style={{ width: `${(item.begin_checkout / maxTrendValue) * 100}%` }} />
                        <span className="analytics-bar analytics-bar-purchase" style={{ width: `${(item.purchase / maxTrendValue) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="soft-tonal-panel rounded-[2rem] p-6">
                <div className="eyebrow">Top Products</div>
                <h2 className="font-editorial mt-4 text-4xl font-semibold text-[var(--ui-title)]">热门商品</h2>
                <div className="mt-6 space-y-4">
                  {(dashboard?.productPerformance || []).map((item) => (
                    <div key={item.productId} className="soft-tonal-card rounded-[1.4rem] p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-sm text-[var(--ui-copy)]">{item.category}</div>
                          <div className="mt-1 text-lg font-semibold text-[var(--ui-title)]">{item.name}</div>
                        </div>
                        <div className="text-right text-sm text-[var(--ui-copy)]">
                          <div>浏览 {formatNumber(item.productViews)}</div>
                          <div>加购 {formatNumber(item.addToCart)}</div>
                          <div>购买 {formatNumber(item.purchases)}</div>
                          <div className="mt-1 font-semibold text-[var(--ui-title)]">{formatMoney(item.revenueCents)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="soft-tonal-panel mt-8 rounded-[2rem] p-6">
              <div className="eyebrow">Recent Events</div>
              <h2 className="font-editorial mt-4 text-4xl font-semibold text-[var(--ui-title)]">最近事件</h2>
              <div className="mt-6 overflow-hidden rounded-[1.4rem] border border-[rgba(255,240,248,0.08)]">
                <div className="analytics-table analytics-table-head">
                  <div>事件</div>
                  <div>产品</div>
                  <div>身份</div>
                  <div>页面</div>
                  <div>时间</div>
                </div>
                {(dashboard?.recentEvents || []).map((event) => (
                  <div key={event.id} className="analytics-table">
                    <div>{formatEventName(event.eventName)}</div>
                    <div>{event.metadata?.name || event.productId || "—"}</div>
                    <div className="analytics-table-mono">{String(event.actor).slice(0, 16)}</div>
                    <div>{event.path || "—"}</div>
                    <div>{new Date(event.createdAt).toLocaleString("zh-CN")}</div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

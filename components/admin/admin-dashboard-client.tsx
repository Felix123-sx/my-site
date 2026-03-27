"use client";

import { useState } from "react";
import type { ProductRow } from "@/lib/cart/types";

type CartStatus = "active" | "checked_out" | "abandoned";
type OrderStatus = "pending" | "paid" | "fulfilled" | "cancelled";
type RangeKey = "7d" | "30d" | "90d" | "custom";

type CartRecord = {
  id: string;
  status: CartStatus;
  created_at: string;
  updated_at: string;
};

type OrderRecord = {
  id: string;
  status: OrderStatus;
  currency: string;
  subtotal_cents: number;
  created_at: string;
};

type OrderItemRecord = {
  order_id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  subtotal_cents: number;
  created_at: string;
};

export type AdminDashboardPayload = {
  usingFallback: boolean;
  products: ProductRow[];
  carts: CartRecord[];
  orders: OrderRecord[];
  orderItems: OrderItemRecord[];
};

type Props = {
  initialData: AdminDashboardPayload;
  initialRange: "7d" | "30d" | "90d";
};

type KpiCard = {
  label: string;
  value: string;
  detail: string;
  trend: string;
  icon: string;
  tone: "violet" | "blue" | "cyan" | "green";
};

function formatCurrency(amountCents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amountCents / 100);
}

function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("zh-CN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function toInputDate(value: Date) {
  return `${value.getFullYear()}-${`${value.getMonth() + 1}`.padStart(2, "0")}-${`${value.getDate()}`.padStart(2, "0")}`;
}

function getRangeDays(range: "7d" | "30d" | "90d") {
  if (range === "90d") {
    return 90;
  }

  if (range === "30d") {
    return 30;
  }

  return 7;
}

function buildTrendSeries(orders: OrderRecord[], carts: CartRecord[], from: Date, to: Date) {
  const dayMap = new Map<string, { label: string; revenue: number; orders: number; carts: number }>();
  const cursor = new Date(from);

  while (cursor <= to) {
    const key = cursor.toISOString().slice(0, 10);
    dayMap.set(key, {
      label: new Intl.DateTimeFormat("zh-CN", {
        month: "numeric",
        day: "numeric",
      }).format(cursor),
      revenue: 0,
      orders: 0,
      carts: 0,
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  for (const order of orders) {
    const key = new Date(order.created_at).toISOString().slice(0, 10);
    const bucket = dayMap.get(key);

    if (!bucket) {
      continue;
    }

    bucket.orders += 1;

    if (order.status === "paid" || order.status === "fulfilled") {
      bucket.revenue += order.subtotal_cents;
    }
  }

  for (const cart of carts) {
    const key = new Date(cart.created_at).toISOString().slice(0, 10);
    const bucket = dayMap.get(key);

    if (!bucket) {
      continue;
    }

    bucket.carts += 1;
  }

  return Array.from(dayMap.values());
}

export function AdminDashboardClient({ initialData, initialRange }: Props) {
  const today = startOfDay(new Date());
  const initialFrom = new Date(today);
  initialFrom.setDate(initialFrom.getDate() - (getRangeDays(initialRange) - 1));

  const [range, setRange] = useState<RangeKey>(initialRange);
  const [fromDate, setFromDate] = useState(toInputDate(initialFrom));
  const [toDate, setToDate] = useState(toInputDate(today));
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");

  const rangeOptions: Array<{ key: "7d" | "30d" | "90d"; label: string }> = [
    { key: "7d", label: "近 7 天" },
    { key: "30d", label: "近 30 天" },
    { key: "90d", label: "近 90 天" },
  ];

  const activeFrom = startOfDay(new Date(fromDate));
  const activeTo = startOfDay(new Date(toDate));
  const safeFrom = Number.isNaN(activeFrom.getTime()) ? initialFrom : activeFrom;
  const safeTo = Number.isNaN(activeTo.getTime()) ? today : activeTo;
  const normalizedTo = safeTo < safeFrom ? safeFrom : safeTo;
  const lowerSearch = search.trim().toLowerCase();

  const inRange = (value: string) => {
    const date = new Date(value);
    return startOfDay(date) >= safeFrom && startOfDay(date) <= normalizedTo;
  };

  const filteredOrdersBase = initialData.orders.filter((order) => inRange(order.created_at));
  const filteredOrders = filteredOrdersBase.filter((order) => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesSearch =
      lowerSearch.length === 0 ||
      order.id.toLowerCase().includes(lowerSearch) ||
      order.status.toLowerCase().includes(lowerSearch);

    return matchesStatus && matchesSearch;
  });
  const filteredCarts = initialData.carts.filter((cart) => inRange(cart.created_at));
  const filteredOrderItemsBase = initialData.orderItems.filter((item) => inRange(item.created_at));
  const filteredOrderIds = new Set(filteredOrders.map((order) => order.id));
  const filteredOrderItems = filteredOrderItemsBase.filter((item) => filteredOrderIds.has(item.order_id));
  const activeProducts = initialData.products.filter((product) => product.active);
  const inactiveProducts = initialData.products.length - activeProducts.length;

  const totalRevenue = filteredOrders
    .filter((order) => order.status === "paid" || order.status === "fulfilled")
    .reduce((sum, order) => sum + order.subtotal_cents, 0);
  const effectiveOrders = filteredOrders.filter((order) => order.status === "paid" || order.status === "fulfilled");
  const averageOrderValue = effectiveOrders.length > 0 ? Math.round(totalRevenue / effectiveOrders.length) : 0;
  const activeCarts = filteredCarts.filter((cart) => cart.status === "active").length;
  const abandonedCarts = filteredCarts.filter((cart) => cart.status === "abandoned").length;
  const checkoutCarts = filteredCarts.filter((cart) => cart.status === "checked_out").length;
  const cartConversion = filteredCarts.length > 0 ? Math.round((checkoutCarts / filteredCarts.length) * 100) : 0;
  const paidOrders = filteredOrders.filter((order) => order.status === "paid").length;
  const fulfilledOrders = filteredOrders.filter((order) => order.status === "fulfilled").length;
  const pendingOrders = filteredOrders.filter((order) => order.status === "pending").length;
  const cancelledOrders = filteredOrders.filter((order) => order.status === "cancelled").length;

  const topProducts = Array.from(
    filteredOrderItems.reduce((map, item) => {
      const existing = map.get(item.product_name) ?? {
        name: item.product_name,
        quantity: 0,
        revenue: 0,
      };

      existing.quantity += item.quantity;
      existing.revenue += item.subtotal_cents;
      map.set(item.product_name, existing);
      return map;
    }, new Map<string, { name: string; quantity: number; revenue: number }>())
  )
    .map(([, item]) => item)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const recentOrders = [...filteredOrders].sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at)).slice(0, 8);
  const productHealth = activeProducts.map((product) => {
    const matchingItems = filteredOrderItems.filter((item) => item.product_id === product.id);
    const units = matchingItems.reduce((sum, item) => sum + item.quantity, 0);
    const revenue = matchingItems.reduce((sum, item) => sum + item.subtotal_cents, 0);

    return {
      id: product.id,
      name: product.name,
      status: units > 2 ? "强势" : units > 0 ? "观察" : "待推动",
      units,
      revenue,
      price: product.price_cents,
      description: product.description,
    };
  });

  const trendSeries = buildTrendSeries(filteredOrdersBase, filteredCarts, safeFrom, normalizedTo);
  const maxRevenue = Math.max(...trendSeries.map((item) => item.revenue), 1);
  const stalePendingOrders = filteredOrders.filter((order) => {
    if (order.status !== "pending") {
      return false;
    }

    return Date.now() - new Date(order.created_at).getTime() > 1000 * 60 * 60 * 24;
  });
  const zeroSalesProducts = productHealth.filter((product) => product.units === 0).slice(0, 3);
  const kpis: KpiCard[] = [
    {
      label: "总营收",
      value: formatCurrency(totalRevenue),
      detail: `${paidOrders + fulfilledOrders} 笔有效订单`,
      trend: "较上周期 +18%",
      icon: "R",
      tone: "violet",
    },
    {
      label: "平均客单价",
      value: formatCurrency(averageOrderValue),
      detail: `${effectiveOrders.length} 笔有效订单参与计算`,
      trend: "较上周期 +6%",
      icon: "A",
      tone: "blue",
    },
    {
      label: "购物车转化",
      value: `${cartConversion}%`,
      detail: `${checkoutCarts}/${filteredCarts.length || 0} 个购物车已完成结账`,
      trend: "较上周期 +9%",
      icon: "C",
      tone: "cyan",
    },
    {
      label: "活跃购物车",
      value: formatCompactNumber(activeCarts),
      detail: `${pendingOrders} 笔待处理订单`,
      trend: "较上周期 +12%",
      icon: "L",
      tone: "green",
    },
  ];

  const alerts = [
    {
      title: "待处理订单需要跟进",
      body:
        pendingOrders > 0
          ? `当前有 ${pendingOrders} 笔 pending 订单，建议优先检查支付状态与人工审核流程。`
          : "当前没有待处理订单，支付链路状态稳定。",
      tone: pendingOrders > 0 ? "warning" : "ok",
    },
    {
      title: "商品上下架结构",
      body:
        inactiveProducts > 0
          ? `目前有 ${inactiveProducts} 个商品处于未上架状态，建议确认是否为活动结束或库存策略调整。`
          : "所有商品目前均处于上架状态，可继续观察分类与转化表现。",
      tone: inactiveProducts > 0 ? "neutral" : "ok",
    },
    {
      title: "弃购风险",
      body:
        abandonedCarts > checkoutCarts
          ? `弃购购物车 ${abandonedCarts} 个，高于已结账购物车 ${checkoutCarts} 个，建议补充召回或优惠策略。`
          : `弃购购物车 ${abandonedCarts} 个，当前未超过已结账购物车 ${checkoutCarts} 个。`,
      tone: abandonedCarts > checkoutCarts ? "warning" : "neutral",
    },
  ];

  const exportQuery = new URLSearchParams({
    from: fromDate,
    to: toDate,
    ...(statusFilter !== "all" ? { status: statusFilter } : {}),
    ...(search.trim() ? { query: search.trim() } : {}),
  }).toString();

  const primaryMenu = [
    "工作台",
    "分析页",
    "订单管理",
    "商品管理",
    "用户管理",
    "系统设置",
  ];

  const secondaryMenu = ["内容中心", "活动管理", "结算页面", "帮助中心"];
  const workspaceTabs = ["工作台", "数据看板", "订单队列", "转化漏斗", "商品状态"];
  const visitMax = Math.max(...trendSeries.map((item) => item.orders + item.carts), 1);
  const visitLinePoints = trendSeries
    .map((item, index) => {
      const x = trendSeries.length === 1 ? 50 : (index / (trendSeries.length - 1)) * 100;
      const y = 100 - (((item.orders + item.carts) / visitMax) * 100);
      return `${x},${Number.isFinite(y) ? y : 100}`;
    })
    .join(" ");
  const progressRows = productHealth.slice(0, 3).map((product) => {
    const progressBase = Math.max(topProducts[0]?.quantity ?? 1, 1);

    return {
      id: product.id,
      name: product.name,
      region: product.status === "强势" ? "核心推荐" : product.status === "观察" ? "持续观察" : "待激活",
      progress: Math.min(100, Math.max(16, Math.round((product.units / progressBase) * 100))),
    };
  });
  const todoItems = [
    `${pendingOrders} 笔待处理订单需要确认支付与发货节奏`,
    `${abandonedCarts} 个弃购购物车可考虑做召回`,
    `${zeroSalesProducts.length} 个上架商品本周期暂无成交`,
  ];

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <span className="admin-brand-mark" />
          <div>
            <strong>Art Design Pro</strong>
            <p>管理后台</p>
          </div>
        </div>

        <nav className="admin-sidebar-nav" aria-label="管理员导航">
          {primaryMenu.map((item) => (
            <button
              key={item}
              className={item === "分析页" ? "admin-sidebar-link active" : "admin-sidebar-link"}
              type="button"
            >
              <span>{item}</span>
              {item === "分析页" ? <em>Hot</em> : null}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-group">
          {secondaryMenu.map((item) => (
            <button className="admin-sidebar-sublink" key={item} type="button">
              {item}
            </button>
          ))}
        </div>

        <div className="admin-sidebar-user">
          <div className="admin-avatar">A</div>
          <div>
            <strong>管理员</strong>
            <p>{initialData.usingFallback ? "演示数据模式" : "实时数据模式"}</p>
          </div>
        </div>
      </aside>

      <div className="admin-workspace">
        <header className="admin-topbar">
          <div className="admin-topbar-title">
            <p className="eyebrow">监控中心 / 工作台</p>
            <h1>管理员页面</h1>
          </div>
          <div className="admin-topbar-actions">
            <label className="admin-search-pill">
              <input
                type="search"
                placeholder="搜索订单号或状态"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <a className="admin-export-button" href={`/api/admin/orders/export?${exportQuery}`}>
              导出 CSV
            </a>
            <form action="/api/admin/logout" method="post">
              <button className="admin-logout-button" type="submit">
                退出
              </button>
            </form>
          </div>
        </header>

        <div className="admin-workspace-tabs">
          {workspaceTabs.map((tab) => (
            <button className={tab === "工作台" ? "admin-workspace-tab active" : "admin-workspace-tab"} key={tab} type="button">
              {tab}
            </button>
          ))}
        </div>

        <section className="admin-toolbar-panel">
          <div className="admin-range-tabs" aria-label="时间范围筛选">
            {rangeOptions.map((option) => (
              <button
                key={option.key}
                className={option.key === range ? "admin-range-tab active" : "admin-range-tab"}
                onClick={() => {
                  const nextFrom = new Date(today);
                  nextFrom.setDate(nextFrom.getDate() - (getRangeDays(option.key) - 1));
                  setRange(option.key);
                  setFromDate(toInputDate(nextFrom));
                  setToDate(toInputDate(today));
                }}
                type="button"
              >
                {option.label}
              </button>
            ))}
            <button
              className={range === "custom" ? "admin-range-tab active" : "admin-range-tab"}
              onClick={() => setRange("custom")}
              type="button"
            >
              自定义
            </button>
          </div>

          <div className="admin-filter-bar">
            <label className="admin-field">
              <span>开始日期</span>
              <input
                type="date"
                value={fromDate}
                onChange={(event) => {
                  setRange("custom");
                  setFromDate(event.target.value);
                }}
              />
            </label>
            <label className="admin-field">
              <span>结束日期</span>
              <input
                type="date"
                value={toDate}
                onChange={(event) => {
                  setRange("custom");
                  setToDate(event.target.value);
                }}
              />
            </label>
            <label className="admin-field">
              <span>订单状态</span>
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as "all" | OrderStatus)}>
                <option value="all">全部状态</option>
                <option value="pending">pending</option>
                <option value="paid">paid</option>
                <option value="fulfilled">fulfilled</option>
                <option value="cancelled">cancelled</option>
              </select>
            </label>
          </div>
        </section>

        <section className="admin-kpi-grid">
          {kpis.map((item) => (
            <article className="admin-kpi-card" key={item.label}>
              <div className="admin-kpi-head">
                <div>
                  <p className="admin-kpi-label">{item.label}</p>
                  <h2>{item.value}</h2>
                </div>
                <span className={`admin-kpi-icon ${item.tone}`}>{item.icon}</span>
              </div>
              <p className="admin-kpi-detail">{item.detail}</p>
              <p className="admin-kpi-trend">{item.trend}</p>
            </article>
          ))}
        </section>

        <section className="admin-analytics-grid">
          <article className="admin-panel admin-panel-large">
            <div className="admin-panel-heading">
              <div>
                <h2>订单走势</h2>
                <p className="admin-panel-subtitle">用当前筛选区间查看日度营收、订单与购物车变化。</p>
              </div>
              <span className="admin-inline-tag">共 {trendSeries.length} 天</span>
            </div>
            <div className="admin-chart">
              {trendSeries.map((item) => (
                <div className="admin-chart-group" key={item.label}>
                  <div className="admin-chart-bars">
                    <span
                      className="admin-bar revenue"
                      style={{ height: `${Math.max((item.revenue / maxRevenue) * 100, item.revenue > 0 ? 12 : 4)}%` }}
                    />
                  </div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
            <div className="admin-description-row">
              <div>
                <strong>{formatCompactNumber(filteredOrderItems.length)}</strong>
                <span>订单条目</span>
              </div>
              <div>
                <strong>{formatCompactNumber(filteredCarts.length)}</strong>
                <span>访问购物车</span>
              </div>
              <div>
                <strong>{cartConversion}%</strong>
                <span>周环比</span>
              </div>
            </div>
          </article>

          <article className="admin-panel admin-panel-large">
            <div className="admin-panel-heading">
              <div>
                <h2>访问量</h2>
                <p className="admin-panel-subtitle">订单量与购物车量叠加后的访问趋势。</p>
              </div>
              <span className="admin-inline-tag">本周期 +15%</span>
            </div>
            <div className="admin-visit-chart-card">
              <svg className="admin-line-chart" viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="访问量趋势图">
                <polyline className="admin-line-grid" points="0,25 100,25" />
                <polyline className="admin-line-grid" points="0,50 100,50" />
                <polyline className="admin-line-grid" points="0,75 100,75" />
                <polyline className="admin-line-path" points={visitLinePoints} />
              </svg>
            </div>
            <div className="admin-visit-axis">
              {trendSeries.map((item) => (
                <span key={item.label}>{item.label}</span>
              ))}
            </div>
          </article>
        </section>

        <section className="admin-lower-grid">
          <article className="admin-panel admin-table-panel">
            <div className="admin-panel-heading">
              <div>
                <h2>重点商品</h2>
                <p className="admin-panel-subtitle">当前区间内销量或表现最值得关注的商品。</p>
              </div>
              <div className="admin-segmented">
                <button className="active" type="button">
                  本期
                </button>
                <button type="button">上期</button>
                <button type="button">全年</button>
              </div>
            </div>
            <div className="admin-user-table">
              <div className="admin-table-head">
                <span>名称</span>
                <span>状态</span>
                <span>进度</span>
              </div>
              {progressRows.length > 0 ? (
                progressRows.map((row) => (
                  <div className="admin-user-row" key={row.id}>
                    <div className="admin-user-meta">
                      <div className="admin-user-thumb">{row.name.slice(0, 1)}</div>
                      <div>
                        <strong>{row.name}</strong>
                        <p>{row.region}</p>
                      </div>
                    </div>
                    <span>{productHealth.find((product) => product.id === row.id)?.status ?? "观察"}</span>
                    <div className="admin-progress">
                      <div className="admin-progress-bar" style={{ width: `${row.progress}%` }} />
                      <em>{row.progress}%</em>
                    </div>
                  </div>
                ))
              ) : (
                <div className="admin-empty-state">暂无商品进度数据。</div>
              )}
            </div>
          </article>

          <div className="admin-side-stack">
            <article className="admin-panel">
              <div className="admin-panel-heading">
                <div>
                  <h2>动态</h2>
                  <p className="admin-panel-subtitle">最新订单和后台事件会集中显示在这里。</p>
                </div>
              </div>
              <div className="admin-alert-list">
                {recentOrders.slice(0, 3).map((order) => (
                  <div className="admin-activity-row" key={order.id}>
                    <div>
                      <strong>{order.id}</strong>
                      <p>{formatDateTime(order.created_at)}</p>
                    </div>
                    <span className={`admin-status-badge admin-status-${order.status}`}>{order.status}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="admin-panel">
              <div className="admin-panel-heading">
                <div>
                  <h2>待办事项</h2>
                  <p className="admin-panel-subtitle">适合管理员今天优先处理的动作。</p>
                </div>
              </div>
              <div className="admin-todo-list">
                {todoItems.map((item) => (
                  <label className="admin-todo-item" key={item}>
                    <input type="checkbox" defaultChecked={item.includes("待处理订单")} />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="admin-bottom-grid">
          <article className="admin-panel">
            <div className="admin-panel-heading">
              <div>
                <h2>运营提醒</h2>
                <p className="admin-panel-subtitle">根据当前数据自动汇总出来的风险和建议。</p>
              </div>
            </div>
            <div className="admin-alert-list">
              {alerts.map((alert) => (
                <div className={`admin-alert admin-alert-${alert.tone}`} key={alert.title}>
                  <strong>{alert.title}</strong>
                  <p>{alert.body}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="admin-panel">
            <div className="admin-panel-heading">
              <div>
                <h2>订单队列</h2>
                <p className="admin-panel-subtitle">筛选后的订单状态和最新订单列表。</p>
              </div>
              <span className="admin-inline-tag">已筛选 {filteredOrders.length} 笔</span>
            </div>
            <div className="admin-status-grid">
              <div>
                <strong>{pendingOrders}</strong>
                <span>待处理</span>
              </div>
              <div>
                <strong>{paidOrders}</strong>
                <span>已支付</span>
              </div>
              <div>
                <strong>{fulfilledOrders}</strong>
                <span>已履约</span>
              </div>
              <div>
                <strong>{cancelledOrders}</strong>
                <span>已取消</span>
              </div>
            </div>
            <div className="admin-order-list">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <div className="admin-order-row" key={order.id}>
                    <div>
                      <strong>{order.id}</strong>
                      <p>{formatDateTime(order.created_at)}</p>
                    </div>
                    <div>
                      <span className={`admin-status-badge admin-status-${order.status}`}>{order.status}</span>
                      <strong>{formatCurrency(order.subtotal_cents, order.currency)}</strong>
                    </div>
                  </div>
                ))
              ) : (
                <div className="admin-empty-state">当前筛选条件下没有订单。</div>
              )}
            </div>
          </article>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>商品健康度总览</h2>
              <p className="admin-panel-subtitle">保留你原本后台的数据维度，换成新的仪表盘视觉风格。</p>
            </div>
            <div className="admin-chip-row">
              <span className="admin-chip">商品总数 {initialData.products.length}</span>
              <span className="admin-chip">订单总数 {filteredOrders.length}</span>
              <span className="admin-chip">弃购购物车 {abandonedCarts}</span>
            </div>
          </div>
          <div className="admin-catalog-grid">
            {productHealth.map((product) => (
              <article className="admin-catalog-card" key={product.id}>
                <div className="admin-catalog-top">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.description ?? "当前商品暂无补充描述。"} </p>
                  </div>
                  <span className={`admin-health-badge admin-health-${product.status}`}>{product.status}</span>
                </div>
                <div className="admin-catalog-metrics">
                  <div>
                    <strong>{product.units}</strong>
                    <span>销量</span>
                  </div>
                  <div>
                    <strong>{formatCurrency(product.revenue)}</strong>
                    <span>销售额</span>
                  </div>
                  <div>
                    <strong>{formatCurrency(product.price)}</strong>
                    <span>标价</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

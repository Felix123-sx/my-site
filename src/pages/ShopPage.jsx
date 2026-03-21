import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const filters = ["全部", "情侣关怀", "润滑护理", "私密健康", "精选器具"];

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState("全部");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("default");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeFilter !== "全部") {
      result = result.filter((product) => product.category === activeFilter);
    }

    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(keyword) ||
          product.desc.toLowerCase().includes(keyword) ||
          product.category.toLowerCase().includes(keyword) ||
          product.tag.toLowerCase().includes(keyword)
      );
    }

    if (sortType === "price-asc") {
      result.sort((a, b) => Number(String(a.price).replace(/[^\d.]/g, "")) - Number(String(b.price).replace(/[^\d.]/g, "")));
    }

    if (sortType === "price-desc") {
      result.sort((a, b) => Number(String(b.price).replace(/[^\d.]/g, "")) - Number(String(a.price).replace(/[^\d.]/g, "")));
    }

    return result;
  }, [activeFilter, searchTerm, sortType]);

  return (
    <div className="min-h-screen tone-base text-[var(--text)]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-18 pt-10 sm:px-6 md:pb-28 md:pt-16">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="max-w-4xl">
            <div className="eyebrow">产品系列</div>
            <h1 className="font-editorial mt-5 text-5xl font-semibold text-[var(--ui-title)] md:text-7xl">
              精选私密健康系列
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-8 text-[var(--ui-copy)] md:text-base">
              以更温和、更成熟的品牌语气整理系列，让浏览保持安静、清晰，也更值得信任。
            </p>
          </div>

          <div className="tone-mid rounded-[1.8rem] p-5 md:p-6">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ui-kicker)]">Browse Mood</div>
            <p className="mt-3 text-sm leading-8 text-[var(--ui-copy)]">
              保持精致、低噪音与更清晰的产品浏览路径，
              让筛选和比较也延续 intimate luxury 的情绪，而不是打断它。
            </p>
          </div>
        </section>

        <section className="tone-low mt-10 rounded-[2rem] p-5 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_220px] lg:items-end">
            <div>
              <div className="text-sm text-[var(--ui-copy)]">搜索产品</div>
              <input
                type="text"
                placeholder="搜索名称、分类或关键词"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-lux mt-3"
              />
            </div>

            <div>
              <div className="text-sm text-[var(--ui-copy)]">排序方式</div>
              <select value={sortType} onChange={(e) => setSortType(e.target.value)} className="input-lux mt-3">
                <option value="default">默认排序</option>
                <option value="price-asc">价格从低到高</option>
                <option value="price-desc">价格从高到低</option>
              </select>
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-3 text-sm text-[var(--ui-copy)]">分类筛选</div>
            <div className="flex flex-wrap gap-2.5">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      isActive
                        ? "bg-[#5f2330] text-[#fff8f3]"
                        : "bg-[rgba(255,251,247,0.84)] text-[var(--ui-title)] shadow-[inset_0_0_0_1px_rgba(111,39,53,0.12)] hover:bg-[rgba(111,39,53,0.08)]"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.16em] text-[var(--ui-kicker)]">当前展示</div>
              <h2 className="font-editorial mt-2 text-4xl font-semibold text-[var(--ui-title)]">
                {activeFilter === "全部" ? "全部产品" : `${activeFilter} 系列`}
              </h2>
            </div>
            <div className="text-sm text-[var(--ui-copy)]">
              共 <span className="font-semibold text-[var(--ui-title)]">{filteredProducts.length}</span> 件
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="soft-tonal-card rounded-[1.8rem] p-8 md:p-10">
              <div className="eyebrow">暂无结果</div>
              <h3 className="font-editorial mt-4 text-4xl font-semibold text-[var(--ui-title)]">没有找到符合条件的产品</h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--ui-copy)]">可以尝试切换分类、清空关键词，或恢复默认排序。</p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setActiveFilter("全部");
                    setSearchTerm("");
                    setSortType("default");
                  }}
                  className="btn-primary"
                >
                  重置筛选
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

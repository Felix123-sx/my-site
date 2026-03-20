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
      result.sort((a, b) => {
        const aPrice = Number(String(a.price).replace(/[^\d.]/g, ""));
        const bPrice = Number(String(b.price).replace(/[^\d.]/g, ""));
        return aPrice - bPrice;
      });
    }

    if (sortType === "price-desc") {
      result.sort((a, b) => {
        const aPrice = Number(String(a.price).replace(/[^\d.]/g, ""));
        const bPrice = Number(String(b.price).replace(/[^\d.]/g, ""));
        return bPrice - aPrice;
      });
    }

    return result;
  }, [activeFilter, searchTerm, sortType]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-16">
        <section className="max-w-3xl">
          <div className="text-sm text-stone-500">Shop</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            全部产品
          </h1>
          <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base md:leading-8">
            浏览 Velure Health 当前呈现的全部产品系列。每一件产品都围绕安心、质感、
            隐私与身体友好展开，保持统一的品牌体验。
          </p>
        </section>

        <section className="mt-8 rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm md:mt-10 md:p-8">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="text-sm text-stone-500">搜索产品</div>
              <input
                type="text"
                placeholder="搜索产品名称、分类或关键词"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-3 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-500"
              />
            </div>

            <div className="min-w-0 lg:min-w-[220px]">
              <div className="text-sm text-stone-500">排序方式</div>
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="mt-3 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-500"
              >
                <option value="default">默认排序</option>
                <option value="price-asc">价格从低到高</option>
                <option value="price-desc">价格从高到低</option>
              </select>
            </div>
          </div>

          <div className="mt-6 md:mt-8">
            <div className="mb-4 text-sm text-stone-500">分类筛选</div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-xl px-4 py-2 text-sm transition ${
                      isActive
                        ? "bg-stone-900 text-white"
                        : "border border-stone-300 bg-white text-stone-700 hover:bg-stone-100"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-10 md:mt-12">
          <div className="mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm text-stone-500">产品列表</div>
              <h2 className="mt-2 text-2xl font-semibold">
                {activeFilter === "全部" ? "全部产品" : `${activeFilter} 系列`}
              </h2>
            </div>

            <div className="text-sm text-stone-600">
              共找到 <span className="font-semibold">{filteredProducts.length}</span> 件产品
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
              <div className="text-sm text-stone-500">暂无产品</div>
              <h3 className="mt-2 text-2xl font-semibold">没有找到符合条件的产品</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                你可以尝试切换分类、清空搜索关键词，或者稍后补充更多商品数据。
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setActiveFilter("全部");
                    setSearchTerm("");
                    setSortType("default");
                  }}
                  className="rounded-xl bg-stone-900 px-5 py-3 text-sm text-white hover:opacity-90"
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
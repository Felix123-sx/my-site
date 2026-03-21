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
    <div className="min-h-screen tone-base text-[#2f342e]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 md:pb-24 md:pt-14">
        <section className="max-w-3xl">
          <div className="eyebrow">Shop</div>
          <h1 className="font-editorial mt-4 text-4xl font-semibold md:text-6xl">
            全部产品
          </h1>
          <p className="mt-5 text-sm leading-7 text-[#5b645b] md:text-base md:leading-8">
            围绕安心、隐私与身体友好整理的产品选择。
          </p>
        </section>

        <section className="tone-low mt-8 rounded-[1.75rem] p-5 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_220px] lg:items-end">
            <div>
              <div className="text-sm text-[#5b645b]">搜索产品</div>
              <input
                type="text"
                placeholder="搜索名称、分类或关键词"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-3 w-full border-b border-[#2f342e]/12 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#8b9389]"
              />
            </div>

            <div>
              <div className="text-sm text-[#5b645b]">排序方式</div>
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="mt-3 w-full border-b border-[#2f342e]/12 bg-transparent px-0 py-3 text-sm outline-none"
              >
                <option value="default">默认排序</option>
                <option value="price-asc">价格从低到高</option>
                <option value="price-desc">价格从高到低</option>
              </select>
            </div>
          </div>

          <div className="mt-7">
            <div className="mb-3 text-sm text-[#5b645b]">分类筛选</div>

            <div className="flex flex-wrap gap-2.5">
              {filters.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      isActive
                        ? "bg-[#536257] text-[#ebfcee]"
                        : "bg-white text-[#2f342e] shadow-[inset_0_0_0_1px_rgba(47,52,46,0.06)] hover:bg-[#f8f8f4]"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm text-[#5b645b]">Collection</div>
              <h2 className="font-editorial mt-2 text-3xl font-semibold">
                {activeFilter === "全部" ? "当前产品" : `${activeFilter} 系列`}
              </h2>
            </div>

            <div className="text-sm text-[#5b645b]">
              共 <span className="font-semibold text-[#2f342e]">{filteredProducts.length}</span> 件
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="tone-card rounded-[1.5rem] p-8 md:p-10">
              <div className="eyebrow">No Results</div>
              <h3 className="font-editorial mt-4 text-3xl font-semibold md:text-4xl">
                没有找到符合条件的产品
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5b645b] md:leading-8">
                可以尝试切换分类、清空关键词，或恢复默认排序。
              </p>

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

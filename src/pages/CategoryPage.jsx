import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const categoryDescriptions = {
  情侣关怀:
    "围绕亲密关系中的舒适、自然与尊重体验，呈现更温和、更高端的 intimate care 表达。",
  润滑护理:
    "强调顺滑、舒适与身体友好，让日常护理体验更自然也更有质感。",
  私密健康:
    "从护理、安全感与生活方式角度出发，建立更安心的选择。",
  精选器具:
    "以成熟审美、克制设计与柔和视觉呈现高端产品体验。",
};

export default function CategoryPage() {
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName);

  const filteredProducts = products.filter((product) => product.category === decodedCategory);

  const description =
    categoryDescriptions[decodedCategory] ||
    "浏览该系列下的精选产品，体验更安静、更高级的品牌表达。";

  return (
    <div className="min-h-screen tone-base text-[#261b17]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-18 pt-10 sm:px-6 md:pb-28 md:pt-16">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#7d675a]">
          <Link to="/" className="hover:text-[#241914]">首页</Link>
          <span>/</span>
          <span className="text-[#241914]">{decodedCategory}</span>
        </div>

        <section className="mt-8 max-w-4xl">
          <div className="eyebrow">Series</div>
          <h1 className="font-editorial mt-5 text-5xl font-semibold text-[#241914] md:text-7xl">
            {decodedCategory}
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-8 text-[#65564d] md:text-base">
            {description}
          </p>
        </section>

        <section className="mt-12">
          {filteredProducts.length > 0 ? (
            <>
              <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a897e]">Selection</div>
                  <h2 className="font-editorial mt-2 text-4xl font-semibold text-[#241914]">
                    该系列下的精选产品
                  </h2>
                </div>
                <div className="text-sm text-[#65564d]">
                  共 <span className="font-semibold text-[#241914]">{filteredProducts.length}</span> 件
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="tone-card rounded-[1.8rem] p-8 md:p-10">
              <div className="eyebrow">No Products</div>
              <h2 className="font-editorial mt-4 text-4xl font-semibold text-[#241914]">
                该系列下暂时没有产品
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#65564d]">
                当前数据里还没有对应商品，你可以先浏览全部产品或返回首页。
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link to="/shop" className="btn-primary">查看全部产品</Link>
                <Link to="/" className="btn-secondary">返回首页</Link>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

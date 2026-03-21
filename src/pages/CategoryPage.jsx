import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const categoryDescriptions = {
  情侣关怀:
    "围绕亲密关系中的舒适、自然与尊重体验，呈现更温和的私密健康表达。",
  润滑护理:
    "强调温和、舒适与身体友好，让日常私密护理体验更自然、更轻松。",
  私密健康:
    "从材料、安全感与护理体验出发，建立更安心、更值得信任的品牌感受。",
  精选器具:
    "以成熟审美、克制设计与品质材料，呈现更高级的私密产品体验。",
};

export default function CategoryPage() {
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName);

  const filteredProducts = products.filter(
    (product) => product.category === decodedCategory
  );

  const description =
    categoryDescriptions[decodedCategory] ||
    "浏览该系列下的精选产品，体验更安心、更克制的品牌表达。";

  return (
    <div className="min-h-screen tone-base text-[#2f342e]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 md:pb-24 md:pt-14">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#5b645b]">
          <Link to="/" className="hover:text-[#2f342e]">首页</Link>
          <span>/</span>
          <span className="text-[#2f342e]">{decodedCategory}</span>
        </div>

        <section className="mt-8 max-w-3xl">
          <div className="eyebrow">Series</div>
          <h1 className="font-editorial mt-4 text-4xl font-semibold md:text-6xl">
            {decodedCategory}
          </h1>
          <p className="mt-5 text-sm leading-7 text-[#5b645b] md:text-base md:leading-8">
            {description}
          </p>
        </section>

        <section className="mt-10">
          {filteredProducts.length > 0 ? (
            <>
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-sm text-[#5b645b]">Selection</div>
                  <h2 className="font-editorial mt-2 text-3xl font-semibold">
                    该系列下的产品
                  </h2>
                </div>
                <div className="text-sm text-[#5b645b]">
                  共 <span className="font-semibold text-[#2f342e]">{filteredProducts.length}</span> 件
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="tone-card rounded-[1.5rem] p-8 md:p-10">
              <div className="eyebrow">No Products</div>
              <h2 className="font-editorial mt-4 text-3xl font-semibold md:text-4xl">
                该系列下暂时没有产品
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#5b645b] md:leading-8">
                当前数据里还没有对应商品，你可以先返回首页或浏览全部产品。
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link to="/shop" className="btn-primary">
                  查看全部产品
                </Link>
                <Link to="/" className="btn-secondary">
                  返回首页
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

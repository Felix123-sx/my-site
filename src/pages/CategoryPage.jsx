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
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Link to="/" className="text-stone-500 hover:text-stone-900 hover:underline">
            首页
          </Link>
          <span className="text-stone-400">/</span>
          <span className="font-medium text-stone-900">{decodedCategory}</span>
        </div>

        <section className="mt-8">
          <div className="max-w-3xl">
            <div className="text-sm text-stone-500">品牌系列</div>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
              {decodedCategory}
            </h1>
            <p className="mt-4 text-base leading-8 text-stone-600">
              {description}
            </p>
          </div>
        </section>

        <section className="mt-12">
          {filteredProducts.length > 0 ? (
            <>
              <div className="mb-8 flex items-end justify-between gap-6">
                <div>
                  <div className="text-sm text-stone-500">精选产品</div>
                  <h2 className="mt-2 text-2xl font-semibold">
                    该系列下的产品选择
                  </h2>
                </div>
                <p className="hidden max-w-xl text-sm leading-7 text-stone-600 md:block">
                  每件产品都延续 Velure Health 一贯的表达方式：克制、安心、质感与更温和的私密健康体验。
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
              <div className="text-sm text-stone-500">暂无内容</div>
              <h2 className="mt-2 text-2xl font-semibold">该系列下暂时没有产品</h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                这个分类页已经可以正常工作，只是当前数据里还没有对应产品。
                你可以稍后在产品数据中补充这个系列的商品内容。
              </p>

              <Link
                to="/"
                className="mt-6 inline-block rounded-xl bg-stone-900 px-5 py-3 text-sm text-white hover:opacity-90"
              >
                返回首页
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
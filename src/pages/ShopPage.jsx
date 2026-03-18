import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <section className="max-w-3xl">
          <div className="text-sm text-stone-500">Shop</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            全部产品
          </h1>
          <p className="mt-4 text-base leading-8 text-stone-600">
            浏览 Velure Health 当前呈现的全部产品系列。每一件产品都围绕安心、质感、
            隐私与身体友好展开，保持统一的品牌体验。
          </p>
        </section>

        <section className="mt-12">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm text-stone-500">产品列表</div>
              <h2 className="mt-2 text-2xl font-semibold">选择适合你的产品</h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-stone-600">
              你可以从不同系列中浏览产品，并进入详情页进一步了解材料、体验、包装与使用场景。
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
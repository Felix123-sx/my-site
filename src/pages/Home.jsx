import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import { products } from "../data/products";

export default function Home() {
  const categories = [
    {
      title: "情侣关怀",
      description: "以更自然、舒适与尊重体验为基础，关注亲密关系中的健康表达。",
    },
    {
      title: "润滑护理",
      description: "强调温和、舒适与身体友好，让日常私密护理更轻松自然。",
    },
    {
      title: "私密健康",
      description: "围绕材料、安全感与护理体验，建立更安心的品牌感受。",
    },
    {
      title: "精选器具",
      description: "以成熟审美、克制设计和品质材料呈现更高级的私密产品体验。",
    },
  ];

  const trustPoints = [
    "隐私包装发货",
    "身体友好材料",
    "正规渠道采购",
    "安全支付与售后支持",
  ];

  const brandValues = [
    {
      title: "克制表达",
      text: "不追求低俗和刺激化视觉，而是以更成熟、更平和的方式呈现私密产品。",
    },
    {
      title: "安心体验",
      text: "从材质、包装到售后说明，尽可能减少用户在选择与购买过程中的顾虑。",
    },
    {
      title: "质感审美",
      text: "通过更简洁的页面语言和更稳定的视觉气质，建立值得信任的品牌印象。",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Navbar />

      <main>
        <section id="home" className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-5 inline-flex rounded-full border border-stone-300 bg-white px-3 py-1 text-xs text-stone-600 shadow-sm">
                Velure Health 品牌主页
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                用更成熟、克制、安心的方式
                <span className="block">重新定义私密健康体验</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600 md:text-lg">
                Velure Health 专注于以更温和、更有质感的方式呈现私密产品。
                我们相信，身体友好、隐私体验与成熟审美，才是值得长期建立的品牌语言。
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#products"
                  className="rounded-xl bg-stone-900 px-6 py-3 text-sm text-white shadow-sm hover:opacity-90"
                >
                  浏览产品
                </a>

                <a
                  href="#trust"
                  className="rounded-xl border border-stone-300 bg-white px-6 py-3 text-sm text-stone-700 hover:bg-stone-100"
                >
                  了解品牌理念
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {trustPoints.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm text-stone-700 shadow-sm"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm md:p-8">
              <div className="rounded-[1.75rem] bg-gradient-to-br from-stone-100 via-stone-100 to-stone-200 p-8">
                <div className="text-xs uppercase tracking-[0.2em] text-stone-500">
                  Brand Philosophy
                </div>
                <div className="mt-3 text-2xl font-semibold leading-9 text-stone-900 md:text-3xl">
                  更像健康护理品牌，
                  <br />
                  更尊重用户真实感受
                </div>
                <p className="mt-4 max-w-md text-sm leading-7 text-stone-600">
                  我们希望把私密产品从“刺激化展示”中抽离出来，
                  让选择这件事变得更自然、更平静，也更值得信任。
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-stone-200 p-5">
                  <div className="text-xs text-stone-500">品牌关键词</div>
                  <div className="mt-2 text-lg font-semibold">身体友好</div>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    强调舒适、安全与更温和的体验表达。
                  </p>
                </div>

                <div className="rounded-2xl border border-stone-200 p-5">
                  <div className="text-xs text-stone-500">品牌关键词</div>
                  <div className="mt-2 text-lg font-semibold">成熟审美</div>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    以简洁、克制和稳定的视觉气质建立品牌印象。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-stone-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-3">
            {brandValues.map((item) => (
              <div key={item.title}>
                <div className="text-sm text-stone-500">品牌价值</div>
                <div className="mt-2 text-xl font-semibold">{item.title}</div>
                <p className="mt-3 text-sm leading-7 text-stone-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="categories" className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm text-stone-500">品牌系列</div>
              <h2 className="mt-2 text-3xl font-semibold">围绕私密健康体验构建的产品体系</h2>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-stone-600">
              不同系列并不是简单的商品分类，而是围绕不同使用场景与体验需求形成的品牌表达。
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <a
                key={category.title}
                href={`/category/${encodeURIComponent(category.title)}`}
                className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-xs uppercase tracking-[0.18em] text-stone-400">
                  Series
                </div>
                <div className="mt-3 text-xl font-semibold">{category.title}</div>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  {category.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        <section id="products" className="border-y border-stone-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-sm text-stone-500">精选产品</div>
                <h2 className="mt-2 text-3xl font-semibold">
                  用更统一的品牌语言呈现每一件产品
                </h2>
              </div>

              <p className="max-w-2xl text-sm leading-7 text-stone-600">
                所有产品页面都围绕安心、质感、隐私与身体友好展开，保持一致的品牌体验。
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section id="trust" className="bg-stone-900 text-stone-50">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="max-w-3xl">
              <div className="text-sm text-stone-400">品牌承诺</div>
              <h2 className="mt-2 text-3xl font-semibold">
                我们希望每一次选择，都建立在安心与尊重之上
              </h2>
              <p className="mt-5 text-sm leading-8 text-stone-300 md:text-base">
                从页面表达、产品呈现到下单体验，Velure Health 始终坚持更克制的沟通方式，
                让用户在更自然、更放松的状态下认识并选择属于自己的私密健康产品。
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
                <h3 className="text-xl font-semibold">隐私优先</h3>
                <p className="mt-4 text-sm leading-7 text-stone-300">
                  以更审慎的方式处理包装、展示和购买流程，减少不必要的心理压力。
                </p>
              </div>

              <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
                <h3 className="text-xl font-semibold">安全感表达</h3>
                <p className="mt-4 text-sm leading-7 text-stone-300">
                  用更温和的页面语言与材料说明，建立更稳定的品牌信任基础。
                </p>
              </div>

              <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
                <h3 className="text-xl font-semibold">长期品牌感</h3>
                <p className="mt-4 text-sm leading-7 text-stone-300">
                  不追求短期刺激式展示，而是塑造可以长期被记住的品牌气质。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-[2rem] border border-stone-200 bg-white px-8 py-10 shadow-sm md:px-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="text-sm text-stone-500">发现更多产品</div>
                <h2 className="mt-2 text-3xl font-semibold">
                  通过更平和、更成熟的方式进入私密健康体验
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 md:text-base">
                  从品牌系列到具体产品，我们希望每个页面都能呈现统一、安心且值得信任的品牌感受。
                </p>
              </div>

              <a
                href="#products"
                className="rounded-xl bg-stone-900 px-6 py-3 text-sm text-white hover:opacity-90"
              >
                查看精选产品
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { products } from "../data/products";

export default function Home() {
  const categories = [
    {
      title: "情侣关怀",
      description: "为关系中的亲密感与舒适度提供更柔和的选择。",
    },
    {
      title: "润滑护理",
      description: "温和、顺滑、身体友好的日常 intimate care。",
    },
    {
      title: "私密健康",
      description: "从护理、安全感与日常仪式感出发的基础系列。",
    },
    {
      title: "精选器具",
      description: "克制的设计语言与更成熟的产品审美。",
    },
  ];

  const trustPoints = ["隐私包装", "甄选材质", "柔和表达", "安心售后"];
  const featuredProducts = products.slice(0, 3);
  const testimonials = [
    "“像一个真正有审美的 wellness 品牌，而不是普通成人商城。”",
    "“页面很安静，信息很克制，浏览时没有被冒犯的感觉。”",
    "“产品呈现更像设计对象，让人更容易信任和下单。”",
  ];

  return (
    <div className="min-h-screen tone-base text-[#261b17]">
      <Navbar />

      <main>
        <section id="home" className="mx-auto max-w-7xl px-4 pb-18 pt-10 sm:px-6 md:pb-28 md:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
            <div className="max-w-3xl">
              <div className="eyebrow">Velure Health · Private Wellness</div>

              <h1 className="font-editorial editorial-hero mt-6 max-w-5xl text-5xl font-semibold text-[#241914] sm:text-6xl md:text-7xl lg:text-[5.8rem]">
                Luxury intimate care,
                <span className="mt-2 block text-[#b28958]">shaped with softness and restraint</span>
              </h1>

              <p className="mt-7 max-w-2xl text-sm leading-8 text-[#65564d] sm:text-base md:text-[1.02rem]">
                Velure Health 以更柔和、更高级的方式呈现成人 wellness。
                我们把页面、产品与品牌语气统一成更克制的体验——像一本生活方式杂志，而不是喧闹的商品陈列。
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/shop" className="btn-primary">探索产品</Link>
                <Link to="/about" className="btn-secondary">了解品牌</Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {trustPoints.map((item) => (
                  <div key={item} className="pill-soft">{item}</div>
                ))}
              </div>
            </div>

            <div className="tone-mid overflow-hidden rounded-[2rem] p-4 sm:p-5 md:p-6">
              <div className="relative overflow-hidden rounded-[1.6rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.6),transparent_26%),linear-gradient(140deg,#eedcc5_0%,#ccb09a_28%,#7f6456_62%,#342724_100%)] p-6 sm:p-8 md:min-h-[620px] md:p-10">
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(24,14,11,0.24)] via-transparent to-[rgba(255,255,255,0.12)]" />

                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <div className="eyebrow">品牌氛围</div>
                    <div className="font-editorial mt-5 max-w-md text-3xl font-semibold leading-[1.05] text-[#fff7ef] md:text-5xl">
                      Soft cinematic light.
                      <span className="mt-2 block text-[#f4ddbf]">Quiet sensuality.</span>
                    </div>
                  </div>

                  <div className="mt-16 max-w-sm rounded-[1.35rem] bg-[rgba(255,248,240,0.14)] p-5 backdrop-blur-sm md:mt-24">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-[#f5dfc4]">品牌方向</div>
                    <p className="mt-3 text-sm leading-7 text-[#fff3e8] md:text-base">
                      更大的留白、更温暖的中性色、更克制的金色点缀，
                      让体验更像 premium lifestyle brand。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="featured" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-24">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="eyebrow">精选推荐</div>
              <h2 className="font-editorial mt-4 text-4xl font-semibold text-[#241914] md:text-6xl">
                Curated bestsellers with a softer retail rhythm
              </h2>
            </div>

            <Link to="/shop" className="text-sm uppercase tracking-[0.16em] text-[#7d675a] underline underline-offset-4">
              查看全部
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="tone-card rounded-[1.7rem] p-4 transition duration-300 hover:-translate-y-[2px]">
                <div className="aspect-[4/5] rounded-[1.3rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.65),transparent_28%),linear-gradient(145deg,#ead4b5_0%,#cba88a_32%,#87695b_70%,#2d221e_100%)]" />
                <div className="mt-5">
                  <div className="eyebrow">{product.tag}</div>
                  <h3 className="font-editorial mt-4 text-[2rem] font-semibold text-[#241914]">
                    {product.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#65564d]">{product.desc}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-lg font-semibold text-[#241914]">{product.price}</span>
                    <span className="text-sm text-[#7d675a]">查看详情</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="categories" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-24">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="eyebrow">精选系列</div>
              <h2 className="font-editorial mt-4 text-4xl font-semibold text-[#241914] md:text-6xl">
                A quieter, more elevated way to browse
              </h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.title}
                to={`/category/${encodeURIComponent(category.title)}`}
                className="tone-card rounded-[1.55rem] p-5 transition duration-300 hover:-translate-y-[2px]"
              >
                <div className="eyebrow">系列</div>
                <div className="font-editorial mt-4 text-[1.9rem] font-semibold text-[#241914]">
                  {category.title}
                </div>
                <p className="mt-3 text-sm leading-7 text-[#65564d]">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:pb-20">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
            <div className="tone-low rounded-[2rem] p-6 md:p-8">
              <div className="eyebrow">信任与材质</div>
              <h2 className="font-editorial mt-4 text-4xl font-semibold text-[#241914] md:text-5xl">
                让信任自然发生，而不是被用力强调
              </h2>
              <p className="mt-4 text-sm leading-8 text-[#65564d]">
                我们把 body-safe materials、隐私包装、安心售后与清晰说明融入浏览与购买路径，
                让信任内容始终可见，但不过度打断体验。
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="tone-card rounded-[1.4rem] p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#9a897e]">Materials</div>
                <p className="mt-3 text-sm leading-7 text-[#65564d]">身体友好材料与更舒适的日常使用体验。</p>
              </div>
              <div className="tone-card rounded-[1.4rem] p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#9a897e]">Discreet Packaging</div>
                <p className="mt-3 text-sm leading-7 text-[#65564d]">所有订单均采用隐私包装发货，减少额外心理负担。</p>
              </div>
              <div className="tone-card rounded-[1.4rem] p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#9a897e]">Care</div>
                <p className="mt-3 text-sm leading-7 text-[#65564d]">更清楚的说明、更平和的语气、更少羞耻感触发。</p>
              </div>
              <div className="tone-card rounded-[1.4rem] p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#9a897e]">Support</div>
                <p className="mt-3 text-sm leading-7 text-[#65564d]">需要帮助时，始终能找到明确、安静而专业的支持。</p>
              </div>
            </div>
          </div>
        </section>

        <section id="ritual" className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:pb-20">
          <div className="tone-low rounded-[2rem] px-5 py-8 sm:px-8 md:px-10 md:py-12">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <div className="eyebrow">品牌气质</div>
                <h2 className="font-editorial mt-4 text-4xl font-semibold text-[#241914] md:text-6xl">
                  Premium adult wellness,
                  <span className="block text-[#b28958]">without the visual noise</span>
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="tone-card rounded-[1.3rem] p-5">
                  <h3 className="font-editorial text-2xl font-semibold text-[#241914]">视觉克制</h3>
                  <p className="mt-3 text-sm leading-7 text-[#65564d]">
                    留白优先，避免促销感与过度刺激式展示。
                  </p>
                </div>
                <div className="tone-card rounded-[1.3rem] p-5">
                  <h3 className="font-editorial text-2xl font-semibold text-[#241914]">暖调质感</h3>
                  <p className="mt-3 text-sm leading-7 text-[#65564d]">
                    以柔和中性色与轻金色点缀建立高端气质。
                  </p>
                </div>
                <div className="tone-card rounded-[1.3rem] p-5">
                  <h3 className="font-editorial text-2xl font-semibold text-[#241914]">生活方式表达</h3>
                  <p className="mt-3 text-sm leading-7 text-[#65564d]">
                    让品牌更像 editorial wellness，而非普通商城模板。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-18 sm:px-6 md:pb-28">
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((quote) => (
              <div key={quote} className="tone-card rounded-[1.5rem] p-6">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#9a897e]">Review</div>
                <p className="mt-4 font-editorial text-2xl leading-[1.2] text-[#241914]">{quote}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

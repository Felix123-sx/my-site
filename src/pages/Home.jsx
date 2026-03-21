import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { products } from "../data/products";

export default function Home() {
  const needs = [
    {
      title: "初次尝试",
      description: "从更低门槛、温和友好的产品开始，建立舒适体验。",
      href: "/category/%E6%B6%A6%E6%BB%91%E6%8A%A4%E7%90%86",
    },
    {
      title: "伴侣关系",
      description: "更适合共同探索、礼赠与关系场景的精选组合。",
      href: "/category/%E6%83%85%E4%BE%A3%E5%85%B3%E6%80%80",
    },
    {
      title: "日常护理",
      description: "围绕私密健康与身体友好，建立日常护理秩序。",
      href: "/category/%E7%A7%81%E5%AF%86%E5%81%A5%E5%BA%B7",
    },
  ];

  const trustPoints = ["隐私包装", "身体友好材料", "安全支付", "清晰护理说明"];
  const featuredProducts = products.slice(0, 3);
  const bestSellers = products.slice(1, 5);
  const testimonials = [
    "“更像高端 wellness 品牌，而不是传统成人电商。”",
    "“浏览体验很安静，产品也更容易被信任。”",
    "“视觉上有情绪，但转化路径也很清楚。”",
  ];
  const faqs = [
    {
      q: "是否支持隐私包装？",
      a: "支持。所有订单均采用隐私包装发货，外箱不显示敏感商品信息。",
    },
    {
      q: "新手适合从哪类产品开始？",
      a: "通常建议先从润滑护理或更温和的护理型产品开始，更容易建立舒适体验。",
    },
    {
      q: "如果我不确定怎么选？",
      a: "你可以先浏览按需求划分的入口，或直接前往咨询页面获取更私密的建议。",
    },
  ];
  const heroProduct = products[0];

  return (
    <div className="min-h-screen tone-base text-[#261b17]">
      <Navbar />

      <main>
        <section id="home" className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 md:pb-24 md:pt-14">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-8">
            <div className="tone-mid relative overflow-hidden rounded-[2.2rem] p-6 sm:p-8 md:p-10 lg:min-h-[720px]">
              <div className="hero-glow absolute -right-10 top-0 h-52 w-52 rounded-full" />
              <div className="hero-glow absolute bottom-10 left-0 h-36 w-36 rounded-full" />

              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div className="eyebrow">Velure Health · Intimate Luxury</div>
                  <h1 className="font-editorial editorial-hero mt-6 max-w-4xl text-5xl font-semibold text-[#241914] sm:text-6xl md:text-7xl lg:text-[5.4rem]">
                    A warmer, deeper product mood,
                    <span className="mt-2 block text-[#6f2735]">built for desire, trust, and conversion</span>
                  </h1>
                  <p className="mt-6 max-w-2xl text-sm leading-8 text-[#66524f] sm:text-base md:text-[1.02rem]">
                    品牌气质仍然重要，但首页现在更直接地服务产品发现与购买决策。
                    通过更有情绪的酒红色调、动态产品展示与清晰入口，提升浏览与转化效率。
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link to={`/product/${heroProduct.id}`} className="btn-primary">立即查看主推产品</Link>
                    <Link to="/shop" className="btn-secondary">浏览全部产品</Link>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2.5">
                    {trustPoints.map((item) => (
                      <div key={item} className="pill-soft">{item}</div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
                  <Link
                    to={`/product/${heroProduct.id}`}
                    className="tone-card rounded-[1.5rem] p-5 transition duration-300 hover:-translate-y-[2px]"
                  >
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[#98827e]">Hero Product</div>
                    <div className="font-editorial mt-3 text-3xl font-semibold text-[#241914]">
                      {heroProduct.name}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[#66524f]">{heroProduct.desc}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-semibold text-[#241914]">{heroProduct.price}</span>
                      <span className="text-sm text-[#7e6865]">查看详情</span>
                    </div>
                  </Link>

                  <div className="rounded-[1.5rem] bg-[rgba(43,24,27,0.94)] p-5 text-[#f7efeb]">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[#d8bcc4]">Current Focus</div>
                    <p className="font-editorial mt-3 text-3xl leading-[1.1]">
                      Wine depth.
                      <span className="block text-[#edcfd7]">Quiet persuasion.</span>
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[#ead9dd]">
                      更深的情绪色调，让首页像一个更成熟、更亲密的 premium commerce experience。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-rows-[1.2fr_0.8fr]">
              <Link
                to={`/product/${heroProduct.id}`}
                className="product-stage slow-float relative overflow-hidden rounded-[2rem] p-6 sm:p-8"
              >
                <div className="product-orb absolute left-[8%] top-[8%] h-16 w-16 rounded-full" />
                <div className="product-orb absolute bottom-[12%] right-[10%] h-20 w-20 rounded-full" />
                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <div className="eyebrow">主推展示</div>
                    <div className="font-editorial mt-4 max-w-sm text-4xl font-semibold leading-[1.02] text-[#fff8f4] md:text-5xl">
                      更像一件被认真陈列的对象，
                      <span className="block text-[#f0d6dd]">有物感，也更以产品为中心</span>
                    </div>
                  </div>

                  <div className="mt-10 flex items-end justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-[#e3cbd1]">Featured</div>
                      <div className="mt-2 text-sm text-[#f7eceb]">{heroProduct.name}</div>
                    </div>
                    <div className="text-sm text-[#f7eceb]">立即进入</div>
                  </div>
                </div>
              </Link>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {featuredProducts.slice(1, 3).map((product, index) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className={`tone-card rounded-[1.6rem] p-4 transition duration-300 hover:-translate-y-[2px] ${index === 0 ? "slow-float" : "slow-float-delayed"}`}
                  >
                    <div className="aspect-[4/3] rounded-[1.2rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.5),transparent_28%),linear-gradient(145deg,#b8848d_0%,#7e4652_34%,#4c3036_72%,#211719_100%)]" />
                    <div className="mt-4">
                      <div className="eyebrow">{product.tag}</div>
                      <div className="font-editorial mt-3 text-3xl font-semibold text-[#241914]">{product.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="featured" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="eyebrow">动态精选</div>
              <h2 className="font-editorial mt-4 text-4xl font-semibold text-[#241914] md:text-6xl">
                更有节奏感的产品展示
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-[#66524f] md:text-base">
                首页不再只是品牌陈述，而是一个更直接的产品 landing zone。
              </p>
            </div>
            <Link to="/shop" className="text-sm uppercase tracking-[0.16em] text-[#7e6865] underline underline-offset-4">
              浏览全部
            </Link>
          </div>

          <div className="horizontal-scroll gap-5 pb-2">
            {featuredProducts.map((product, index) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className={`tone-card min-w-[280px] rounded-[1.7rem] p-4 sm:min-w-[340px] ${index % 2 === 0 ? "slow-float" : "slow-float-delayed"}`}
              >
                <div className="aspect-[4/5] rounded-[1.3rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.52),transparent_28%),linear-gradient(145deg,#b98590_0%,#7c4250_32%,#482c31_70%,#1d1416_100%)]" />
                <div className="mt-5">
                  <div className="eyebrow">{product.tag}</div>
                  <h3 className="font-editorial mt-4 text-[2rem] font-semibold text-[#241914]">{product.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#66524f]">{product.desc}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-lg font-semibold text-[#241914]">{product.price}</span>
                    <span className="text-sm text-[#7e6865]">查看详情</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="categories" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
          <div className="mb-8 max-w-3xl">
            <div className="eyebrow">按需求选购</div>
            <h2 className="font-editorial mt-4 text-4xl font-semibold text-[#241914] md:text-6xl">
              Shop by need / scenario
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {needs.map((item) => (
              <Link key={item.title} to={item.href} className="tone-card rounded-[1.6rem] p-6 transition duration-300 hover:-translate-y-[2px]">
                <div className="eyebrow">场景入口</div>
                <div className="font-editorial mt-4 text-4xl font-semibold text-[#241914]">{item.title}</div>
                <p className="mt-4 text-sm leading-8 text-[#66524f]">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
          <div className="mb-8 max-w-3xl">
            <div className="eyebrow">畅销推荐</div>
            <h2 className="font-editorial mt-4 text-4xl font-semibold text-[#241914] md:text-6xl">
              更值得优先了解的畅销选择
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {bestSellers.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="tone-card rounded-[1.5rem] p-4 transition duration-300 hover:-translate-y-[2px]">
                <div className="aspect-[4/5] rounded-[1.2rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.5),transparent_28%),linear-gradient(145deg,#ba8790_0%,#824855_34%,#4d2e34_74%,#1c1416_100%)]" />
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-editorial text-[1.8rem] font-semibold text-[#241914]">{product.name}</div>
                    <div className="mt-1 text-sm text-[#66524f]">{product.price}</div>
                  </div>
                  <span className="text-sm text-[#7e6865]">进入</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
            <div className="tone-low rounded-[2rem] p-6 md:p-8">
              <div className="eyebrow">信任信号</div>
              <h2 className="font-editorial mt-4 text-4xl font-semibold text-[#241914] md:text-5xl">
                让信任自然发生，而不是被用力强调
              </h2>
              <p className="mt-4 text-sm leading-8 text-[#66524f]">
                我们把 body-safe materials、隐私包装、安心售后与清晰说明融入浏览与购买路径，
                让信任内容始终可见，但不过度打断体验。
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="tone-card rounded-[1.4rem] p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#98827e]">Materials</div>
                <p className="mt-3 text-sm leading-7 text-[#66524f]">身体友好材料与更舒适的日常使用体验。</p>
              </div>
              <div className="tone-card rounded-[1.4rem] p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#98827e]">Discreet Packaging</div>
                <p className="mt-3 text-sm leading-7 text-[#66524f]">所有订单均采用隐私包装发货，减少额外心理负担。</p>
              </div>
              <div className="tone-card rounded-[1.4rem] p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#98827e]">Care</div>
                <p className="mt-3 text-sm leading-7 text-[#66524f]">更清楚的说明、更平和的语气、更少羞耻感触发。</p>
              </div>
              <div className="tone-card rounded-[1.4rem] p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#98827e]">Support</div>
                <p className="mt-3 text-sm leading-7 text-[#66524f]">需要帮助时，始终能找到明确、安静而专业的支持。</p>
              </div>
            </div>
          </div>
        </section>

        <section id="ritual" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
          <div className="tone-low rounded-[2rem] px-5 py-8 sm:px-8 md:px-10 md:py-12">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <div className="eyebrow">品牌叙事</div>
                <h2 className="font-editorial mt-4 text-4xl font-semibold text-[#241914] md:text-6xl">
                  Intimate luxury,
                  <span className="block text-[#6f2735]">with a product-first rhythm</span>
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="tone-card rounded-[1.3rem] p-5">
                  <h3 className="font-editorial text-2xl font-semibold text-[#241914]">视觉克制</h3>
                  <p className="mt-3 text-sm leading-7 text-[#66524f]">留白优先，避免促销感与过度刺激式展示。</p>
                </div>
                <div className="tone-card rounded-[1.3rem] p-5">
                  <h3 className="font-editorial text-2xl font-semibold text-[#241914]">产品优先</h3>
                  <p className="mt-3 text-sm leading-7 text-[#66524f]">品牌 mood 服务于产品展示与转化，而不是取代它。</p>
                </div>
                <div className="tone-card rounded-[1.3rem] p-5">
                  <h3 className="font-editorial text-2xl font-semibold text-[#241914]">动态节奏</h3>
                  <p className="mt-3 text-sm leading-7 text-[#66524f]">轻量、缓慢、优雅的动态让首页更像 living commerce experience。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
          <div className="mb-8 max-w-3xl">
            <div className="eyebrow">评价与口碑</div>
            <h2 className="font-editorial mt-4 text-4xl font-semibold text-[#241914] md:text-6xl">
              Social proof in a calmer voice
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((quote) => (
              <div key={quote} className="tone-card rounded-[1.5rem] p-6">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#98827e]">Review</div>
                <p className="mt-4 font-editorial text-2xl leading-[1.2] text-[#241914]">{quote}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
            <div>
              <div className="eyebrow">FAQ / Learn More</div>
              <h2 className="font-editorial mt-4 text-4xl font-semibold text-[#241914] md:text-6xl">
                减少不确定感，提升购买信心
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((item) => (
                <div key={item.q} className="tone-card rounded-[1.4rem] p-5">
                  <h3 className="font-editorial text-2xl font-semibold text-[#241914]">{item.q}</h3>
                  <p className="mt-3 text-sm leading-8 text-[#66524f]">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 md:pb-28">
          <div className="tone-mid rounded-[2rem] px-6 py-8 md:px-10 md:py-12">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                <div className="eyebrow">开始选购</div>
                <h2 className="font-editorial mt-4 text-4xl font-semibold text-[#241914] md:text-6xl">
                  从一件产品开始，
                  <span className="block text-[#6f2735]">进入更完整的品牌体验</span>
                </h2>
                <p className="mt-4 text-sm leading-8 text-[#66524f] md:text-base">
                  现在进入产品页，开始一次更高端、更克制、也更容易信任的私密健康购物体验。
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link to="/shop" className="btn-primary">立即选购</Link>
                <Link to="/about" className="btn-secondary">阅读品牌故事</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

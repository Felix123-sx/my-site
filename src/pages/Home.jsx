import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { products } from "../data/products";

export default function Home() {
  const heroProduct = products[0];
  const featuredProducts = products.slice(0, 3);
  const bestSellers = products.slice(1, 5);

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
      description: "围绕私密健康与身体友好，建立更稳定的日常护理秩序。",
      href: "/category/%E7%A7%81%E5%AF%86%E5%81%A5%E5%BA%B7",
    },
  ];

  const trustItems = [
    {
      title: "身体友好材料",
      text: "更关注材料、触感与长期使用体验，而不是夸张的刺激叙事。",
    },
    {
      title: "隐私包装发货",
      text: "所有订单均采用隐私包装，减少额外心理负担，让购买过程更平静。",
    },
    {
      title: "清晰护理说明",
      text: "从浏览到购买，都提供更明确的说明与更容易理解的选择路径。",
    },
    {
      title: "私密支持体验",
      text: "如果你不确定从哪里开始，也能通过咨询获得更温和的建议。",
    },
  ];

  const testimonials = [
    "“更像一个真正有审美的品牌网站，而不是普通成人电商。”",
    "“页面有情绪，但依然很清楚知道该从哪里开始看产品。”",
    "“整体很克制，也更容易让人产生信任感。”",
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

  return (
    <div className="min-h-screen tone-base text-[var(--text)]">
      <Navbar />

      <main>
        <section id="home" className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 md:pb-20 md:pt-14 reveal-up">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <div className="tone-mid relative overflow-hidden rounded-[2.35rem] px-6 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10 lg:min-h-[760px] large-story-card hero-stage">
              <div className="hero-glow absolute -right-12 top-2 h-56 w-56 rounded-full" />
              <div className="hero-glow hero-glow-delay absolute bottom-6 left-0 h-40 w-40 rounded-full" />

              <div className="relative flex h-full flex-col justify-between">
                <div className="reveal-up reveal-delay-1">
                  <div className="eyebrow">Velure Health · Premium Intimate Wellness</div>

                  <h1 className="font-editorial editorial-hero mt-6 max-w-5xl text-5xl font-semibold text-[var(--ui-title)] sm:text-6xl md:text-7xl lg:text-[5.5rem] text-shift-soft">
                    更有情绪，也更以产品为中心的首页体验
                  </h1>

                  <p className="mt-6 max-w-2xl text-sm leading-8 text-[var(--ui-copy)] sm:text-base md:text-[1.02rem]">
                    我们希望首页既能承接品牌气质，也能成为真正高效的产品入口。
                    它更清楚地展示主推产品、浏览路径与信任信息，同时保留克制、成熟、私密的品牌氛围。
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link to={`/product/${heroProduct.id}`} className="btn-primary magnet-lift">
                      查看主推产品
                    </Link>
                    <Link to="/shop" className="btn-secondary magnet-lift">
                      浏览全部产品
                    </Link>
                  </div>
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-[1.05fr_0.95fr] reveal-up reveal-delay-2">
                  <div className="tone-card rounded-[1.55rem] p-5 md:p-6 hover-panel">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ui-kicker)]">主推产品</div>
                    <h2 className="font-editorial mt-3 text-3xl font-semibold text-[var(--ui-title)] md:text-[2.3rem]">
                      {heroProduct.name}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--ui-copy)]">
                      {heroProduct.desc}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-lg font-semibold text-[var(--ui-title)]">{heroProduct.price}</span>
                      <Link to={`/product/${heroProduct.id}`} className="text-sm text-[var(--ui-kicker)] underline underline-offset-4">
                        了解更多
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-[1.55rem] bg-[rgba(43,24,27,0.94)] p-5 md:p-6 text-[#f7efeb] hover-panel-dark">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[#d8bcc4]">当前重点</div>
                    <p className="font-editorial mt-4 text-3xl leading-[1.1] md:text-[2.3rem]">
                      更深的情绪层次，
                      <span className="block text-[#edcfd7]">更克制的说服力。</span>
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[#ead9dd]">
                      让产品、氛围与转化路径同时成立，而不是只停留在品牌展示层面。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-rows-[1.2fr_0.8fr] reveal-up reveal-delay-1">
              <Link
                to={`/product/${heroProduct.id}`}
                className="product-stage slow-float relative overflow-hidden rounded-[2.2rem] p-6 sm:p-8 md:p-9 large-story-card-dark magnetic-surface"
              >
                <div className="product-orb absolute left-[9%] top-[8%] h-16 w-16 rounded-full" />
                <div className="product-orb product-orb-delay absolute bottom-[12%] right-[10%] h-20 w-20 rounded-full" />

                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <div className="eyebrow">视觉主场</div>
                    <div className="font-editorial mt-4 max-w-sm text-4xl font-semibold leading-[1.02] text-[#fff8f4] md:text-5xl text-shift-soft-dark">
                      更像被认真陈列的对象，
                      <span className="block text-[#f0d6dd]">而不是被喧闹售卖的商品</span>
                    </div>
                  </div>

                  <div className="mt-10 flex items-end justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-[#e3cbd1]">主视觉产品</div>
                      <div className="mt-2 text-sm text-[#f7eceb]">{heroProduct.name}</div>
                    </div>
                    <div className="text-sm text-[#f7eceb]">进入详情</div>
                  </div>
                </div>
              </Link>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {featuredProducts.slice(1, 3).map((product, index) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className={`tone-card rounded-[1.65rem] p-4 home-card-tilt transition duration-300 hover:-translate-y-[2px] ${index === 0 ? "slow-float" : "slow-float-delayed"}`}
                  >
                    <div className="media-shell rounded-[1.25rem]">
                      <div className="aspect-[4/3] rounded-[1.25rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.5),transparent_28%),linear-gradient(145deg,#b8848d_0%,#7e4652_34%,#4c3036_72%,#211719_100%)] media-zoom" />
                    </div>
                    <div className="mt-4">
                      <div className="eyebrow">{product.tag}</div>
                      <div className="font-editorial mt-3 text-3xl font-semibold text-[var(--ui-title)]">
                        {product.name}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="featured" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-18 reveal-up reveal-delay-1">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div>
              <div className="eyebrow">精选产品</div>
              <h2 className="font-editorial mt-4 text-4xl font-semibold text-[var(--ui-title)] md:text-6xl text-shift-soft">
                先看最值得优先了解的几件产品
              </h2>
            </div>

            <div className="tone-low rounded-[1.9rem] p-6 md:p-8 hover-panel">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ui-kicker)]">产品叙事</div>
              <p className="mt-3 text-sm leading-8 text-[var(--ui-copy)] md:text-base">
                这一段更像首页中的主推章节：既让用户快速进入产品，也保留足够完整的品牌气质与视觉呼吸。
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3 stagger-grid cinematic-section-flow">
            {featuredProducts.map((product, idx) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className={`tone-card rounded-[1.8rem] p-4 home-card-tilt reveal-up reveal-delay-${Math.min(idx + 1, 3)}`}
              >
                <div className="media-shell rounded-[1.35rem]">
                  <div className="aspect-[4/5] rounded-[1.35rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.52),transparent_28%),linear-gradient(145deg,#b98590_0%,#7c4250_32%,#482c31_70%,#1d1416_100%)] media-zoom" />
                </div>
                <div className="mt-5">
                  <div className="eyebrow">{product.tag}</div>
                  <h3 className="font-editorial mt-4 text-[2rem] font-semibold text-[var(--ui-title)]">
                    {product.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--ui-copy)]">
                    {product.desc}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-lg font-semibold text-[var(--ui-title)]">{product.price}</span>
                    <span className="text-sm text-[var(--ui-kicker)]">了解更多</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="categories" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-18 reveal-up reveal-delay-1">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <div className="eyebrow">按需求开始</div>
              <h2 className="font-editorial mt-4 text-4xl font-semibold text-[var(--ui-title)] md:text-6xl text-shift-soft">
                用更清楚的方式开始浏览
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-8 text-[var(--ui-copy)] md:ml-auto md:text-base">
              不把首页做成密集货架，而是先给出更容易进入的浏览路径，让用户知道自己该从哪里开始。
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3 stagger-grid">
            {needs.map((item, idx) => (
              <Link
                key={item.title}
                to={item.href}
                className={`soft-tonal-card rounded-[1.7rem] p-6 home-card-tilt reveal-up reveal-delay-${Math.min(idx + 1, 3)}`}
              >
                <div className="eyebrow">浏览入口</div>
                <div className="font-editorial mt-4 text-4xl font-semibold text-[var(--ui-title)]">
                  {item.title}
                </div>
                <p className="mt-4 text-sm leading-8 text-[var(--ui-copy)]">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-18 reveal-up reveal-delay-1">
          <div className="tone-low rounded-[2.15rem] px-6 py-8 md:px-10 md:py-12 hover-panel">
            <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
              <div>
                <div className="eyebrow">信任与说明</div>
                <h2 className="font-editorial mt-4 text-4xl font-semibold text-[var(--ui-title)] md:text-6xl text-shift-soft">
                  把信任内容作为首页中的正式章节
                </h2>
                <p className="mt-4 text-sm leading-8 text-[var(--ui-copy)] md:text-base">
                  借用更强的品牌网站结构控制力，让信任信息不再只是几个角落标记，而是作为完整模块出现。
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {trustItems.map((item, idx) => (
                  <div key={item.title} className={`trust-tonal-card rounded-[1.45rem] p-5 hover-panel reveal-up reveal-delay-${(idx % 3) + 1}`}>
                    <div className="trust-kicker">Trust Signal</div>
                    <h3 className="font-editorial mt-3 text-2xl font-semibold trust-title">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 trust-copy">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-18 reveal-up reveal-delay-1">
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 stagger-grid">
              {bestSellers.map((product, idx) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className={`tone-card rounded-[1.5rem] p-4 home-card-tilt reveal-up reveal-delay-${(idx % 3) + 1}`}
                >
                  <div className="media-shell rounded-[1.2rem]">
                    <div className="aspect-[4/5] rounded-[1.2rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.5),transparent_28%),linear-gradient(145deg,#ba8790_0%,#824855_34%,#4d2e34_74%,#1c1416_100%)] media-zoom" />
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-editorial text-[1.8rem] font-semibold text-[var(--ui-title)]">
                        {product.name}
                      </div>
                      <div className="mt-1 text-sm text-[var(--ui-copy)]">{product.price}</div>
                    </div>
                    <span className="text-sm text-[var(--ui-kicker)]">进入</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="tone-mid rounded-[2rem] p-6 md:p-8 hover-panel">
              <div className="eyebrow">畅销系列</div>
              <h2 className="font-editorial mt-4 text-4xl font-semibold text-[var(--ui-title)] md:text-5xl text-shift-soft">
                更值得优先了解的畅销选择
              </h2>
              <p className="mt-4 text-sm leading-8 text-[var(--ui-copy)] md:text-base">
                这部分借用了更强模块化 section 的思路：用一个完整章节承接畅销产品，而不是简单地继续往下堆卡片。
              </p>
              <div className="mt-6">
                <Link to="/shop" className="btn-secondary magnet-lift">进入产品列表</Link>
              </div>
            </div>
          </div>
        </section>

        <section id="ritual" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-18 reveal-up reveal-delay-1">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
            <div className="tone-mid rounded-[2.15rem] p-6 md:p-8 hover-panel">
              <div className="eyebrow">品牌叙事</div>
              <h2 className="font-editorial mt-4 text-4xl font-semibold text-[var(--ui-title)] md:text-6xl text-shift-soft">
                更像一个有温度的品牌网站，
                <span className="block text-[#6f2735]">也更像一个真正能带来转化的首页</span>
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 stagger-grid">
              {[
                ["更大的块面", "用更完整的章节容器替代过多零碎模块，让首页更有结构控制力。"],
                ["更清晰的主次", "每一段只讲一件事，让产品、品牌与信任信息都有更明确的位置。"],
                ["更柔和的转译", "借用品牌官网的结构节奏，但保留私密健康品牌需要的温度、物感与克制。"],
              ].map(([title, text], idx) => (
                <div key={title} className={`tone-card rounded-[1.45rem] p-5 hover-panel reveal-up reveal-delay-${idx + 1}`}>
                  <h3 className="font-editorial text-2xl font-semibold text-[var(--ui-title)]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--ui-copy)]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-18 reveal-up reveal-delay-1">
          <div className="grid gap-4 md:grid-cols-3 stagger-grid">
            {testimonials.map((quote, idx) => (
              <div key={quote} className={`tone-card rounded-[1.55rem] p-6 quote-card hover-panel reveal-up reveal-delay-${idx + 1}`}>
                <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--ui-kicker)]">用户反馈</div>
                <p className="mt-4 font-editorial text-2xl leading-[1.2] text-[var(--ui-title)]">
                  {quote}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-18 reveal-up reveal-delay-1">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
            <div>
              <div className="eyebrow">了解更多</div>
              <h2 className="font-editorial mt-4 text-4xl font-semibold text-[var(--ui-title)] md:text-6xl text-shift-soft">
                减少不确定感，提升购买信心
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((item, idx) => (
                <div key={item.q} className={`tone-card rounded-[1.45rem] p-5 hover-panel reveal-up reveal-delay-${(idx % 3) + 1}`}>
                  <h3 className="font-editorial text-2xl font-semibold text-[var(--ui-title)]">
                    {item.q}
                  </h3>
                  <p className="mt-3 text-sm leading-8 text-[var(--ui-copy)]">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 md:pb-28 reveal-up reveal-delay-1">
          <div className="tone-mid rounded-[2.2rem] px-6 py-8 md:px-10 md:py-12 hover-panel">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                <div className="eyebrow">开始选购</div>
                <h2 className="font-editorial mt-4 text-4xl font-semibold text-[var(--ui-title)] md:text-6xl text-shift-soft">
                  从一件产品开始，
                  <span className="block text-[#6f2735]">进入更完整的品牌体验</span>
                </h2>
                <p className="mt-4 text-sm leading-8 text-[var(--ui-copy)] md:text-base">
                  现在进入产品页，开始一次更高端、更克制、也更容易信任的私密健康购物体验。
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link to="/shop" className="btn-primary magnet-lift">立即选购</Link>
                <Link to="/about" className="btn-secondary magnet-lift">阅读品牌故事</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

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

  return (
    <div className="min-h-screen tone-base text-[#261b17]">
      <Navbar />

      <main>
        <section id="home" className="mx-auto max-w-7xl px-4 pb-18 pt-10 sm:px-6 md:pb-28 md:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
            <div className="max-w-3xl">
              <div className="eyebrow">Velure Health · Editorial Wellness</div>

              <h1 className="font-editorial editorial-hero mt-6 max-w-5xl text-5xl font-semibold text-[#241914] sm:text-6xl md:text-7xl lg:text-[5.8rem]">
                Luxury intimate care,
                <span className="mt-2 block text-[#b28958]">shaped with softness and restraint</span>
              </h1>

              <p className="mt-7 max-w-2xl text-sm leading-8 text-[#65564d] sm:text-base md:text-[1.02rem]">
                Velure Health 以更柔和、更高级的方式呈现成人 wellness。
                我们把页面、产品与品牌语气统一成更克制的体验——像一本生活方式杂志，而不是喧闹的商品陈列。
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/shop" className="btn-primary">
                  探索产品
                </Link>
                <a href="#categories" className="btn-secondary">
                  浏览系列
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {trustPoints.map((item) => (
                  <div key={item} className="pill-soft">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="tone-mid overflow-hidden rounded-[2rem] p-4 sm:p-5 md:p-6">
              <div className="relative overflow-hidden rounded-[1.6rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.6),transparent_26%),linear-gradient(140deg,#eedcc5_0%,#ccb09a_28%,#7f6456_62%,#342724_100%)] p-6 sm:p-8 md:min-h-[620px] md:p-10">
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(24,14,11,0.24)] via-transparent to-[rgba(255,255,255,0.12)]" />

                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <div className="eyebrow">Signature Mood</div>
                    <div className="font-editorial mt-5 max-w-md text-3xl font-semibold leading-[1.05] text-[#fff7ef] md:text-5xl">
                      Soft cinematic light.
                      <span className="mt-2 block text-[#f4ddbf]">Quiet sensuality.</span>
                    </div>
                  </div>

                  <div className="mt-16 max-w-sm rounded-[1.35rem] bg-[rgba(255,248,240,0.14)] p-5 backdrop-blur-sm md:mt-24">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-[#f5dfc4]">
                      Brand Direction
                    </div>
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

        <section id="categories" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-24">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="eyebrow">Curated Series</div>
              <h2 className="font-editorial mt-4 text-4xl font-semibold text-[#241914] md:text-6xl">
                A quieter, more elevated way to browse
              </h2>
            </div>

            <Link to="/shop" className="text-sm uppercase tracking-[0.16em] text-[#7d675a] underline underline-offset-4">
              Shop all
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.title}
                to={`/category/${encodeURIComponent(category.title)}`}
                className="tone-card rounded-[1.55rem] p-5 transition duration-300 hover:-translate-y-[2px]"
              >
                <div className="eyebrow">Series</div>
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

        <section id="ritual" className="mx-auto max-w-7xl px-4 pb-18 sm:px-6 md:pb-28">
          <div className="tone-low rounded-[2rem] px-5 py-8 sm:px-8 md:px-10 md:py-12">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <div className="eyebrow">Brand Ritual</div>
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
      </main>
    </div>
  );
}

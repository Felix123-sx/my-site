import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const categories = [
    {
      title: "情侣关怀",
      description: "更自然、舒适的亲密关系护理选择。",
    },
    {
      title: "润滑护理",
      description: "温和、身体友好的日常私密护理产品。",
    },
    {
      title: "私密健康",
      description: "围绕安心感与日常护理建立基础选择。",
    },
    {
      title: "精选器具",
      description: "以克制设计与成熟审美呈现品质体验。",
    },
  ];

  const trustPoints = ["隐私包装", "身体友好", "正规采购", "售后支持"];

  return (
    <div className="min-h-screen tone-base text-[#2f342e]">
      <Navbar />

      <main>
        <section id="home" className="mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 md:pb-20 md:pt-16">
          <div className="grid items-start gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
            <div className="max-w-3xl">
              <div className="eyebrow">
                Velure Health · Private Wellness
              </div>

              <h1 className="font-editorial editorial-hero mt-5 max-w-4xl text-4xl font-semibold sm:text-5xl md:text-6xl lg:text-[4.5rem]">
                用更成熟、克制的方式
                <span className="mt-2 block text-[#536257]">
                  呈现私密健康体验
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-[#5b645b] sm:text-base md:leading-8">
                我们希望把选择变得更自然、更平静。
                从产品表达、页面语言到购买体验，都尽量回到舒适、尊重与身体友好的尺度。
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/shop" className="btn-primary">
                  浏览产品
                </Link>

                <a href="#categories" className="btn-secondary">
                  查看系列
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

            <div className="tone-mid rounded-[1.75rem] p-4 sm:p-5 md:p-6">
              <div className="rounded-[1.4rem] bg-gradient-to-br from-[#fcfbf8] to-[#dfeadf] p-6 sm:p-7 md:p-8">
                <div className="eyebrow">Brand Note</div>

                <div className="font-editorial mt-4 text-2xl font-semibold leading-9 md:text-[2rem] md:leading-[1.35]">
                  更像健康护理品牌，
                  <br />
                  而不是夸张的刺激展示
                </div>

                <p className="mt-5 max-w-md text-sm leading-7 text-[#5b645b] md:text-base md:leading-8">
                  Velure Health 选择更安静的表达方式，
                  让用户在不被打扰的状态下完成了解、选择与购买。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-18">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="eyebrow">Selected Series</div>
              <h2 className="font-editorial mt-3 text-3xl font-semibold md:text-5xl">
                围绕真实需求整理的系列入口
              </h2>
            </div>

            <Link to="/shop" className="text-sm text-[#2f342e] underline underline-offset-4">
              查看全部产品
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.title}
                to={`/category/${encodeURIComponent(category.title)}`}
                className="tone-card rounded-[1.25rem] p-5 transition hover:-translate-y-[1px] hover:bg-[#f8f8f4]"
              >
                <div className="eyebrow">Series</div>
                <div className="font-editorial mt-4 text-2xl font-semibold">
                  {category.title}
                </div>
                <p className="mt-3 text-sm leading-7 text-[#5b645b]">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section id="trust" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-24">
          <div className="tone-low rounded-[1.75rem] px-5 py-8 sm:px-7 md:px-10 md:py-10">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <div className="eyebrow">Our Promise</div>
                <h2 className="font-editorial mt-3 text-3xl font-semibold md:text-5xl">
                  安心、隐私与更长期的信任感
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="tone-card rounded-[1.15rem] p-5">
                  <h3 className="font-editorial text-xl font-semibold">隐私优先</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5b645b]">
                    包装与购买流程尽量克制，减少额外心理负担。
                  </p>
                </div>

                <div className="tone-card rounded-[1.15rem] p-5">
                  <h3 className="font-editorial text-xl font-semibold">温和表达</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5b645b]">
                    用更舒适的页面语言，建立自然的浏览体验。
                  </p>
                </div>

                <div className="tone-card rounded-[1.15rem] p-5">
                  <h3 className="font-editorial text-xl font-semibold">品质选择</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5b645b]">
                    不追求喧闹展示，而强调材料、体验与长期信任。
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

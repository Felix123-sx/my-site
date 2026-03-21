import Navbar from "../components/Navbar";

const values = [
  {
    title: "亲密作为日常护理",
    text: "我们相信 intimate wellness 不该被包装成夸张刺激的消费品，而应被理解为一种更成熟、更诚实的自我照顾方式。",
  },
  {
    title: "设计感与身体感并重",
    text: "从材料、手感到页面语言，Velure Health 关注的不只是功能，更是人与物之间更安静、更舒适的关系。",
  },
  {
    title: "克制比喧闹更有力量",
    text: "我们避免低端成人零售常见的视觉噪音，选择用更克制的方式建立信任、欲望与长期品牌感。",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen tone-base text-[#261b17]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 md:pb-28 md:pt-16">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div>
            <div className="eyebrow">品牌故事</div>
            <h1 className="font-editorial mt-5 text-5xl font-semibold leading-none text-[#241914] md:text-7xl">
              A premium intimate wellness brand,
              <span className="block text-[#b28958]">built around ritual, care, and confidence</span>
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-8 text-[#65564d] md:text-base">
              Velure Health 希望把 intimate wellness 从传统成人零售语境中抽离出来，
              回到更接近 wellness、design 和 lifestyle 的品牌表达。
            </p>
          </div>

          <div className="tone-mid overflow-hidden rounded-[2rem] p-4 md:p-6">
            <div className="rounded-[1.6rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.56),transparent_28%),linear-gradient(145deg,#f2dec7_0%,#d4baa1_30%,#8f7568_62%,#362927_100%)] p-8 md:min-h-[500px] md:p-10">
              <div className="max-w-sm">
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#f5dfc4]">Brand Point of View</div>
                <p className="mt-5 font-editorial text-3xl leading-[1.08] text-[#fff6ee] md:text-5xl">
                  More design-led,
                  <span className="block text-[#f1d7b4]">less category-led.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          {values.map((item) => (
            <div key={item.title} className="tone-card rounded-[1.5rem] p-6">
              <h2 className="font-editorial text-3xl font-semibold text-[#241914]">
                {item.title}
              </h2>
              <p className="mt-4 text-sm leading-8 text-[#65564d]">
                {item.text}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-14 tone-low rounded-[2rem] px-6 py-8 md:px-10 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="eyebrow">我们的方式</div>
              <h2 className="font-editorial mt-4 text-4xl font-semibold text-[#241914] md:text-6xl">
                Body-safe, discreet,
                <span className="block text-[#b28958]">and emotionally intelligent</span>
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="tone-card rounded-[1.3rem] p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#9a897e]">Materials</div>
                <p className="mt-3 text-sm leading-7 text-[#65564d]">
                  更强调身体友好材料、舒适触感与长期使用体验。
                </p>
              </div>
              <div className="tone-card rounded-[1.3rem] p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#9a897e]">Packaging</div>
                <p className="mt-3 text-sm leading-7 text-[#65564d]">
                  隐私包装与克制表达，减少不必要的羞耻感与心理负担。
                </p>
              </div>
              <div className="tone-card rounded-[1.3rem] p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#9a897e]">Design</div>
                <p className="mt-3 text-sm leading-7 text-[#65564d]">
                  产品被视作高价值对象，而非只强调功能参数的消耗品。
                </p>
              </div>
              <div className="tone-card rounded-[1.3rem] p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#9a897e]">Tone</div>
                <p className="mt-3 text-sm leading-7 text-[#65564d]">
                  语言更温和、智能、现代，不用粗粝或低端的行业陈词滥调。
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

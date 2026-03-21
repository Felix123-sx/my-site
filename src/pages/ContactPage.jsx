import Navbar from "../components/Navbar";

export default function ContactPage() {
  const faqs = [
    {
      q: "是否支持隐私包装？",
      a: "支持。所有订单均采用隐私包装发货，外箱不会显示敏感商品信息。",
    },
    {
      q: "新手适合从哪类产品开始？",
      a: "一般建议优先从润滑护理或更低门槛、身体友好的产品开始，更容易建立舒适体验。",
    },
    {
      q: "如果我不确定选哪款怎么办？",
      a: "你可以先告诉我们你的需求与关注点，我们会根据使用场景给出更合适的建议。",
    },
  ];

  return (
    <div className="min-h-screen tone-base text-[#2f342e]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 md:pb-24 md:pt-14">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div>
            <div className="eyebrow">Contact</div>
            <h1 className="font-editorial mt-4 text-4xl font-semibold md:text-6xl">
              在线咨询
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#5b645b] md:text-base md:leading-8">
              如果你对产品、材质、隐私包装或使用场景有疑问，
              可以通过这个页面联系我们。我们会用更平和、克制的方式协助你完成选择。
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="tone-card rounded-[1.35rem] p-5 md:p-6">
                <div className="eyebrow">Email</div>
                <div className="font-editorial mt-4 text-2xl font-semibold break-all">
                  support@velurehealth.com
                </div>
                <p className="mt-4 text-sm leading-7 text-[#5b645b]">
                  适合发送更详细的问题、产品需求或售后咨询。
                </p>
              </div>

              <div className="tone-card rounded-[1.35rem] p-5 md:p-6">
                <div className="eyebrow">Messaging</div>
                <div className="font-editorial mt-4 text-2xl font-semibold">
                  WeChat / Telegram
                </div>
                <p className="mt-4 text-sm leading-7 text-[#5b645b]">
                  后续也可以接入即时沟通渠道，提供更自然的咨询体验。
                </p>
              </div>
            </div>

            <div className="tone-low mt-8 rounded-[1.75rem] p-5 md:p-8">
              <div className="eyebrow">FAQ</div>
              <div className="mt-5 space-y-4">
                {faqs.map((item) => (
                  <div key={item.q} className="tone-card rounded-[1.2rem] p-5">
                    <h2 className="font-editorial text-xl font-semibold md:text-2xl">
                      {item.q}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[#5b645b]">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="tone-mid h-fit rounded-[1.75rem] p-5 md:p-8">
            <div className="eyebrow">Inquiry Form</div>
            <h2 className="font-editorial mt-4 text-3xl font-semibold md:text-4xl">
              告诉我们你的需求
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#5b645b] md:leading-8">
              先留下简单信息即可，后续可以再逐步接入真实表单与客服系统。
            </p>

            <form className="mt-8 space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#2f342e]">
                  称呼
                </label>
                <input
                  type="text"
                  placeholder="请输入你的称呼"
                  className="w-full border-b border-[#2f342e]/12 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#8b9389]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#2f342e]">
                  联系方式
                </label>
                <input
                  type="text"
                  placeholder="邮箱 / 微信 / Telegram / WhatsApp"
                  className="w-full border-b border-[#2f342e]/12 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#8b9389]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#2f342e]">
                  感兴趣的产品
                </label>
                <input
                  type="text"
                  placeholder="例如：SilkCare 水性润滑剂"
                  className="w-full border-b border-[#2f342e]/12 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#8b9389]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#2f342e]">
                  咨询内容
                </label>
                <textarea
                  rows="6"
                  placeholder="请描述你的问题或需求"
                  className="w-full border-b border-[#2f342e]/12 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#8b9389]"
                />
              </div>

              <button type="button" className="btn-primary w-full">
                提交咨询
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

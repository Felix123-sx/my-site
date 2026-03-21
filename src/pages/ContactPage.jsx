import Navbar from "../components/Navbar";

export default function ContactPage() {
  const faqs = [
    {
      q: "是否支持隐私包装？",
      a: "支持。所有订单均采用隐私包装发货，外箱不会显示敏感商品信息。",
    },
    {
      q: "新手适合从哪类产品开始？",
      a: "一般建议优先从润滑护理或更柔和、低门槛的产品开始，更容易建立舒适体验。",
    },
    {
      q: "如果我不确定选哪款怎么办？",
      a: "你可以先告诉我们你的需求与关注点，我们会根据使用场景给出更合适的建议。",
    },
  ];

  return (
    <div className="min-h-screen tone-base text-[#261b17]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-18 pt-10 sm:px-6 md:pb-28 md:pt-16">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <div className="eyebrow">私密咨询</div>
            <h1 className="font-editorial mt-5 text-5xl font-semibold text-[#241914] md:text-7xl">
              在线咨询
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-8 text-[#65564d] md:text-base">
              如果你对产品、材质、使用场景或隐私包装有疑问，
              我们会以更温和、专业、尊重边界的方式协助你完成选择。
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="tone-card rounded-[1.5rem] p-5 md:p-6">
                <div className="eyebrow">邮箱联系</div>
                <div className="font-editorial mt-4 break-all text-[1.9rem] font-semibold text-[#241914]">
                  support@velurehealth.com
                </div>
                <p className="mt-4 text-sm leading-7 text-[#65564d]">
                  适合发送更详细的问题、产品偏好或售后咨询。
                </p>
              </div>

              <div className="tone-card rounded-[1.5rem] p-5 md:p-6">
                <div className="eyebrow">即时沟通</div>
                <div className="font-editorial mt-4 text-[1.9rem] font-semibold text-[#241914]">
                  WeChat / Telegram
                </div>
                <p className="mt-4 text-sm leading-7 text-[#65564d]">
                  后续也可以接入即时沟通渠道，提供更自然的咨询体验。
                </p>
              </div>
            </div>

            <div className="tone-low mt-8 rounded-[2rem] p-5 md:p-8">
              <div className="eyebrow">常见问题</div>
              <div className="mt-5 space-y-4">
                {faqs.map((item) => (
                  <div key={item.q} className="tone-card rounded-[1.3rem] p-5">
                    <h2 className="font-editorial text-2xl font-semibold text-[#241914] md:text-[2rem]">
                      {item.q}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[#65564d]">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="tone-mid h-fit rounded-[2rem] p-5 md:p-8">
            <div className="eyebrow">咨询表单</div>
            <h2 className="font-editorial mt-5 text-4xl font-semibold text-[#241914] md:text-5xl">
              告诉我们你的偏好
            </h2>
            <p className="mt-4 text-sm leading-8 text-[#65564d]">
              先留下简单信息即可，后续可以再逐步接入真实表单与客服系统。
            </p>

            <form className="mt-8 space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#241914]">称呼</label>
                <input type="text" placeholder="请输入你的称呼" className="input-lux" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#241914]">联系方式</label>
                <input type="text" placeholder="邮箱 / 微信 / Telegram / WhatsApp" className="input-lux" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#241914]">感兴趣的产品</label>
                <input type="text" placeholder="例如：SilkCare 水性润滑剂" className="input-lux" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#241914]">咨询内容</label>
                <textarea rows="6" placeholder="请描述你的问题或需求" className="input-lux" />
              </div>

              <button type="button" className="btn-primary w-full">提交咨询</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

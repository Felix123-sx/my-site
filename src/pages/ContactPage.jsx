import Navbar from "../components/Navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <div className="text-sm text-stone-500">Contact</div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
          在线咨询
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-stone-600">
          如果你对产品、隐私包装、物流或使用场景有任何疑问，
          可以通过这个页面联系我们。
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="text-sm text-stone-500">联系方式</div>
            <h2 className="mt-2 text-2xl font-semibold">联系顾问</h2>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              邮箱：support@velurehealth.com
            </p>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              你也可以后续在这里接入微信、Telegram 或 WhatsApp。
            </p>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="text-sm text-stone-500">咨询表单</div>
            <h2 className="mt-2 text-2xl font-semibold">发送你的问题</h2>

            <form className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="你的称呼"
                className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none"
              />
              <input
                type="text"
                placeholder="联系方式（邮箱 / 微信）"
                className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none"
              />
              <textarea
                rows="5"
                placeholder="请输入你的咨询内容"
                className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none"
              />
              <button
                type="button"
                className="w-full rounded-xl bg-stone-900 px-6 py-3 text-sm text-white hover:opacity-90"
              >
                提交咨询
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
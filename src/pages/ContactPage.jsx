import { useState } from "react";
import Navbar from "../components/Navbar";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    contactMethod: "",
    productInterest: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

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

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setFeedback("");

    try {
      const res = await fetch("/api/contact/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "提交失败");
      }

      setFeedback("提交成功，我们会尽快联系你。");
      setForm({
        name: "",
        contactMethod: "",
        productInterest: "",
        message: "",
      });
    } catch (error) {
      setFeedback(error.message || "提交失败，请稍后再试。");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen tone-base text-[var(--text)]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-18 pt-10 sm:px-6 md:pb-28 md:pt-16">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <div className="eyebrow">私密咨询</div>
            <h1 className="font-editorial mt-5 text-5xl font-semibold text-[var(--ui-title)] md:text-7xl">
              在线咨询
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-8 text-[var(--ui-copy)] md:text-base">
              如果你对产品、材质、使用场景或隐私包装有疑问，
              我们会以更温和、专业、尊重边界的方式协助你完成选择。
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="soft-tonal-card rounded-[1.5rem] p-5 md:p-6">
                <div className="eyebrow">邮箱联系</div>
                <div className="font-editorial mt-4 break-all text-[1.9rem] font-semibold text-[var(--ui-title)]">
                  support@velurehealth.com
                </div>
                <p className="mt-4 text-sm leading-7 text-[var(--ui-copy)]">
                  适合发送更详细的问题、产品偏好或售后咨询。
                </p>
              </div>

              <div className="soft-tonal-card rounded-[1.5rem] p-5 md:p-6">
                <div className="eyebrow">即时沟通</div>
                <div className="font-editorial mt-4 text-[1.9rem] font-semibold text-[var(--ui-title)]">
                  WeChat / Telegram
                </div>
                <p className="mt-4 text-sm leading-7 text-[var(--ui-copy)]">
                  也可作为后续即时沟通入口，提供更自然、更私密的咨询体验。
                </p>
              </div>
            </div>

            <div className="soft-tonal-panel mt-8 rounded-[2rem] p-5 md:p-8">
              <div className="eyebrow">常见问题</div>
              <div className="mt-5 space-y-4">
                {faqs.map((item) => (
                  <div key={item.q} className="soft-tonal-card rounded-[1.3rem] p-5">
                    <h2 className="font-editorial text-2xl font-semibold text-[var(--ui-title)] md:text-[2rem]">
                      {item.q}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--ui-copy)]">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="soft-tonal-panel h-fit rounded-[2rem] p-5 md:p-8">
            <div className="eyebrow">咨询表单</div>
            <h2 className="font-editorial mt-5 text-4xl font-semibold text-[var(--ui-title)] md:text-5xl">
              告诉我们你的偏好
            </h2>
            <p className="mt-4 text-sm leading-8 text-[var(--ui-copy)]">
              先留下简单信息即可，后续可以再逐步接入真实表单与客服系统。
            </p>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--ui-title)]">
                  称呼
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="请输入你的称呼"
                  className="input-lux"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--ui-title)]">
                  联系方式
                </label>
                <input
                  name="contactMethod"
                  type="text"
                  placeholder="邮箱 / 微信 / Telegram / WhatsApp"
                  className="input-lux"
                  value={form.contactMethod}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--ui-title)]">
                  感兴趣的产品
                </label>
                <input
                  name="productInterest"
                  type="text"
                  placeholder="例如：SilkCare 水性润滑剂"
                  className="input-lux"
                  value={form.productInterest}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--ui-title)]">
                  咨询内容
                </label>
                <textarea
                  name="message"
                  rows="6"
                  placeholder="请描述你的问题或需求"
                  className="input-lux"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {feedback && (
                <div className="text-sm text-[var(--ui-copy)]">{feedback}</div>
              )}

              <button type="submit" className="btn-primary w-full" disabled={submitting}>
                {submitting ? "提交中..." : "提交咨询"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
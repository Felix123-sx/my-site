import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { getProductById } from "../lib/products";
import { trackProductView } from "../lib/analytics";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { userId } = useAuth();
  const lastTrackedView = useRef("");

  const benefits = ["隐私包装", "甄选材质", "舒适体验", "更克制的表达方式"];
  const details = [
    { label: "适用场景", value: "日常护理与私密健康场景" },
    { label: "包装方式", value: "隐私包装发货" },
    { label: "品牌语气", value: "克制、柔和、值得信任" },
    { label: "推荐人群", value: "重视设计感与舒适体验的人群" },
  ];

  useEffect(() => {
    async function loadProduct() {
      const nextProduct = await getProductById(id);
      setProduct(nextProduct);
      setLoading(false);
    }

    void loadProduct();
  }, [id]);

  useEffect(() => {
    if (!product) {
      return;
    }

    const trackingKey = `${product.id}:${userId || "guest"}`;

    if (lastTrackedView.current === trackingKey) {
      return;
    }

    lastTrackedView.current = trackingKey;
    void trackProductView({
      product,
      userId,
    });
  }, [product, userId]);

  if (loading || !product) {
    return (
      <div className="min-h-screen tone-base text-[var(--text)]">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 pb-18 pt-10 sm:px-6 md:pb-28 md:pt-16">
          <div className="soft-tonal-card rounded-[2rem] p-8 md:p-10">
            <div className="eyebrow">正在加载</div>
            <h1 className="font-editorial mt-4 text-4xl font-semibold text-[var(--ui-title)] md:text-6xl">
              正在读取产品详情
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[var(--ui-copy)]">
              页面会优先读取 Supabase 商品数据，如果当前产品不存在，会回退到演示目录中的第一项。
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen tone-base text-[var(--text)]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-18 pt-10 sm:px-6 md:pb-28 md:pt-16">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--ui-kicker)]">
          <Link to="/" className="hover:text-[var(--ui-title)]">首页</Link>
          <span>/</span>
          <Link to={`/category/${encodeURIComponent(product.category)}`} className="hover:text-[var(--ui-title)]">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[var(--ui-title)]">{product.name}</span>
        </div>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <div className="relative overflow-hidden rounded-[2rem]">
              <div className="aspect-[4/5] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.58),transparent_28%),linear-gradient(145deg,#b17a85_0%,#7f4451_30%,#48292f_64%,#191214_100%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(21,14,15,0.24)] via-transparent to-[rgba(255,255,255,0.12)]" />
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              <div className="soft-tonal-card aspect-square rounded-[1rem] bg-[linear-gradient(145deg,#c18b95,#834755)]" />
              <div className="soft-tonal-card aspect-square rounded-[1rem] bg-[linear-gradient(145deg,#edd8d7,#a06e79)]" />
              <div className="soft-tonal-card aspect-square rounded-[1rem] bg-[linear-gradient(145deg,#d4afb3,#633742)]" />
              <div className="soft-tonal-card aspect-square rounded-[1rem] bg-[linear-gradient(145deg,#f3e7e3,#8c5d67)]" />
            </div>
          </div>

          <div>
            <div className="eyebrow">{product.tag}</div>
            <h1 className="font-editorial mt-5 text-5xl font-semibold leading-none text-[var(--ui-title)] md:text-7xl">
              {product.name}
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-8 text-[var(--ui-copy)] md:text-base">
              {product.intro}
            </p>
            <div className="mt-7 text-3xl font-semibold text-[var(--ui-title)] md:text-4xl">{product.price}</div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {benefits.map((item) => (
                <div key={item} className="soft-tonal-card rounded-[1.2rem] px-4 py-4 text-sm text-[var(--ui-title)]">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="flex items-center rounded-full bg-[rgba(255,251,247,0.82)] px-2 py-2 shadow-[inset_0_0_0_1px_rgba(111,39,53,0.12)]">
                <button className="h-10 w-10 rounded-full text-sm text-[var(--ui-copy)]" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>−</button>
                <div className="min-w-[44px] text-center text-sm text-[var(--ui-title)]">{quantity}</div>
                <button className="h-10 w-10 rounded-full text-sm text-[var(--ui-copy)]" onClick={() => setQuantity((prev) => prev + 1)}>+</button>
              </div>

              <button className="btn-secondary" onClick={() => void addToCart(product, quantity)}>加入购物袋</button>
              <button className="btn-primary">立即购买</button>
            </div>

            <div className="soft-tonal-panel mt-8 rounded-[1.8rem] p-6">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--ui-kicker)]">隐私配送</div>
              <p className="mt-3 text-sm leading-8 text-[var(--ui-copy)]">
                所有订单均采用隐私包装发货，外箱不显示敏感商品信息。
                我们希望整段购买过程都保持安静、克制，也更值得信任。
              </p>
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="soft-tonal-card rounded-[1.8rem] p-6 md:p-8">
            <div className="eyebrow">产品叙事</div>
            <h2 className="font-editorial mt-4 text-4xl font-semibold text-[var(--ui-title)] md:text-5xl">
              A premium object, not a noisy commodity
            </h2>
            <p className="mt-5 text-sm leading-8 text-[var(--ui-copy)] md:text-base">
              这件产品被呈现为一个更高价值的日常对象：它不依赖夸张刺激的语言，
              而是通过更成熟的设计感、材料表达与使用体验，建立欲望与信任。
            </p>
            <p className="mt-4 text-sm leading-8 text-[var(--ui-copy)] md:text-base">
              我们更在意它是否足够舒适、是否容易融入真实生活、是否能以更自然的方式被选择。
            </p>
          </div>

          <div className="space-y-4">
            <div className="soft-tonal-panel rounded-[1.8rem] p-6">
              <div className="eyebrow">关键信息</div>
              <div className="mt-5 space-y-4">
                {details.map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-4 border-b border-[rgba(111,39,53,0.12)] pb-4 last:border-b-0 last:pb-0">
                    <span className="text-sm text-[var(--ui-kicker)]">{item.label}</span>
                    <span className="max-w-[58%] text-right text-sm text-[var(--ui-title)]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="soft-tonal-card rounded-[1.8rem] p-6">
              <div className="eyebrow">护理与支持</div>
              <p className="mt-4 text-sm leading-8 text-[var(--ui-copy)]">
                如需进一步了解材质、使用场景、日常清洁或搭配建议，
                你可以通过在线咨询获取更私密、温和的支持。
              </p>
              <div className="mt-5">
                <Link to="/contact" className="btn-secondary">获取咨询建议</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

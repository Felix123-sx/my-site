import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../lib/products";

const categoryCopy = {
  情侣关怀: "为关系场景准备更体面、更柔和的选择。",
  润滑护理: "以舒适、顺滑和身体友好为核心。",
  私密健康: "把安全感、护理感和日常体验放在前面。",
  精选器具: "更成熟审美下的高质感产品表达。",
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authNotice, setAuthNotice] = useState("");

  useEffect(() => {
    async function loadProducts() {
      const nextProducts = await getProducts();
      setProducts(nextProducts);
      setLoading(false);
    }

    void loadProducts();
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");

    if (!hash) {
      return;
    }

    const params = new URLSearchParams(hash);
    const errorCode = params.get("error_code");
    const errorDescription = params.get("error_description");

    if (errorCode === "otp_expired") {
      setAuthNotice("确认链接已过期或已被使用。请重新注册，或重新发送一封最新的确认邮件。");
      return;
    }

    if (errorDescription) {
      setAuthNotice(decodeURIComponent(errorDescription.replaceAll("+", " ")));
    }
  }, []);

  const featuredProducts = useMemo(() => products.slice(0, 4), [products]);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  return (
    <div className="min-h-screen tone-base text-[var(--text)]">
      <Navbar />

      <main>
        <section id="home" className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center md:pt-16">
          <div>
            <div className="eyebrow">Premium Intimate Wellness</div>
            {authNotice ? (
              <div className="soft-tonal-panel mt-6 max-w-2xl rounded-[1.4rem] p-4 text-sm leading-7 text-[var(--ui-title)]">
                {authNotice}
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link to="/signup" className="btn-primary">重新注册</Link>
                  <Link to="/resend-confirmation" className="btn-secondary">重新发送确认邮件</Link>
                  <Link to="/login" className="btn-secondary">返回登录</Link>
                </div>
              </div>
            ) : null}
            <h1 className="font-editorial editorial-hero mt-6 text-6xl font-semibold text-[var(--primary-deep)] md:text-8xl">
              更克制、更高级的私密健康购物体验
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-8 text-[var(--text-soft)] md:text-base">
              我们把产品浏览、咨询与购买流程都整理成更温和的节奏。
              你可以直接浏览精选系列，也可以把商品加入购物袋，系统会自动把购物车保存在 Supabase 中。
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/shop" className="btn-primary">开始选购</Link>
              <Link to="/about" className="btn-secondary">了解品牌</Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="pill-soft">隐私包装发货</div>
              <div className="pill-soft">购物车自动保存</div>
              <div className="pill-soft">支持在线咨询</div>
            </div>
          </div>

          <div className="relative">
            <div className="hero-glow absolute -left-6 top-0 h-48 w-48 rounded-full" />
            <div className="hero-glow hero-glow-delay absolute bottom-0 right-0 h-56 w-56 rounded-full" />
            <div className="tone-mid ambient-shadow relative overflow-hidden rounded-[2.2rem] p-4 md:p-5">
              <img
                alt="Velure Health hero"
                className="h-[520px] w-full rounded-[1.8rem] object-cover"
                src={heroImage}
              />
              <div className="pointer-events-none absolute inset-x-8 bottom-8 rounded-[1.6rem] bg-[rgba(24,16,28,0.6)] p-5 backdrop-blur-md">
                <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--text-faint)]">Curated Selection</div>
                <div className="font-editorial mt-2 text-3xl text-[var(--primary-deep)]">Quiet luxury, intimate care</div>
                <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
                  更少噪音，更完整的信任感，让从浏览到购买都保持同一种品牌气质。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="featured" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow">Featured</div>
              <h2 className="font-editorial mt-4 text-4xl font-semibold text-[var(--ui-title)] md:text-6xl">
                精选产品
              </h2>
            </div>
            <Link to="/shop" className="btn-secondary">查看全部产品</Link>
          </div>

          {loading ? (
            <div className="tone-low rounded-[2rem] p-8 text-sm text-[var(--text-soft)]">
              正在从 Supabase 读取产品目录...
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        <section id="categories" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-14">
          <div className="tone-low rounded-[2.2rem] p-6 md:p-8">
            <div className="eyebrow">Collections</div>
            <h2 className="font-editorial mt-4 text-4xl font-semibold text-[var(--ui-title)] md:text-6xl">
              按系列浏览
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/category/${encodeURIComponent(category)}`}
                  className="tone-card rounded-[1.6rem] p-5 transition duration-300 hover:-translate-y-[2px]"
                >
                  <div className="eyebrow">{category}</div>
                  <h3 className="font-editorial mt-4 text-3xl font-semibold text-[var(--text-dark)]">{category}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-dark-soft)]">
                    {categoryCopy[category] || "浏览该系列下的精选产品。"}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-18 pt-4 sm:px-6 md:pb-28">
          <div className="tone-mid rounded-[2.2rem] p-8 md:p-10">
            <div className="eyebrow">Consultation</div>
            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h2 className="font-editorial text-4xl font-semibold text-[var(--ui-title)] md:text-6xl">
                  需要更私密的购买建议？
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-8 text-[var(--ui-copy)] md:text-base">
                  如果你希望先了解材质、分类差异、组合购买方式或使用场景，可以先进入咨询页，我们会把语气和节奏维持在同一条线上。
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/contact" className="btn-primary">在线咨询</Link>
                <Link to="/cart" className="btn-secondary">查看购物袋</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

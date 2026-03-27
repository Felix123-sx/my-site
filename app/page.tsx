import type { Metadata } from "next";
import { AddToCartForm } from "@/components/cart/add-to-cart-form";
import { LuxurySplashEntry } from "@/components/marketing/luxury-splash-entry";
import { supabaseAdmin } from "@/lib/supabase";
import type { ProductRow } from "@/lib/cart/types";

const trustPoints = [
  "Discreet packaging with no category callouts on the outside.",
  "A tighter assortment so first-time buyers can choose faster.",
  "Clear product context instead of vague, over-designed copy.",
];

const guidanceSteps = [
  {
    title: "Start with comfort first",
    body: "Choose a gentle essential, a premium daily pick, or a more giftable option depending on where you are in the decision process.",
  },
  {
    title: "Use the curated shortlist",
    body: "The homepage is designed to reduce choice overload, so visitors can reach a decision without comparing dozens of similar items.",
  },
  {
    title: "Check out privately",
    body: "The cart supports guest and returning shoppers, making it easy to browse now and complete the purchase later.",
  },
];

const faqItems = [
  {
    question: "Is the packaging discreet?",
    answer:
      "Yes. Orders are intended to arrive in plain outer packaging so the contents are not announced during delivery.",
  },
  {
    question: "Is this suitable for first-time buyers?",
    answer:
      "Yes. The product mix and homepage flow are structured to help first-time shoppers understand the range quickly and choose with more confidence.",
  },
  {
    question: "Will my cart stay if I leave the site?",
    answer:
      "Yes. The cart is designed to persist for guest and signed-in shoppers, so browsing does not need to happen in one session.",
  },
];

export const metadata: Metadata = {
  title: "Thoughtful wellness essentials",
  description:
    "Browse a calmer selection of wellness essentials with discreet delivery, clearer product guidance, and a simpler path to purchase.",
};

function formatCurrency(amountCents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amountCents / 100);
}

async function getProducts() {
  if (!supabaseAdmin) {
    return [] as ProductRow[];
  }

  const { data, error } = await supabaseAdmin
    .from("products")
    .select("id, name, slug, description, image_url, price_cents, currency, active")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as ProductRow[];
}

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 6);

  return (
    <>
      <LuxurySplashEntry />

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Thoughtful intimate wellness</p>
          <h1>Premium essentials with clearer guidance and a quieter buying experience.</h1>
          <p className="hero-lead">
            Northstar Supply helps people shop wellness products with more confidence by combining a curated catalog,
            discreet delivery, and plain-English product context.
          </p>
          <div className="hero-actions">
            <LinkButton href="#shop" label="Browse products" />
            <LinkButton href="#consultation" label="Get buying guidance" variant="secondary" />
          </div>
          <div className="hero-pills">
            <span className="pill">Discreet delivery</span>
            <span className="pill">Curated product edit</span>
            <span className="pill">Guest cart support</span>
          </div>
        </div>

        <aside className="hero-panel">
          <p className="eyebrow">Why people convert faster here</p>
          <h2>Less scrolling, less uncertainty, more confidence.</h2>
          <ul className="trust-list">
            {trustPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="stats-grid" aria-label="Store highlights">
        <article className="info-card">
          <p className="eyebrow">What we sell</p>
          <h2>Wellness essentials chosen for comfort, quality, and repeat use.</h2>
        </article>
        <article className="info-card">
          <p className="eyebrow">Who it helps</p>
          <h2>First-time buyers, returning customers, and gift shoppers who want a calmer experience.</h2>
        </article>
        <article className="info-card">
          <p className="eyebrow">Why it works</p>
          <h2>Fewer but better options, stronger trust signals, and a direct path to cart.</h2>
        </article>
      </section>

      <section className="section-heading" id="shop">
        <div>
          <p className="eyebrow">Featured products</p>
          <h2>Start with the most approachable options.</h2>
        </div>
        <p className="section-copy">
          These are the products most likely to help a visitor understand the assortment quickly and make a confident first choice.
        </p>
      </section>

      {featuredProducts.length > 0 ? (
        <section className="product-grid">
          {featuredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-media">
                {product.image_url ? (
                  <img alt={product.name} className="product-image" src={product.image_url} />
                ) : (
                  <div className="product-placeholder">
                    <span>{product.name}</span>
                  </div>
                )}
              </div>
              <div className="product-body">
                <div className="product-meta">
                  <div>
                    <h3>{product.name}</h3>
                    <p className="muted">{product.description ?? "A considered essential for daily comfort and confidence."}</p>
                  </div>
                  <span className="price">{formatCurrency(product.price_cents, product.currency)}</span>
                </div>
                <AddToCartForm productId={product.id} />
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="empty-products">
          <p className="eyebrow">Catalog unavailable</p>
          <h2>Your storefront structure is ready, but there are no active products to display yet.</h2>
          <p className="muted">
            Once active products are available from Supabase, this section will automatically turn into a shoppable featured grid.
          </p>
        </section>
      )}

      <section className="trust-section" id="why-us">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Why buy here</p>
            <h2>Trust signals that remove hesitation.</h2>
          </div>
        </div>
        <div className="trust-grid">
          {guidanceSteps.map((item, index) => (
            <article className="info-card" key={item.title}>
              <p className="step-index">0{index + 1}</p>
              <h3>{item.title}</h3>
              <p className="muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="consultation-panel" id="consultation">
        <div>
          <p className="eyebrow">Need help choosing</p>
          <h2>Make the next click obvious.</h2>
          <p className="section-copy">
            If you are unsure where to begin, start with featured products. If you already know what you want, go straight to cart and keep the flow moving.
          </p>
        </div>
        <div className="hero-actions">
          <LinkButton href="#shop" label="Review featured products" />
          <LinkButton href="/cart" label="Open cart" variant="secondary" />
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2>Answer the questions that usually block a purchase.</h2>
          </div>
        </div>
        <div className="faq-list">
          {faqItems.map((item) => (
            <article className="faq-item" key={item.question}>
              <h3>{item.question}</h3>
              <p className="muted">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function LinkButton({
  href,
  label,
  variant = "primary",
}: {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <a className={variant === "primary" ? "button-link" : "ghost-button-link"} href={href}>
      {label}
    </a>
  );
}

import type { Metadata } from "next";
import { AddToCartForm } from "@/components/cart/add-to-cart-form";
import { LuxurySplashEntry } from "@/components/marketing/luxury-splash-entry";
import { supabaseAdmin } from "@/lib/supabase";
import type { ProductRow } from "@/lib/cart/types";

const trustPoints = [
  "Discreet packaging.",
  "Curated bestsellers.",
  "Clear, low-pressure shopping.",
];

const guidanceSteps = [
  {
    title: "Start simple",
    body: "Begin with the edit made for first-time confidence.",
  },
  {
    title: "Shop the shortlist",
    body: "Fewer options. Better choices.",
  },
  {
    title: "Check out privately",
    body: "Guest-friendly checkout with a discreet experience end to end.",
  },
];

const assortmentSignals = [
  {
    title: "Private by design",
    body: "Discreet from click to delivery.",
  },
  {
    title: "Curated, not crowded",
    body: "A boutique edit, not an endless catalog.",
  },
  {
    title: "Quiet luxury",
    body: "Polished, intimate, and easy to browse.",
  },
];

const featuredTags = ["Editors' pick", "Quiet luxury", "New favorite", "Private care", "Giftable", "Best seller"];

const faqItems = [
  {
    question: "Is the packaging discreet?",
    answer: "Yes. Orders arrive in plain outer packaging.",
  },
  {
    question: "Is this suitable for first-time buyers?",
    answer: "Yes. The edit is designed to feel simple and approachable.",
  },
  {
    question: "Will my cart stay if I leave the site?",
    answer: "Yes. Your cart stays so you can come back later.",
  },
];

export const metadata: Metadata = {
  title: "Private wellness essentials",
  description: "Curated private pleasure essentials with discreet delivery and a calmer way to shop.",
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
          <p className="eyebrow">Private intimate wellness</p>
          <h1>Private pleasure, better presented.</h1>
          <p className="hero-lead">Curated essentials. Discreet delivery. A calmer way to shop.</p>
          <div className="hero-actions">
            <LinkButton href="#shop" label="Shop now" />
            <LinkButton href="#consultation" label="Find your fit" variant="secondary" />
          </div>
          <div className="hero-pills">
            <span className="pill">Discreet delivery</span>
            <span className="pill">Curated edit</span>
            <span className="pill">Guest checkout</span>
          </div>
        </div>

        <aside className="hero-panel">
          <p className="eyebrow">Why Peekplay</p>
          <h2>Less noise. More confidence.</h2>
          <ul className="trust-list">
            {trustPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div className="hero-panel-foot">
            <span>For first-time and returning shoppers.</span>
            <strong>Shop with more ease.</strong>
          </div>
        </aside>
      </section>

      <section className="stats-grid" aria-label="Store highlights">
        <article className="info-card">
          <p className="eyebrow">What to expect</p>
          <h2>Curated essentials with a premium, private feel.</h2>
        </article>
        <article className="info-card">
          <p className="eyebrow">Who it is for</p>
          <h2>Beginners, returning shoppers, and gift buyers.</h2>
        </article>
        <article className="info-card">
          <p className="eyebrow">Why it works</p>
          <h2>Fewer choices, faster decisions, less awkwardness.</h2>
        </article>
      </section>

      <section className="trust-grid editorial-grid" aria-label="Brand experience highlights">
        {assortmentSignals.map((item) => (
          <article className="info-card editorial-card" key={item.title}>
            <p className="eyebrow">Brand signal</p>
            <h3>{item.title}</h3>
            <p className="muted">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="section-heading" id="shop">
        <div>
          <p className="eyebrow">Featured products</p>
          <h2>Start with the favorites.</h2>
        </div>
        <p className="section-copy">Bestsellers picked for comfort, ease, and appeal.</p>
      </section>

      {featuredProducts.length > 0 ? (
        <section className="product-grid">
          {featuredProducts.map((product, index) => (
            <article className="product-card" key={product.id}>
              <div className="product-media">
                <span className="product-badge">{featuredTags[index % featuredTags.length]}</span>
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
                    <p className="muted">{product.description ?? "A refined essential for comfort and confidence."}</p>
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
            <h2>A simpler way to shop private pleasure.</h2>
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
          <h2>Pick your next step fast.</h2>
          <p className="section-copy">Start with the featured edit or go straight to your cart.</p>
        </div>
        <div className="hero-actions">
          <LinkButton href="#shop" label="Shop now" />
          <LinkButton href="/cart" label="Open private cart" variant="secondary" />
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2>The essentials, answered.</h2>
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

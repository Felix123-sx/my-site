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
    title: "Begin with comfort and confidence",
    body: "Choose a softer first option, a premium daily essential, or a more elevated gift depending on what kind of experience you want to create.",
  },
  {
    title: "Use the curated edit",
    body: "The assortment is intentionally concise, so shoppers can compare a few strong options instead of working through a cluttered catalog.",
  },
  {
    title: "Check out privately",
    body: "The cart supports guest and returning shoppers, making it easy to browse now, save your place, and complete the order when you are ready.",
  },
];

const assortmentSignals = [
  {
    title: "Private by design",
    body: "Packaging, pacing, and product language are built to feel discreet from first click to delivery.",
  },
  {
    title: "Curated for adults, not algorithms",
    body: "The homepage is edited like a boutique assortment rather than an endless marketplace of lookalike listings.",
  },
  {
    title: "Luxury without awkwardness",
    body: "Tone, imagery, and product guidance stay intimate and polished without becoming clinical or explicit.",
  },
];

const featuredTags = ["Editors' pick", "Quiet luxury", "New favorite", "Private care", "Giftable", "Best seller"];

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
  title: "Private wellness essentials",
  description:
    "Browse a curated intimate wellness selection with discreet delivery, premium presentation, and clearer product guidance.",
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
          <h1>Adult essentials presented with more elegance, privacy, and certainty.</h1>
          <p className="hero-lead">
            peekplay is an adult wellness storefront designed to feel refined instead of noisy, with a tightly edited
            catalog, discreet fulfillment, and product guidance that helps people choose without second-guessing.
          </p>
          <div className="hero-actions">
            <LinkButton href="#shop" label="Browse products" />
            <LinkButton href="#consultation" label="Find your starting point" variant="secondary" />
          </div>
          <div className="hero-pills">
            <span className="pill">Discreet delivery</span>
            <span className="pill">Curated adult essentials</span>
            <span className="pill">Guest cart support</span>
          </div>
          <div className="hero-note">
            <span className="hero-note-label">Store perspective</span>
            <p>
              This homepage is built to feel like a private boutique: fewer products, softer decision-making, and a more
              premium tone from discovery to checkout.
            </p>
          </div>
        </div>

        <aside className="hero-panel">
          <p className="eyebrow">Private shopping standards</p>
          <h2>Less noise, less hesitation, and a better first impression.</h2>
          <ul className="trust-list">
            {trustPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div className="hero-panel-foot">
            <span>Edited for first-time and returning adult shoppers.</span>
            <strong>Calm luxury over catalog overload.</strong>
          </div>
        </aside>
      </section>

      <section className="stats-grid" aria-label="Store highlights">
        <article className="info-card">
          <p className="eyebrow">What we sell</p>
          <h2>Adult essentials selected for comfort, quality, and repeat confidence.</h2>
        </article>
        <article className="info-card">
          <p className="eyebrow">Who it helps</p>
          <h2>First-time buyers, returning customers, and gift shoppers who want a more discreet experience.</h2>
        </article>
        <article className="info-card">
          <p className="eyebrow">Why it works</p>
          <h2>Fewer strong options, higher trust, and a faster path from curiosity to checkout.</h2>
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
          <h2>Begin with the most giftable, approachable, and confidence-building picks.</h2>
        </div>
        <p className="section-copy">
          These are the products most likely to help a shopper understand the collection quickly and make a polished first purchase.
        </p>
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
            <h2>A homepage flow that lowers friction for intimate purchases.</h2>
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
          <h2>Choose your next click with less uncertainty.</h2>
          <p className="section-copy">
            If you are browsing for comfort, start with the featured edit. If you already know the category or product you want,
            go straight to cart and keep the experience private and efficient.
          </p>
        </div>
        <div className="hero-actions">
          <LinkButton href="#shop" label="Review featured products" />
          <LinkButton href="/cart" label="Open private cart" variant="secondary" />
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2>Answer the questions that most often delay an intimate purchase.</h2>
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

import { supabase } from "./supabase";
import { products as fallbackProducts } from "../data/products";

function formatMoney(amountCents, currency = "CNY") {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amountCents / 100);
}

function normalizeFallbackProduct(product) {
  const priceNumber = Number(String(product.price).replace(/[^\d.]/g, ""));
  const priceCents = priceNumber * 100;

  return {
    ...product,
    slug: product.id,
    description: product.desc,
    priceCents,
    currency: "CNY",
    imageUrl: null,
  };
}

function normalizeDatabaseProduct(product) {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    tag: product.tag || "",
    desc: product.description || "",
    description: product.description || "",
    intro: product.intro || product.description || "",
    category: product.category,
    imageUrl: product.image_url || null,
    priceCents: product.price_cents,
    currency: product.currency || "CNY",
    price: formatMoney(product.price_cents, product.currency || "CNY"),
  };
}

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("id, slug, name, description, intro, image_url, price_cents, currency, tag, category, active")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error || !data?.length) {
    return fallbackProducts.map(normalizeFallbackProduct);
  }

  return data.map(normalizeDatabaseProduct);
}

export async function getProductById(id) {
  const allProducts = await getProducts();
  return allProducts.find((product) => product.id === id || product.slug === id) || allProducts[0] || null;
}

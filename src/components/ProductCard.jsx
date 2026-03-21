import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <article className="tone-card group rounded-[1.6rem] p-4 sm:p-5 hover-panel home-card-tilt reveal-up">
      <div className="relative overflow-hidden rounded-[1.25rem] media-shell">
        <div className="aspect-[4/5] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.52),transparent_30%),linear-gradient(145deg,#b07a84_0%,#7b414e_34%,#4a2d32_68%,#1f1618_100%)] media-zoom" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(25,16,17,0.24)] via-transparent to-[rgba(255,255,255,0.12)] media-sheen" />
      </div>

      <div className="mt-5">
        <div className="eyebrow">{product.tag}</div>

        <h3 className="font-editorial mt-4 text-[1.6rem] font-semibold leading-none text-[#241914] sm:text-[1.9rem] text-shift-soft">
          {product.name}
        </h3>

        <p className="mt-3 text-sm leading-7 text-[#66524f]">
          {product.desc}
        </p>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#98827e]">价格</div>
          <div className="mt-1 text-lg font-semibold text-[#241914]">{product.price}</div>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="inline-flex items-center justify-center rounded-full bg-[rgba(111,39,53,0.1)] px-4 py-2 text-sm text-[#241914] transition duration-300 hover:bg-[rgba(111,39,53,0.16)] hover:-translate-y-[1px]"
        >
          了解更多
        </Link>
      </div>
    </article>
  );
}
